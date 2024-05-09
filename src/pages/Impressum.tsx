import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function ImpressumPage() {
    return (
        <><br/>
            <Typography variant="h4" gutterBottom>Impressum (NECESSARY??)</Typography>
            <Typography paragraph>According to § 5 TMG:</Typography>

            <Typography variant="h6" gutterBottom>Operator and Contact:</Typography>
            <Typography>Name: [Your Full Name or Company Name]</Typography>
            <Typography>Address: [Your Full Address]</Typography>
            <Typography>Telephone Number: [Your Telephone Number]</Typography>
            <Typography>Email Address: [Your Email Address]</Typography>
            <br/>
            <Typography variant="h6" gutterBottom>Responsible for Content:</Typography>
            <Typography>[Name of the person responsible for content in accordance with § 55 Abs. 2 RStV, if different
                from above]</Typography>
            <br/>

            <Typography variant="h6" gutterBottom>Register Entry:</Typography>
            <Typography>Trade Register: [Name of the Register]</Typography>
            <Typography>Registration Number: [Registration Number]</Typography>
            <br/>

            <Typography variant="h6" gutterBottom>VAT ID:</Typography>
            <Typography>VAT identification number according to §27a of the VAT Act: [Your VAT ID]</Typography>
            <br/>

            <Typography variant="h6" gutterBottom>Disclaimer:</Typography>
            <Typography>Despite careful content control, we assume no liability for the content of external links. The
                content of linked pages is the sole responsibility of their operators.</Typography>
        </>
    );
}
