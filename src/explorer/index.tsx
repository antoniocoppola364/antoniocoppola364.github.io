import {Provider} from "react-redux";
import store from "./store";
// import Overview from "./Overview";
import React, {lazy, Suspense} from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// https://react.dev/reference/react/lazy#suspense-for-code-splitting
const Overview = lazy(() => import('./Overview'));

function Loading() {

    return (
        <Box display="flex" alignItems="center" gap={4} height={512.8} justifyContent="center">
            <CircularProgress/>
            <Typography>Loading data explorer for the first time, please wait ..</Typography>
        </Box>
    );
}

export default function Explorer() {
    return (
        <Suspense fallback={<Loading/>}>
            <Provider store={store}>
                <Overview/>
            </Provider>
        </Suspense>
    )
}

