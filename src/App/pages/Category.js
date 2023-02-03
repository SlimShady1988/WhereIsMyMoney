import React, {useContext} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import OperationDiagram from "../components/OperationDiagram";
import Food from "../../App/static/pizza.png";
import OperationList from "../components/OperationList";

const Category = observer(() => {
    const category =             {
        id: "2",
        name: "їда",
        img: Food
    }

    const operations = [
        {id: 1, type:1, name: "Покупки їди", value: 190, date: new Date(2022,10,23,11,25,26),
            items: [
                {id:1, name: "Огірки", price: 45.00, count: 2, sum: 90.00},
                {id:2, name: "Red Bull", price: 45.30, count: 1, sum: 45.30},
                {id:3, name: "Буряк", price: 27.35, count: 2, sum: 54.70}
            ]
        },
        {id: 2, type:1, name: "Шмотки", value: 2300, date: new Date(2022,10,20,12,25,26),
            items: [
                {id:1, name: "Штани", price: 1000.00, count: 1, sum: 1000.00},
                {id:2, name: "Труси", price: 250, count: 2, sum: 500.00},
                {id:3, name: "Сорочка", price: 800, count: 1, sum: 800.00},
            ]
        },
        {id: 3, type:2, name: "ЗП", value: 50000, date: new Date(2022,11,23,14,25,26), items: []},
        {id: 4, type:2, name: "Мама", value: 20000, date: new Date(2023,11,23,15,25,26), items: []}

    ];

    return (
        <Container>
        <Row>
            <Col md={6}>
               <Image width={400} height={400} src={category.img}/>
            </Col>
            {/*FOR PREMIUM*/}
            {/*<Col md={6}>*/}
            {/*    <OperationDiagram/>*/}
            {/*</Col>*/}

        </Row>
            {operations.map(operation =>
                <OperationList key={operation.id} operation={operation}/>
            )}
        </Container>
    );
});

export default Category;