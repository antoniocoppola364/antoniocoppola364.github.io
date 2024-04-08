// For new routing to work:
// locally: Delete the cache folder: 
// Locate and delete the node_modules/.vite directory. This directory contains the cached optimized dependencies. Delete it.
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import HeaderBar from './HeaderBar';
import SiteFooter from './SiteFooter';
import {
    createHashRouter, // Import createHashRouter instead of createBrowserRouter
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
    ScrollRestoration
} from "react-router-dom";
import ProjectPage from "./pages/Project";
import AffiliatesPage from "./pages/Affiliates";
import PublicationsPage from "./pages/Publications";
import ImpressumPage from "./pages/Impressum";
import RoutesPage from "./pages/RoutesPage"; // Ensure you've defined this component

const router = createHashRouter( // Use createHashRouter here
        createRoutesFromElements(
                <Route element={<Layout/>}>
                    <Route index element={<Navigate to="/project" replace/>}/>
                    {/*<Route path="home" element={<HomePage/>}/>*/}
                    <Route path="project" element={<ProjectPage/>}/>
                    <Route path="affiliates" element={<AffiliatesPage/>}/>
                    <Route path="publications" element={<PublicationsPage/>}/>
                    <Route path="impressum" element={<ImpressumPage/>}/>
                    <Route path="routes" element={<RoutesPage/>}/>
                    <Route path="about" element={<Navigate to="/project" replace/>}/>
                </Route>
        )
);

function Layout() {
    return (
            <Box>
                <header>
                    <HeaderBar/>
                </header>
                <main>
                    <Container maxWidth="lg">
                        <Outlet/>
                    </Container>
                </main>
                <footer>
                    <SiteFooter/>
                </footer>
                <ScrollRestoration/>
            </Box>
    );
}

export default function App() {
    return <RouterProvider router={router}/>;
}
