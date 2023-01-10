import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import OperationList from "../components/OperationList";

const Operations = observer(() => {
    // const {operation} = useContext(UserContext);
    const operations = [
        {id: 1, type:1, name: "покупки їжу", value: 190,
            items: [
                {id:1, name: "Огірки", price: 45.00, count: 2, sum: 90.00},
                {id:2, name: "Red Bull", price: 45.30, count: 1, sum: 45.30},
                {id:2, name: "Буряк", price: 27.35, count: 2, sum: 54.70}
            ]
        },
        {id: 2, type:1, name: "шмотки", value: 2300, items: [
                {id:1, name: "Штани", price: 1000.00, count: 1, sum: 1000.00},
                {id:2, name: "Труси", price: 250, count: 2, sum: 500.00},
                {id:3, name: "Сорочка", price: 800, count: 1, sum: 800.00},
            ]
        },
        {id: 3, type:2, name: "ЗП", value: 50000, items: []},
        {id: 4, type:2, name: "Мама", value: 20000, items: []}

    ];

    return (
        <Container>
            {/*{console.log(operation.operations)}*/}
            <Row className="mt-2">
                <Col>
                    КАЛЕНДАР
                </Col>
                <Col md={9}>
                    <Row>
                        {/*<ButtonGroup className="mb-2 w-100">*/}
                        {/*    <Button className="credit">Пішло</Button>*/}
                        {/*    <Button className="debit">Прийшло</Button>*/}
                        {/*</ButtonGroup>*/}
                    </Row>
                    <Row className="d-flex flex-column m-3">
                        <h1>Список операцій</h1>
                        {operations.map(operation =>
                            <OperationList key={operation.id} operation={operation}/>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
})

export default Operations;