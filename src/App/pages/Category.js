import React, {useContext} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import Operation from "./Operations";
import OperationDiagram from "../components/OperationDiagram";
import Food from "../../App/static/pizza.png";

const Category = observer(() => {
    const category =             {
        id: "2",
        name: "їда",
        img: Food
    }

    return (

        <Container>
        <Row>
            <Col md={6}>
               <Image width={400} height={400} src={category.img}/>
            </Col>
            <Col md={6}>
                <OperationDiagram/>
            </Col>
        </Row>
                <Operation/>
        </Container>
    );
});

export default Category;