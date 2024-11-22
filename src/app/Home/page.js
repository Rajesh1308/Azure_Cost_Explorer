"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedSavingsPlan, setSelectedSavingsPlan] = useState('all');
  const [filters, setFilters] = useState({
    productName: '',
    skuName: '',
    location: '',
    retailPrice: '',
    unitPrice: '',
    type: '',
    savingsPlan: ''
  });

  // Predefined service families
  const serviceFamilies = [
    'all',
    'Compute',
    'Storage',
    'Internet of Things',
    'Databases',
    'Data',
    'AI + Machine Learning'
  ];

  const savingsPlanOptions = [
    'all',
    'with-savings',
    'no-savings'
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/prices');
        setData(response.data.Items);
        setFilteredData(response.data.Items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      productName: '',
      skuName: '',
      location: '',
      retailPrice: '',
      unitPrice: '',
      type: '',
      savingsPlan: ''
    });
    setSelectedFamily('all');
    setSelectedSavingsPlan('all');
  };

  useEffect(() => {
    let filtered = data;
    
    // Apply service family filter
    if (selectedFamily !== 'all') {
      filtered = filtered.filter(item => item.serviceFamily === selectedFamily);
    }

    // Apply savings plan filter
    if (selectedSavingsPlan !== 'all') {
      if (selectedSavingsPlan === 'with-savings') {
        // Filter and sort items with savings plan to the top
        filtered = filtered.filter(item => 
          item.savingsPlan && item.savingsPlan.length > 0
        );
      } else if (selectedSavingsPlan === 'no-savings') {
        // Filter items without savings plan
        filtered = filtered.filter(item => 
          !item.savingsPlan || item.savingsPlan.length === 0
        );
      }
    }
    
    // Apply other filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(item => {
          const itemValue = String(item[key]).toLowerCase();
          return itemValue.includes(filters[key].toLowerCase());
        });
      }
    });

    setFilteredData(filtered);
  }, [filters, data, selectedFamily, selectedSavingsPlan]);

  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 text-center mt-6 mb-8">
        Azure Cost Explorer
      </h1>

      <div className="mb-4 flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-blue-700 font-semibold">Service Family:</label>
          <select
            value={selectedFamily}
            onChange={(e) => setSelectedFamily(e.target.value)}
            className="p-2 border border-blue-200 rounded shadow-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none bg-white"
          >
            {serviceFamilies.map(family => (
              <option key={family} value={family}>
                {family === 'all' ? 'All Services' : family}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-blue-700 font-semibold">Savings Plan:</label>
          <select
            value={selectedSavingsPlan}
            onChange={(e) => setSelectedSavingsPlan(e.target.value)}
            className="p-2 border border-blue-200 rounded shadow-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none bg-white"
          >
            <option value="all">All Items</option>
            <option value="with-savings">With Savings Plan</option>
            <option value="no-savings">Without Savings Plan</option>
          </select>
        </div>
        <button 
          onClick={clearFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm transition duration-150"
        >
          Clear Filters
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-blue-600">Loading...</div>
        </div>
      ) : (
        <div className="border border-blue-200 rounded-lg bg-white shadow-lg h-[calc(100vh-180px)]">
          <div className="overflow-x-auto h-full">
            <div className="h-full overflow-auto">
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th className="border-b border-x border-blue-200 p-2 min-w-[200px] bg-blue-600 text-white">Product Name</th>
                    <th className="border-b border-x border-blue-200 p-2 min-w-[200px] bg-blue-600 text-white">SKU</th>
                    <th className="border-b border-x border-blue-200 p-2 min-w-[150px] bg-blue-600 text-white">Location</th>
                    <th className="border-b border-x border-blue-200 p-2 min-w-[150px] bg-blue-600 text-white">Retail Price</th>
                    <th className="border-b border-x border-blue-200 p-2 min-w-[150px] bg-blue-600 text-white">Unit Price</th>
                    <th className="border-b border-x border-blue-200 p-2 min-w-[150px] bg-blue-600 text-white">Billing Type</th>
                  </tr>
                  <tr className="shadow-sm">
                    <th className="border-b border-x p-2 bg-white">
                      <input
                        type="text"
                        value={filters.productName}
                        onChange={(e) => handleFilterChange('productName', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Filter Product Name"
                      />
                    </th>
                    <th className="border-b border-x p-2 bg-white">
                      <input
                        type="text"
                        value={filters.skuName}
                        onChange={(e) => handleFilterChange('skuName', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Filter SKU"
                      />
                    </th>
                    <th className="border-b border-x p-2 bg-white">
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Filter Location"
                      />
                    </th>
                    <th className="border-b border-x p-2 bg-white">
                      <input
                        type="text"
                        value={filters.retailPrice}
                        onChange={(e) => handleFilterChange('retailPrice', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Filter Retail Price"
                      />
                    </th>
                    <th className="border-b border-x p-2 bg-white">
                      <input
                        type="text"
                        value={filters.unitPrice}
                        onChange={(e) => handleFilterChange('unitPrice', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Filter Unit Price"
                      />
                    </th>
                    <th className="border-b border-x p-2 bg-white">
                      <input
                        type="text"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Filter Billing Type"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 border-b border-x border-blue-200 text-blue-600">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={`${item.productName}-${index}`} className="hover:bg-blue-50">
                        <td className="border-b border-x border-blue-200 p-2">{item.productName}</td>
                        <td className="border-b border-x border-blue-200 p-2">{item.skuName}</td>
                        <td className="border-b border-x border-blue-200 p-2">{item.location}</td>
                        <td className="border-b border-x border-blue-200 p-2">
                          ${item.retailPrice} per {item.unitOfMeasure}
                          {item.savingsPlan && item.savingsPlan.length > 0 && (
                            <div className="text-sm text-blue-600">
                              {item.savingsPlan.map((plan, i) => (
                                <div key={i}>
                                  ${plan.retailPrice} ({plan.term})
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="border-b border-x border-blue-200 p-2">
                          ${item.unitPrice} per {item.unitOfMeasure}
                          {item.savingsPlan && item.savingsPlan.length > 0 && (
                            <div className="text-sm text-blue-600">
                              {item.savingsPlan.map((plan, i) => (
                                <div key={i}>
                                  ${plan.unitPrice} ({plan.term})
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="border-b border-x border-blue-200 p-2">{item.type}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
