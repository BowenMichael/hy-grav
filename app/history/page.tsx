'use client'

import { use } from "react";
import {GetGravRecordsHistory} from "../../middleware/hy-grav";
import {Accordion, Card, Collapse, Container} from "react-bootstrap";

const GravEntryData = GetGravRecordsHistory();

export default function History() {
    const GravData : any[] = use(GravEntryData) 
    return <>
        <Container className={'p-3'}>
            <Card>
                <Card.Header>
                    History
                </Card.Header>
                <Card.Body>
                    <Accordion>
                        {GravData.map((d: { date: string | number | Date; data? : { averageGrav : number } }, idx : number)=>{
                            const date = new Date(d.date).toDateString();
                            return <div key={idx}>
                                <hr/>
                                <Accordion.Item eventKey={idx.toString()}>
                                    <Accordion.Header>
                                        {date}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Grav: {d.data?.averageGrav}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </div>
                        })}
                    </Accordion>
                    
                </Card.Body>
            </Card>
        </Container>
    </>
} 