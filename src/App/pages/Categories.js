import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import UserContext from "../context";
import {Button, ButtonGroup, Container, Row, ToggleButton} from "react-bootstrap";
import CategoryItem from "../components/CategoryItem";
import "../pages/style/categories.css"
import CategoryDiagram from "../components/CategoryDiagram";

const Categories = observer(() => {
    const {user} = useContext(UserContext)
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Пішло', value: '1' },
        { name: 'Прийшло', value: '2' },
    ];

    let updatedCategories = [];
    let budget = user.creditBudget;
    let percents = [];
    let labels = [];

    user.credit_categories.map(category => {
        let cPercent = Math.round((category.budget * 100 / budget) * 100) / 100;
        percents.push(cPercent);
        labels.push(category.name)
           return  updatedCategories.push({
                id: category.id,
                name: category.name,
                budget: category.budget,
                spend: category.spend,
                img: category.img,
                percentDone: (category.spend * 100 / category.budget)
            });
        }
    );

    return (
        <Container>
            <Row className="mt-2">
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Row>
                <Container className="mt-3 d-flex justify-content-center">
                    <CategoryDiagram percents={percents} labels = {labels}/>
                </Container>
            <Row className="mt-2 d-flex justify-content-center">
                <>
                    {updatedCategories.map(category =>
                        <CategoryItem key={category.id} category={category}/>
                    )}
                </>
            </Row>
            <Container className="textContainer">
                <div className="led-box">
                    {radioValue === "1"
                        ?
                        <input hidden className="color-toggle" type="checkbox" />
                        :
                        <input hidden className="color-toggle" type="checkbox" checked/>
                    }
                    <Button  className="led-blink">Додати категорію</Button>
                </div>
            </Container>
        </Container>
    )
});



export default Categories;