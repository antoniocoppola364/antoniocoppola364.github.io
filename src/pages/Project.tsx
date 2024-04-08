import * as React from 'react';

export default function ProjectPage() {
    return (
            <>
                <h1 style={{ color: 'red', fontWeight: 'bold' }}>---!TODO!--- Please adjust this page to your needs. root/src/pages/Project.tsx</h1>
                <h1>Modular intelligent inductive charging systems for automomous shuttles</h1>

                <p>
                    <b>Project duration:</b> 36 months (01.08.2021 – 31.07.2024)<br/>
                    <b>Locations:</b> Bad Staffelstein, Bietigheim-Bissingen, München, Wuppertal
                </p>

                <h3>Short Description</h3>

                <p>
                    The extensive use of driverless, electrified transport systems (such as E-buses) will help
                    sustainably reduce traffic congestion and emissions in German city centers. To reliably and
                    efficiently power these electric vehicles, there is a need for a corresponding autonomous and
                    inductive charging infrastructure. However, conventional solutions are still very expensive and
                    therefore unsuitable for practical use. The MILAS project aims to develop and test a marketable
                    inductive charging system for autonomous E-shuttle buses, enabling static and dynamic charging
                    operations at a power of 7 kW. The knowledge acquired in this project serves as the basis for a
                    systemic evaluation and helps to transfer the concept to other transport systems, including
                    airports or hospitals. By additionally powering the E-shuttle buses through a photovoltaic
                    system and an associated energy storage, MILAS also makes an important contribution to
                    self-sufficient and CO2-neutral mobility.
                </p>

                <h3>Background</h3>

                <p>
                    The advancing electrification and automation of vehicles also bring about profound changes in
                    public transport. A particular challenge in the use of autonomous electrified shuttle buses, as
                    of current technology, is still their incompletely automated charging process. Conductive
                    charging processes require personnel and thus result in increased costs. These are eliminated in
                    the case of inductive charging, as it requires no human intervention. Moreover, with a suitable
                    infrastructure design, inductive charging systems offer the possibility of charging not only
                    statically at a depot but also dynamically while in motion. Despite their advantages, inductive
                    charging systems are insufficiently researched concerning their use in public transport fleets.
                    By technically testing and systematically as well as economically evaluating inductive charging
                    systems for fully autonomous operation of E-shuttle buses, MILAS significantly contributes to
                    the transformation of mobility in public spaces. This also benefits Germany as a technological
                    hub, aiming for a leading role in electromobility.
                </p>

                <h3>Project Idea</h3>

                <p>
                    Inductive charging systems consist of stationary GA (ground assembly) and mobile-side VA
                    (vehicle assembly) components. Previous systems have employed soft ferrites for the magnetic
                    coupling of both subsystems. However, MILAS is developing a novel GA module based on the use of
                    magnetizable concrete. The significant advantage lies in replacing the cost-intensive
                    application of soft ferrites. Its efficient use also allows for a modular construction of GA
                    modules, easily converting the stationary model into a dynamic charging track. MILAS aims to
                    develop and test an optimized and cost-effective production of inductive charging systems,
                    enabling autonomous shuttle buses to be charged inductively at a power of 7 kW, both statically
                    and dynamically. The actual charging power is determined by a photovoltaic system based on
                    various parameters such as weather forecasts, battery charging and aging conditions, or the
                    currently available energy, controlled by an intelligent energy management system.
                </p>

                <h3>Goals</h3>

                <p>
                    Through a two-stage field test, the project aims to derive a practical business model for the
                    economic operation of such charging infrastructure for E-shuttles, focusing on:
                </p>

                <ul>
                    <li>Developing a concept for fully automatically inductively charged autonomous shuttle buses
                        and its applicability to other scenarios, such as airports or hospitals.
                    </li>
                    <li>Adjusting vehicle sensors to ensure efficient charging.</li>
                    <li>Using AI and machine learning for charging point detection and suitable positioning
                        maneuvers.
                    </li>
                    <li>Developing an intelligent charging and safety concept.</li>
                    <li>Creating intelligent dynamic charging management through sector coupling.</li>
                    <li>Approving the converted shuttle buses and conducting extensive tests in live operation.</li>
                </ul>

                <h3>Practical Applications</h3>
                <p>
                    The initial phase of the project involves developing and testing a prototype facility at the
                    Valeo company's depot, experimenting with different positions of inductive charging modules
                    along the test track during fleet operations. The second phase establishes and tests the
                    practical use of inductive charging infrastructure on a public test track in Bad Staffelstein
                    using multiple autonomous E-shuttles. Criteria include smooth static and dynamic charging along
                    the route while adhering to legal limits, achieving high efficiency, and ensuring operational
                    profitability.
                </p>
                <h3>Highlights</h3>
                <ul>
                    <li>Sustainable reduction of traffic congestion and emissions in German city centers</li>
                    <li>Autonomous and CO2-neutral mobility</li>
                    <li>Profound transformation of public transport</li>
                    <li>Static and dynamic charging operations</li>
                    <li>Studies on profitability and transferability - e.g., to other transport systems</li>
                    <li>Systemic as well as economic evaluation of inductive charging systems</li>
                </ul>
            </>
    );
}
