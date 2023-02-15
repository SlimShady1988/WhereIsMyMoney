import React, {useContext} from 'react';
import {Button, ButtonGroup, Col, Container, Form, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Food from "../../App/static/pizza.png";
import OperationList from "../components/OperationList";
import ProgressBar from 'react-bootstrap/ProgressBar';
import EditIcon from "../static/edit-40.png";
import {useNavigate} from "react-router-dom";
import {BUDGET_ROUTE} from "../utils/consts";


const CreditCategory = observer(() => {
    const navigate = useNavigate();

    const category =             {
        id: "2",
        name: "їда",
        percentDone: 50,
        budget: 4000,
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
                    та вибрати всі товари в яких операції_ід вище згадані, та скласти їх в графік -
                    Якщо товарів більше 2 то підбиваємо суму, і якщо їх 1 елемент то до графи - інші товари
                    і складаємо відношення
                    {/*    <OperationDiagram/>*/}

                </Col>
            </Row>

            <Row className="mt-2 mx-1">
                <Col>
                    <ProgressBar now={category.percentDone} label={`${category.percentDone}%`}/>
                </Col>
            </Row>
            <Row className="mt-2 mx-1 w-50">
                <Col style={{paddingTop: '10px'}} md={6}>
                    <b>Бюджет :</b>
                </Col>
                <Col md={6}>
                    <ButtonGroup className="mb-2 w-100">
                        <Button className="btn-close-white">{category.budget} грн.</Button>
                        <Button onClick={() =>navigate(BUDGET_ROUTE)} className="btn-success btn btn-primary">
                            <img style={{width: 20, height: 20}} src={EditIcon} alt="edit"/></Button>
                    </ButtonGroup>
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

export default CreditCategory;