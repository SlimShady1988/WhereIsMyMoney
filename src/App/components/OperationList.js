import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import UserContext, {OperationContext} from "../context";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "../pages/style/operations.css"
import WalletImg from "../static/210297132.png";

const OperationList = observer((props) => {
    const operation  = props.operation;
    return (
        <Container style={{padding: 0}}>
                <div  className="mt-2 d-flex">
                <Card style={{width: '100%'}}>
                    <Card.Body className={ operation.type % 2 === 0 ? "debit" : "credit"}>
                        <Card.Title>{operation.name}</Card.Title>
                        <Row>
                            <Col>
                                <Card.Text>
                                    {operation.value}
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
                                <ListGroup>
                                    {operation.items.map(product=>
                                        <ListGroup.Item key={product.id}>
                                            <Row className="" style={{display: "initial"}}>
                                                <Col>
                                                    {product.name}
                                                </Col>
                                                <Col>
                                                    {product.price}
                                                </Col>
                                                <Col>
                                                    {product.count}
                                                </Col>
                                                <Col>
                                                    {product.sum}
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    )}

                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card>
            </div>
        </Container>
    )
});



export default OperationList;


