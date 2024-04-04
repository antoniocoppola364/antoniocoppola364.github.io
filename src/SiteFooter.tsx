import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Grid, ImageList, ImageListItem, List, ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";

const pages = ['About', 'Explorer', 'Publications', 'Affiliates', 'Impressum']
const external = [['TUM', 'https://www.tum.de']]
const affiliates = [['BMWK', 'https://www.bmwk.de/SiteGlobals/BMWI/StyleBundles/Bilder/bmwi_logo_de.svg?__blob=normal&v=1', 'https://www.bmwk.de'], ['TUM', '/tum_logo.png', 'https://www.tum.de']]
const disclaimer = "[update] This project was funded under grant 01MV21020B from the German Ministry of Economics and Environmental Protection (BMWK)"


function FooterPages() {
    return (
            <List>
                {pages.map((page) => (
                        <ListItem disablePadding key={`footer_${page}`}>
                            <NavLink to={`${page.toLocaleLowerCase()}`} color="inherit">
                                {page}
                            </NavLink>
                        </ListItem>
                ))}
            </List>
    )
}

function FooterExternalLinks() {
    return (
            <List>
                {external.map((value) => (
                        <ListItem disablePadding key={`footer_${value[0]}`}>
                            <Link href={value[1]} color="inherit" target="_blank" rel="noopener">
                                {value[0]}
                            </Link>
                        </ListItem>
                ))}
            </List>
    )
}

function FooterHighlightedAffiliates() {
    return (
            // <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            <ImageList cols={1} sx={{width: 100}}>
                {affiliates.map((item) => (
                        <ImageListItem key={`footer_${item[0]}`}>
                            <Link href={item[2]} target="_blank" rel="noopener">
                                <img
                                        width={100}
                                        src={`${item[1]}`}
                                        alt={item[0]}
                                        loading="lazy"
                                />
                            </Link>
                        </ImageListItem>
                ))}
            </ImageList>
    )
}

function FooterDisclaimer() {
    return (
            <Typography variant="body2" color="text.secondary">
                {disclaimer}
            </Typography>
    )
}


export default function SiteFooter() {

    return (
            <Box>
                <Container maxWidth="lg" sx={{my: 8}}>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid key={'footer_pages'} item xs={2} sm={3} md={3}>
                            <FooterPages/>
                        </Grid>
                        <Grid key={'footer_external'} item xs={2} sm={3} md={3}>
                            <FooterExternalLinks/>
                        </Grid>
                        <Grid key={'footer_affiliates'} item xs={2} sm={3} md={3}>
                            <FooterHighlightedAffiliates/>
                        </Grid>
                        <Grid key={'footer_disclaimer'} item xs={2} sm={3} md={3}>
                            <FooterDisclaimer/>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
    );
}