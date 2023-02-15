import React from 'react';
import {Card, Col} from "react-bootstrap";
import card from "../pages/style/categories.css"
import {useNavigate} from "react-router-dom";
import {CREDIT_CATEGORY_ROUTE} from "../utils/consts";
import {DEBIT_CATEGORY_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import ProgressBar from 'react-bootstrap/ProgressBar';


const CategoryItem = observer(({category, type}) => {
    const navigate = useNavigate();
    return (
        <Col className="m-3" style={{maxWidth: '20rem'}}
             onClick={() => navigate((type === "credit" ? CREDIT_CATEGORY_ROUTE : DEBIT_CATEGORY_ROUTE) +"/" + category.id)}>
            <Card key={category.id} style={card.card}>
                <Card.Img variant="top" src={category.img}/>
                <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text>
                        { type === "credit"
                            ?
                            <ProgressBar now={category.percentDone} label={`${category.percentDone}%`}/>
                            :
                            <p style={{color: "blue", margin: 0}}>{category.value} грн.</p>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
            <div id="chart">
            </div>
        </Col>
    );
});

export default CategoryItem;