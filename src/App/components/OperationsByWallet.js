import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import "../pages/style/operations.css"

const OperationsByWallet = observer((props) => {
    // const {user} = useContext(UserContext)
    // const {operation} = useContext(UserContext)
    const operation  = props.operation;
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };


    return (

        <Container style={{padding: 0}}>
                <div className={ operation.type === 2 ? "mt-2 d-flex justify-content-end" : "mt-2 d-flex "}>
                <Card style={{width: '50%'}}>
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

                </Card>
            </div>

        </Container>
    )
});



export default OperationsByWallet;


