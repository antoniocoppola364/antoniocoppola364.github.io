import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Route, Routes} from "react-router-dom";
import Explorer from '../explorer';

export default function ExplorerPage() {
    return (<>
        <Typography sx={{mt: 6, mb: 3}} color="text.secondary" variant="h3">
            {'ExplorerPage'}
        </Typography>
        <Routes>
            {/*<Route index element={<Navigate to="overview" replace />} />*/}
            {/*<Route path="overview" element={<Explorer />} />*/}
            <Route index element={<Explorer/>}/>
        </Routes>

    </>)
}
