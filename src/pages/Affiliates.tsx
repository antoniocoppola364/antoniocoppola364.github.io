import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Collapse, Grid, Typography} from "@mui/material";

const partner_cards = [
    {
        id: "bmw-group",
        image_source: "./data/logos/BMW_logo.png", // Placeholder logo path
        image_title: "BMW Group logo",
        link: "https://www.bmw.de/de/home.html",
        description_header: "BMW Group",
        description_text: ""
    },
    {
        id: "ls-fahrzeugtechnik",
        image_source: "./data/logos/ls_logo.png", // Placeholder logo path
        image_title: "LS Fahrzeugtechnik logo",
        link: "https://www.mos.ed.tum.de/ftm/startseite/",
        description_header: "LS Fahrzeugtechnik",
        description_text: ""
    },
    {
        id: "ls-produktentwicklung",
        image_source: "./data/logos/tum_logo.png", // Placeholder logo path
        image_title: "LS Produktentwicklung und Leichtbau logo",
        link: "https://www.mec.ed.tum.de/lpl/startseite/",
        description_header: "LS Produktentwicklung und Leichtbau",
        description_text: ""
    },
    {
        id: "man-truck-bus",
        image_source: "./data/logos/man_logo.svg", // Placeholder logo path
        image_title: "MAN Truck & Bus SE logo",
        link: "https://www.man.eu/corporate/en/homepage.html",
        description_header: "MAN Truck & Bus SE",
        description_text: ""
    },
    {
        id: "ls-business-analytics",
        image_source: "./data/logos/tum_logo.png", // Placeholder logo path
        image_title: "LS Business Analytics & Intelligent Systems logo",
        link: "https://www.ot.mgt.tum.de/osm/home/",
        description_header: "LS Business Analytics & Intelligent Systems",
        description_text: ""
    },
    {
        id: "mcube",
        image_source: "./data/logos/mcube_logo.png", // Placeholder logo path
        image_title: "Mcube logo",
        link: "https://mcube-cluster.de/",
        description_header: "Munich Cluster for the Future of Mobility in Munich",
        description_text: ""
    },
    {
        id: "stanglmeier-reisebuero",
        image_source: "./data/logos/stanglmeier_logo.svg", // Placeholder logo path
        image_title: "Stanglmeier Reisebüro und Bustouristik GmbH & Co. KG logo",
        link: "https://www.stanglmeier.de/",
        description_header: "Stanglmeier Reisebüro und Bustouristik GmbH & Co. KG",
        description_text: ""
    },
    {
        id: "stadtwerke-muenchen",
        image_source: "./data/logos/SWM_logo.svg", // Placeholder logo path
        image_title: "Stadtwerke München GmbH logo",
        link: "https://www.swm.de/",
        description_header: "Stadtwerke München GmbH",
        description_text: ""
    }
];


function LearnMoreButton(props: { link: any }) {
    if (!props.link) {
        return null;
    }
    return <Button size="small" href={props.link} target="_blank" rel="noopener">Learn More</Button>;
}

function AffiliateCard(props: {
    image_source: string,
    image_title: string,
    link: string | null,
    description_header: string,
    description_text: string
}) {
    const [expanded, setExpanded] = React.useState(false);
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };
    return (
            <Card sx={{maxWidth: 300}}>
                <CardMedia
                        component="img"
                        height="194"
                        sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                        image={props.image_source}
                        title={props.image_title}
                />
                {/*<CardContent>*/}
                {/*</CardContent>*/}
                <CardActions disableSpacing>
                    <LearnMoreButton link={props.link}/>
                    {/*<Button size="small" href={props.link} target="_blank" rel="noopener">Learn More</Button>*/}
                    {/*<ExpandMore*/}
                    {/*        expand={expanded}*/}
                    {/*        onClick={handleExpandClick}*/}
                    {/*        aria-expanded={expanded}*/}
                    {/*        aria-label="show more"*/}
                    {/*>*/}
                    {/*    <ExpandMoreIcon/>*/}
                    {/*</ExpandMore>*/}
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.description_header}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {/*{props.description_text}*/}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
    );
}

export default function AffiliatesPage() {
    return (
        <>
            <Typography sx={{mt: 6, mb: 3}} color="text.secondary" variant="h3">
                {'Affiliates'}
            </Typography>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="baseline" spacing={2}>
                {partner_cards.map((card) => (
                    <Grid key={`${card.id}-card`} item>
                        <AffiliateCard
                                image_source={card.image_source}
                                image_title={card.image_title}
                                link={card.link}
                                description_header={card.description_header}
                                description_text="TBD"/>
                    </Grid>
                ))
                }
            </Grid>
        </>
    );
}
