# e-plantShopping

## Paradise Nursery — Online Plant Shopping Application

### Project Overview

Paradise Nursery is a React-based e-commerce application that allows users to explore and purchase a variety of indoor plants. Plants are organized into categories, with images and prices displayed for easy browsing. Users can add plants to their shopping cart, update quantities, remove items, and view the total cost of their order.

The project demonstrates the use of React, Redux Toolkit, React Router, and responsive CSS to build an interactive shopping experience.

## Features

### 1. Landing Page
- Welcome section introducing Paradise Nursery.
- Attractive background image and company branding.
- **Get Started** button to navigate to the plant collection.

### 2. Product Listing
- Four plant categories: Succulents, Flowering Plants, Foliage Plants, and Herb Plants.
- Six plants in each category.
- Product thumbnails, names, and prices.
- Add to Cart functionality.
- Buttons indicate when a plant has been added.
- Responsive product grid for different screen sizes.

### 3. Shopping Cart
- View all selected plants.
- Display plant images, names, and unit prices.
- Increase or decrease item quantities.
- Calculate individual item totals and the overall cart total.
- Remove items from the cart.
- Display the total number of items.
- Continue Shopping navigation.
- Checkout button displaying a **Coming Soon** message.

### 4. Navigation
- Shared navigation bar across application pages.
- Links to Home, Plants, and Cart.
- Dynamic cart quantity indicator.

### 5. About Us
- Company information introducing Paradise Nursery and its focus on bringing greenery into everyday spaces.

## Technology Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Styling:** CSS3
- **Programming Language:** JavaScript
- **Version Control:** Git and GitHub

## Getting Started

### Prerequisites

Install Node.js and npm before running the application.

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/baniborkar220906/e-plantShopping.git
cd e-plantShopping
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

### Build for Production

```bash
npm run build
```

## Project Structure

```text
e-plantShopping/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductList.jsx
│   │   └── CartItem.jsx
│   ├── store/
│   │   ├── CartSlice.jsx
│   │   └── store.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

*Note: The structure above is illustrative. Adjust it to match the actual files and folders in your repository.*

## Assignment Tasks

- **Task 1:** README.md — Project name and overview.
- **Task 2:** AboutUs.jsx — Company information component.
- **Task 3:** App.css — Landing page background styling.
- **Task 4:** App.jsx — Welcome heading and Get Started navigation.
- **Task 5:** CartSlice.jsx — Redux cart state and reducers.
- **Task 6:** ProductList.jsx — Categorized plants and Add to Cart functionality.
- **Task 7:** CartItem.jsx — Quantity management, item removal, and cart totals.

## Future Improvements

- Product search and filtering.
- Plant detail pages.
- Persistent cart storage.
- Functional checkout and order processing.

## Author

Paradise Nursery Development Team
