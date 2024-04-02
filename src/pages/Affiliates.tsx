import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Collapse, Grid, Typography} from "@mui/material";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const funding_cards = [
    {
        id: "bmwk",
        image_source: "https://www.bmwk.de/SiteGlobals/BMWI/StyleBundles/Bilder/bmwi_logo_de.svg?__blob=normal&v=1",
        image_title: "BMWK logo",
        link: null,
        description_header: "",
        description_text: ""
    }
]

const support_cards = [
    {
        id: "dlr",
        image_source: "./pt_dlr_logo_gr_d_2018_lang.jpg",
        image_title: "DLR logo",
        link: null,
        description_header: "",
        description_text: ""
    }
]

const partner_cards = [
    {
        id: "uni-wuppertal",
        image_source: "./uni-wuppertal.jpg",
        image_title: "Bergische Universität Wuppertal logo",
        link: "https://ees.uni-wuppertal.de/",
        description_header: "Bergische Universität Wuppertal",
        description_text: ""
    },
    {
        id: "bad-staffelstein",
        image_source: "./bad-staffelstein.png",
        image_title: "Bad Staffelstein logo",
        link: "https://www.bad-staffelstein.de/de/stadt/aktuelles/investieren_projekte.php",
        description_header: "Stadt Bad Staffelstein",
        description_text: ""
    },
    {
        id: "ibc-solar",
        image_source: "./ibc-solar.png",
        image_title: "IBC Solar logo",
        link: "https://www.ibc-solar.de/",
        description_header: "IBC Solar AG – Bad Staffelstein",
        description_text: ""
    },
    {
        id: "tum",
        image_source: "./tum_logo.png",
        image_title: "Technische Universität München logo",
        link: "https://www.ot.mgt.tum.de/osm/home/",
        description_header: "Technische Universität München",
        description_text: ""
    },
    {
        id: "valeo",
        image_source: "./valeo.png",
        image_title: "Valeo logo",
        link: "https://www.valeo.com/de/kronach-neuses-komfort-und-fahrassistenzsysteme/",
        description_header: "Valeo Schalter und Sensoren GmbH – Kronach",
        description_text: ""
    },
]

const cooperation_partners_cards = [
    {
        id: "intis",
        image_source: "./logo_intis.jpg",
        image_title: "INTIS logo",
        link: "https://www.intis.de/",
        description_header: "INTIS Integrated Infrastructure Solutions GmbH",
        description_text: ""
    },
    {
        id: "huk-coburg",
        image_source: "./huk-coburg-vector-logo-02.png",
        image_title: "HUK-COBURG logo",
        link: "https://www.huk.de/",
        description_header: "HUK-COBURG Versicherungsgruppe",
        description_text: ""
    }
]

// from https://mui.com/material-ui/react-card/
// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const {expand, ...other} = props;
//     return <IconButton {...other} />;
// })(({theme, expand}) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

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
            <><Typography sx={{mt: 6, mb: 3}} color="text.secondary" variant="h3">
                {'Affiliates'}
            </Typography>
                <Grid container
                      direction="row"
                        // justifyContent="space-around"
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
                <Typography sx={{mt: 6, mb: 3}} color="text.secondary" variant="h4">
                    {'Project funding'}
                </Typography>
                <Grid container
                      direction="row"
                        // justifyContent="space-around"
                      justifyContent="center"
                      alignItems="baseline" spacing={2}>
                    {funding_cards.map((card) => (
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
                <Typography sx={{mt: 6, mb: 3}} color="text.secondary" variant="h4">
                    {'Project support and consultation'}
                </Typography>
                <Grid container
                      direction="row"
                        // justifyContent="space-around"
                      justifyContent="center"
                      alignItems="baseline" spacing={2}>
                    {support_cards.map((card) => (
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
                <Typography sx={{mt: 6, mb: 3}} color="text.secondary" variant="h4">
                    {'Cooperation Partners'}
                </Typography>
                <Grid container
                      direction="row"
                        // justifyContent="space-around"
                      justifyContent="center"
                      alignItems="baseline" spacing={2}>
                    {cooperation_partners_cards.map((card) => (
                            <Grid key={`${card.id}-card`} item>
                                <AffiliateCard
                                        image_source={card.image_source}
                                        image_title={card.image_title}
                                        link={card.link}
                                        description_header={card.description_header}
                                        description_text={card.description_text}/>
                            </Grid>
                    ))
                    }
                </Grid>
            </>
    );
}
