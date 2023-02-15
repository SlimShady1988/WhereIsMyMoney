import React, {useContext} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Food from "../../App/static/pizza.png";
import OperationList from "../components/OperationList";

const DebitCategory = observer(() => {
    const category =             {
        id: "3",
        name: "ЗП",
        img: Food
    }

    const operations = [
        {id: 1, type:2, name: "Січень", value: 50000, date: new Date(2022,11,23,14,25,26), items: []},
        {id: 2, type:2, name: "Лютий", value: 20000, date: new Date(2023,11,23,15,25,26), items: []}

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
                <div className="mt-2">
                    <OperationList key={operation.id} operation={operation}/>
                </div>
            )}
        </Container>
    );
});

export default DebitCategory;