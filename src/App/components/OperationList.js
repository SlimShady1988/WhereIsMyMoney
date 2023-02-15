import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "../pages/style/operations.css"
import More from "../static/more.png"

const OperationList = observer((props) => {
    const operation  = props.operation;
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <Container>
                <div  className="d-flex">
                <Card style={{width: '100%'}}>
                    <Card.Body className={ operation.type === 2 ? "debit" : "credit"}>
                        <Card.Title>
                            <Row>
                                <Col>
                                    {operation.name}
                                </Col>
                                {operation.type === 1
                                    ?
                                    <Col className="d-flex justify-content-end" style={{color: "red"}}>
                                        - {operation.value}
                                    </Col>
                                    :
                                    <Col className="d-flex justify-content-end" style={{color: "blue"}}>
                                        + {operation.value}
                                    </Col>
                                }
                            </Row>

                        </Card.Title>
                        <Row>
                            <Card.Text className="d-flex justify-content-end">
                                {operation.date.toLocaleDateString('uk-UK', options)}
                            </Card.Text>
                        </Row>
                    </Card.Body>
                    {operation.type === 1 &&
                        <div>
                    <hr className="description"/>
                    <Accordion>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header style={{borderRadius: '0 0 5px 5px'}}>
                                <img  width="30px" height="30px" src={More} alt=""/>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row >
                                            <Col>
                                                Продукт
                                            </Col>
                                            <Col>
                                                Ціна
                                            </Col>
                                            <Col>
                                                Кількість
                                            </Col>
                                            <Col>
                                                Сума
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {operation.items.map(product=>
                                        <ListGroup.Item key={product.id}>
                                            <Row className="" >
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
                        </div>
                    }
                </Card>
            </div>
        </Container>
    )
});



export default OperationList;


