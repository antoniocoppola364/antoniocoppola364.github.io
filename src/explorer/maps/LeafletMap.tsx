// https://react-leaflet.js.org/docs/api-map/
import {TileLayer, useMap} from "react-leaflet";
import L from 'leaflet'
import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LeafletMap(props: { scenario: { zoom: number; lat: number; lon: number; instance: string }; }) {
    const [loading, setLoading] = useState(false);

    const map = useMap();
    let single_layers: L.Layer[] = [];

    useEffect(() => {
        if (props.scenario) {
            onScenarioChange(props.scenario);
            setLoading(true);
            fetch((`./data/${props.scenario.instance}`))
                    .then(response => response.json())
                    .then(data => {
                        onInstanceLoaded(data);
                    });
        }
        return () => {
        };
    }, [props.scenario]);

    const onScenarioChange = (scenario: { zoom: number; lat: number; lon: number; }) => {
        map.setZoom(scenario.zoom, {animate: false});
        map.setView([scenario.lat, scenario.lon]);
        return () => {
        };
    };

    const onInstanceLoaded = (instance: any) => {
        single_layers.forEach((layer: L.Layer) => map.removeLayer(layer));

        let charger_icon = L.icon({
            iconUrl: "./icons/ev_station_black_24dp.svg",
            iconSize: [24, 24], // size of the icon
            iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            popupAnchor: [12, 6] // point from which the popup should open relative to the iconAnchor
        });

        let inductive_icon = L.icon({
            iconUrl: "./icons/electric_car_black_24dp.svg",
            iconSize: [24, 24], // size of the icon
            iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            popupAnchor: [12, 6] // point from which the popup should open relative to the iconAnchor
        });

        let bus_stop_icon = L.icon({
            iconUrl: "./icons/departure_board_black_24dp.svg",
            iconSize: [24, 24], // size of the icon
            iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
            popupAnchor: [12, 6] // point from which the popup should open relative to the iconAnchor
        });

        let node_lookup = new Map();
        instance._network.nodes.forEach((node: any) => node_lookup.set(node.id, node));

        let static_charger = instance._network.nodes.filter((value: any) => {
            return value.constructible_charger.length > 0;
        });
        let static_charger_markers = static_charger.map((value: any) => {
            return L.marker([value.coordinate.lat, value.coordinate.lon], {icon: charger_icon}).bindPopup(`${value.id}`)
        });

        let dynamic_charger = instance._network.links.filter((value: any) => {
            return value.constructible_charger.length > 0;
        });
        let dynamic_charger_markers = dynamic_charger.map((value: any) => {
            let [source, target] = [node_lookup.get(value.source), node_lookup.get(value.target)];
            let midpoint: [number, number] = [source.coordinate.lat + (source.coordinate.lat - target.coordinate.lat) / 2.0,
                source.coordinate.lon + (source.coordinate.lon - target.coordinate.lon) / 2.0];
            return L.marker(midpoint, {icon: inductive_icon}).bindPopup(`${value.constructible_charger[0].id}`)
        });

        let stops = instance._network.nodes.filter((value: any) => {
            return value.is_stop;
        });

        let stop_markers = stops.map((value: any) => {
            return L.marker([value.coordinate.lat, value.coordinate.lon], {icon: bus_stop_icon}).bindPopup(`${value.id}`)
        });

        let static_charger_layer = L.layerGroup(static_charger_markers);
        let dynamic_charger_layer = L.layerGroup(dynamic_charger_markers);
        let stop_layer = L.layerGroup(stop_markers);

        map.addLayer(static_charger_layer);
        map.addLayer(dynamic_charger_layer);
        map.addLayer(stop_layer);
        single_layers = [static_charger_layer, dynamic_charger_layer, stop_layer];

        setLoading(false)
        return () => {
            single_layers.forEach((layer: L.Layer) => map.removeLayer(layer));
            single_layers = []
        };
    };

    return (
            <Box>
                <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    /* preliminary loading overlay */
                    loading ? (<>
                        <Box
                                display="flex" alignItems="center" gap={4} justifyContent="center"
                                sx={{
                                    backgroundColor: "gray",
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    zIndex: 1000,
                                    opacity: 0.8
                                }}>
                        </Box>
                        <Box display="flex" alignItems="center" gap={4} sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            zIndex: 1001,
                        }} justifyContent="center">
                            <CircularProgress/>
                            <Typography color={"white"}>loading ..</Typography>
                        </Box>
                    </>) : (<></>)
                }
            </Box>
    );
}
