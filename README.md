# Azure Cost Explorer

A web application that helps users explore and analyze Azure service pricing efficiently.

## Features

- Real-time Azure pricing data
- Interactive cost comparison tools
- User-friendly interface for service exploration
- Detailed pricing breakdowns by region and service tier

## Getting Started

### Option 1: Running with npm

1. Clone the repository
```bash
git clone <repository-url>
cd azure-cost-explorer
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Option 2: Running with Docker

1. Build the Docker image
```bash
docker build -t azure-cost-explorer .
```

2. Run the container
```bash
docker run -p 3000:3000 azure-cost-explorer
```

3. Access the application at [http://localhost:3000](http://localhost:3000)

## Usage

1. Launch the application
2. Browse through available Azure services
3. Compare pricing across different regions and tiers
4. Get detailed cost breakdowns for your selected configurations

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Azure Pricing API

## Note

Prices and availability are subject to change. Please refer to the official Azure pricing page for the most current information.
