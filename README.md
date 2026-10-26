# Hamsa Holdings - Korean Automobile Export Platform

Direct Korean automobile export platform built with React, TypeScript, and Vite. Sourcing and exporting new and certified pre-owned Hyundai, Kia, Genesis, and global brand vehicles directly from Incheon and Busan ports worldwide.

## Key Features

- **Interactive Vehicle Catalog**:
  - Live filtering by brand (Genesis, Hyundai, Kia, Chevrolet, Ssangyong, Renault, BMW, Mercedes, Volkswagen, Toyota), body type, budget range, vehicle condition (New / Used), and stock status (Available / Sold).
  - Instant keyword search across model, engine, trims, and equipment features.
  - Sorting by price, year, and mileage.
  - Quick specifications modal and dedicated full vehicle detail pages (`/car/:id`).
- **Multilingual Support**:
  - Full interface localization in English (EN), Uzbek (UZ), and Russian (RU).
- **Direct WhatsApp Export Inquiry Integration**:
  - Automated WhatsApp dispatch for pre-filled inquiry messages tailored to specific vehicles or custom orders.
- **Informative Buyer Resources**:
  - **How It Works**: 6-step export process from selection to DHL document handover, guarantees, and FAQs.
  - **Shipping & Logistics**: Comparison of Ro-Ro vs Dedicated Container (20ft/40ft), departure port operations (Incheon, Busan, Pyeongtaek), and destination transit times.
  - **About Us**: Company background, leadership message from CEO Alisher B., and core operational values.
  - **Contact Support**: Interactive inquiry submission with Seoul corporate office details.
- **Admin Management Portal (`/admin`)**:
  - Authentication guard (Default credentials: `admin` / `hamsa2024`).
  - Real-time inventory metrics (Total cars, in stock, sold, unique brands).
  - Complete car CRUD operations (Add, Edit, Delete, and 1-click status toggle between Available & Sold).
  - Persistent state in browser storage.

## Tech Stack

- **Framework**: React 18 SPA + Vite
- **Language**: TypeScript
- **Routing**: React Router v6
- **Typography & Icons**: Inter & Outfit fonts, FontAwesome 6

## Development & Build

```bash
npm install
npm run dev     # Starts Vite dev server on port 3000
npm run build   # Production build
```
