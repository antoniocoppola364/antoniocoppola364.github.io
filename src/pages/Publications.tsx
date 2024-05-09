import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function PublicationsPage() {
    return (
        <>

            <Typography sx={{mt: 6, mb: 3}} color="text.primary" variant="h3">
                Publications
            </Typography>
            
            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                Bachelor Theses
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">

                Title: Developing an open-source Python-based implementation for designing a
                master schedule for Demand Adaptive Systems (Akkaya, Kerem) 2023<br/>

                Description: This project involves developing an open-source Python-based implementation for
                designing a master schedule for demand adaptive systems. <br/>


                <a href="https://link.springer.com/article/10.1007/s10479-010-0710-5" target="_blank">[Reference
                    paper]</a>
                &nbsp;
                <a href="https://github.com/kakkaya0/DAS-Master_Scheduling"
                   target="_blank">[GitHub repository]</a> <br/> <br/>


                Title: Operational decision-making: An Algorithmic Framework
                for efficient Demand Adaptive Systems in Public Transportation (Fischer, Marius) 2024 <br/>

                Description: Developed heuristics and implemented a MIP model to solve the operational problem of
                Demand Adaptive Systems to maximize the operators' profit. <br/>


                <a href="https://pubsonline.informs.org/doi/abs/10.1287/ijoc.1030.0051" target="_blank">[Reference
                    paper]</a>
                &nbsp;
                <a href="https://github.com/MariusSimonFischer/das1-solver/tree/master/Bachelor_Thesis_Code"
                   target="_blank">[GitHub repository]</a>


            </Typography>

            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                Master Thesis
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">

                Title: Optimization of Demand Adaptive Systems at the Operational Level -
                A Metaheuristic-based Solution Approach (Schmid, Julian) 2024 <br/>

                Description: Developed and implemented a metaheuristic to solve
                a version of the operational DAS problem with the goal of minimizing users' travel time. <br/>

                <a href="https://pubsonline.informs.org/doi/abs/10.1287/ijoc.1030.0051"
                   target="_blank">[Reference paper]</a>
                &nbsp;
                <a href="https://github.com/ga87puw/DAS_operational"
                   target="_blank">[GitHub repository]</a>
            </Typography>


            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
            Papers
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">
                Title: A Branch-and-Price approach for the Stochastic TSP with Generalized Latency
                (Benedikt Lienkamp, Mike Hewitt, Maximilian Schiffer) 2024 <br/>
                Description: Developed an algorithmic framework to solve the STSP-GL
                where we decide on which optional stops to include in a DAS line
                with the goal of achieving a certain service level with a given probability.
                Additionally, we get a general order of stops, i.e.,
                we know between which two compulsory stops lie which optional stops (determination of segments).
                This information can then be used to derive a master schedule (see Bachelor Thesis Akkaya)
                for the entire DAS line.
                <br/>
                <a href="https://pubsonline.informs.org/doi/abs/10.1287/ijoc.1030.0051"
                   target="_blank">[Link to paper]</a>

            </Typography>

            <Typography sx={{mt: 4, mb: 2}} color="text.primary" variant="h4">
                Conference Talks
            </Typography>
            <Typography sx={{mb: 4}} color="text.secondary">
                A Branch-and-Price approach for the Stochastic Selective TSP with Generalized
                Latency (Benedikt Lienkamp, Mike Hewitt, Maximilian Schiffer) <br/> TSL Conference 2023,
                Chicago <br/><br/>
                Online routing for Demand Adaptive Systems (Benedikt Lienkamp,
                Mike Hewitt, Axel Parmentier, Maximilian Schiffer) <br/>EURO Conference 2024, Copenhagen
            </Typography>


        </>
    );
}