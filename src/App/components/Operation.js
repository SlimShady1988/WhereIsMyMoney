import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import UserContext from "../context";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "../pages/style/operations.css"

const OperationList = observer((operation) => {
    const {operation} = useContext(UserContext)

    return (
        <Container style={{padding: 0}}>
            <div className="mt-2 d-flex justify-content-end">
                <Card style={{width: '50%'}}>
                    <Card.Body className="debit">
                        <Card.Title>Operation Name</Card.Title>
                        <Row>
                            <Col>
                                <Card.Text>
                                    Operation sum
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>
                                    Date
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                    <hr/>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Детальніше</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card>
            </div>
        </Container>
    )
});



export default OperationList;


