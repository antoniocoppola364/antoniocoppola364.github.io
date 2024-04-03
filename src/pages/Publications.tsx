import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function PublicationsPage() {
    return (
        <>
            <Typography sx={{mt: 6, mb: 3}} color="text.primary" variant="h3">
                Publications
            </Typography>
            
            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                Bachelor Thesis
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">
                Bachelor Thesis explored...
            </Typography>
            
            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                Master Thesis
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">
                Master Thesis delved into the complexities of...
            </Typography>
            
            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                IDP (Interdisciplinary Project)
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">
                In this interdisciplinary project, a student developed a comprehensive model to generate passenger demand for public transportation, leveraging data provided by Stadtwerke München (SWM). Utilizing General Transit Feed Specification (GTFS) data, he extracted and analyzed stop information for specific bus routes. The methodology involved creating stochastic Origin-Destination (OD) matrices based on average passenger movements, with enhancements through iterative proportional fitting and mapping to nearby buildings within a specified radius, thereby simulating realistic passenger trips.
            </Typography>
            
            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                Conference Talks
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">
                Highlights and insights from various conference talks...
            </Typography>
            
            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                Papers
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">
                A collection of academic and research papers...
            </Typography>
        </>
    );
}