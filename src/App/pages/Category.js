import React, {useContext} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
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
            <Col md={6}>
                Получити всі айдішніки операцій що належать цій категорії і число не менше 1 цього місяця
                та вибрати всі товари в яких операції_ід вище згадані, та скласти їх в графік  -
                Якщо товарів більше 2 то підбиваємо суму, і якщо їх 1 елемент то до  графи - інші товари
                і складаємо відношення
            {/*    <OperationDiagram/>*/}
            </Col>

        </Row>
            Показати всі операції де категорія "відповідна"
            статус  DONE якщо кредитова
            де число не дальше 1 цього місяця

            {operations.map(operation =>
                <OperationList key={operation.id} operation={operation}/>
            )}
        </Container>
    );
});

export default Category;