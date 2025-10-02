# Rainwater Harvesting Initiative Website

This project is a modern, interactive web application designed to promote and facilitate rainwater harvesting. Built for the Smart India Hackathon 2025 (SIH2025), it provides users with the tools and information needed to understand, implement, and support water conservation efforts.

## Key Features

- **RWH Potential Assessment**: An interactive, step-by-step tool that allows users to calculate their property's rainwater harvesting potential. It features a map-based interface for accurately defining rooftop areas.
- **AR Visualization**: An Augmented Reality feature to help users visualize how a rainwater harvesting system might look on their own property.
- **Verified Vendor Directory**: A curated list of government-verified vendors specializing in rainwater harvesting systems, complete with product information and a direct contact form.
- **Campaign Showcase**: A blog-style section that highlights the success stories and impact of past rainwater harvesting campaigns, with dynamic pages for detailed articles.
- **Responsive Design**: A clean, dark-themed, and fully responsive UI that ensures a seamless experience across all devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI & Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repository-url>
   ```
2. **Navigate to the project directory:**
   ```sh
   cd raintwate-harvesting-website
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows the standard Next.js App Router structure:

- **/app**: Contains all the routes and pages for the application.
  - **/app/(root)/**: The main group for all primary pages.
  - **/app/api/**: API routes for backend functionality.
- **/components**: Contains shared, reusable React components used across the application (e.g., forms, modals, UI elements).
- **/modules**: Contains larger, feature-specific components and business logic (e.g., assessment calculators, page sections).
- **/public**: Stores static assets like images, icons, and other files.

## Available Routes

- **`/`**: The main landing page.
- **`/assesment`**: The multi-step Rainwater Harvesting potential assessment tool.
- **`/assesment/ar`**: The AR visualization experience.
- **`/vendors`**: A directory of verified vendors and their products.
- **`/campaigns`**: A list of past and ongoing campaigns.
- **`/campaigns/[id]`**: A dynamic route to view the detailed description of a specific campaign.
