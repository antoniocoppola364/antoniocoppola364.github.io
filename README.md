- based on the material-ui-vite-ts example from: https://mui.com/material-ui/getting-started/templates/
- added packages:
    - react-dom-router for page navigation
    - recharts for charts
    - react-leaflet for maps
    - leaflet ant path
- documentations:
    - material-ui: https://mui.com/material-ui/
    - recharts: https://recharts.org/en-US/examples
    - leaflet: https://leafletjs.com/reference.html
    - react-leaflet: https://react-leaflet.js.org/docs/api-map/
    - leaflet ant path: https://rubenspgcavalcante.github.io/leaflet-ant-path/
- misc:
    - https://github.com/mui/mui-toolpad


## Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed on your system. This will include npm (Node Package Manager), which is used to manage the dependencies.

## Installation

Follow these steps to install the required packages for the project:

1. Open your terminal or command prompt.
2. Navigate to the project's root directory.
3. Run the following command to install the dependencies:

```bash
npm install
```

This command reads the `package.json` file and installs all the dependencies listed there.

## Running the Project

Once the installation is complete, you can run the project in development mode. To do this, execute the following command in the terminal:

```bash
npm run dev
```

# Project Documentation

This project is built with React, utilizing React Router for navigation and Material-UI for the user interface components. This README outlines how to add new pages and tabbed interfaces within those pages.

## Adding a New Page

To add a new page to the application, follow these steps:

### 1. Create the Page Component

- Create a new file for your page in the `src/pages` directory. For example, to add an "About" page, create a file named `AboutPage.tsx`.

```tsx
// src/pages/AboutPage.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page of our application.</p>
    </div>
  );
};

export default AboutPage;
```

### 2. Update the Router Configuration

- Include the new page in your routing configuration. Assuming you're using React Router, update the routes in `App.tsx` or your router setup file.

```tsx
// App.tsx
// Import other pages
<Route path="/about" element={<AboutPage/>}/>
```

## Adding Tabs to a Page

For adding tabs within a page using Material-UI:

### 1. Ensure Material-UI is Installed

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### 2. Implement Tabs in Your Page Component

- Modify your page component to include `Tabs` and `Tab` components from Material-UI. Here's an example using the `AboutPage`.

```tsx
// AboutPage.tsx or any other page component
import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AboutPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <h1>About Us</h1>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="about tabs">
        <Tab label="Tab One" />
        <Tab label="Tab Two" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <p>Content of Tab One</p>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <p>Content of Tab Two</p>
      </TabPanel>
    </div>
  );
};

export default AboutPage;
```

### 3. Customize Your Tabs

- Customize the layout, styling, and content of of the tabs as needed. Material-UI provides a wide range of customization options.

This guide provides a basic overview for extending the application with new pages and incorporating tabs within those pages. For more detailed information, refer to the official documentation for [React Router](https://reactrouter.com/web/guides/quick-start) and [Material-UI](https://mui.com/components/tabs/).