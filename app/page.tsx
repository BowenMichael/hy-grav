'use client'
import {
    Button,
    ButtonGroup,
    Card,
    Form,
    Col,
    Row,
    Container,
    Nav,
    Navbar,
    ToggleButton,
    NavDropdown,
    Image
} from "react-bootstrap";
import {ChangeEvent, useEffect, useState} from "react";
import {GetServerSidePropsContext} from "next";
import {GetGravRecords, GetGravRecordsData, PostGravRecord} from "../middleware/hy-grav";
import { use } from 'react';
import bg from '../public/background.png'

const gravRecordsNumber = GetGravRecords();
const gravRecordsDatas = GetGravRecordsData();

export default function Home() {
    const [gravRecords, setGravRecords] = useState(use(gravRecordsNumber));
    const [gravRecordsData, setGravRecordsData] = useState(use(gravRecordsDatas));
    const [submitted, setSubmitted] = useState(false)
    const [radioValue, setRadioValue] = useState(0);

    const radios = [
        { name: 'HyGrav', value: 1 },
        { name: 'LowGrav', value: -1 },
    ];
    
    useEffect(()=>{
        
    }, [])
    
    function SubmitHyGravForm(e : ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        PostGravRecord(radioValue)
        setGravRecords(gravRecords +1)
        
        setSubmitted(true)
    }
  return (<>
      <Container className={'home-container'} style={{
          backgroundImage: `url(${bg.src})`,
          width: '100%',
          height: '100%',
      }}>
          <Col xs={10} md={5} lg={4}>
              <Card className={'p-5 w-100'} >
                  <Card.Title>
                      Welcome to hyGrav
                  </Card.Title>
                  <Card.Body>
                      <Card.Text>Keep a record of your hy and low grav days. Compare against the average of recorded entries</Card.Text>
                      <Col>
                          {!submitted && <Form onSubmit={SubmitHyGravForm}>
                              <Row className={'mb-3'}>
                                  <ButtonGroup className={'w-100'}>
                                      {radios.map((radio, idx) => (
                                          <ToggleButton
                                              key={idx}
                                              id={`radio-${idx}`}
                                              type="radio"
                                              variant={'outline-success'}
                                              name="radio"
                                              value={radio.value}
                                              checked={radioValue === radio.value}
                                              onChange={(e) =>  setRadioValue(Number(e.currentTarget.value))}
                                          >
                                              {radio.name}
                                          </ToggleButton>
                                      ))}
                                  </ButtonGroup>
                              </Row>
                              <Row>
                                  <Button type={'submit'}>
                                      Submit
                                  </Button>
                              </Row>
                         
                          </Form>}
                          
                          
                          {submitted && <Card.Text>
                              Thank you! 
                          </Card.Text>}
                          
                             

                          

                      </Col>
                  </Card.Body>
                  <Form.Text>Total Enteries: {gravRecords}</Form.Text>
                  <Form.Text>Avg Grav: {gravRecordsData.averageGrav}</Form.Text>
              </Card> 
          </Col>
      </Container>
  </>)
}
