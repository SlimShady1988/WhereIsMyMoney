import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import UserContext from "../context";
import {Button, ButtonGroup, Container, Row, ToggleButton} from "react-bootstrap";
import CategoryItem from "../components/CategoryItem";
import CategoryDiagram from "../components/CategoryDiagram";
import CreateCreditCategoryModal from "../components/modals/CreateCreditCategoryModal";
import CreateDebitCategoryModal from "../components/modals/CreateDebitCategoryModal";
import "../pages/style/hide_spinner.css"

const Categories = observer(() => {
    const {user} = useContext(UserContext)
    const [radioValue, setRadioValue] = useState('1');
    const [categories, setCategories] = useState([]);
    const [labels, setLabels] = useState([]);
    const [percents, setPercents] = useState([]);
    const [debitCategoryModalVisible, setDebitCategoryModalVisible] = useState(false);
    const [creditCategoryModalVisible, setCreditCategoryModalVisible] = useState(false);

    let creditBudget = user.creditBudget;
    let debitTotal = user.debitTotal;

    useEffect(() => {
        createCreditCategories()
    }, [])

    const radios = [
        { name: 'Пішло', value: '1' },
        { name: 'Прийшло', value: '2' },
    ];

    const changeCategoryList = (value) => {
        setRadioValue(value);
        if (value === "1") {
            createCreditCategories();
        } else  {
            createDebitCategories();
        }
    }

    const createDebitCategories = () => {
        let categories = [];
        let labels = [];
        let percents = [];
        user.debit_categories.map(category => {
                let cPercent = Math.round((category.debitValue * 100 / debitTotal) * 100) / 100;
                percents.push(cPercent);
                labels.push(category.name)

                return  categories.push({
                    id: category.id,
                    name: category.name,
                    value: category.debitValue,
                    img: category.img,
                });
            }
        );
        setCategories(categories);
        setLabels(labels)
        setPercents(percents);
    }

    const createCreditCategories = () => {
        let categories = [];
        let labels = [];
        let percents = [];
        user.credit_categories.map(category => {
            let cPercent = Math.round((category.budget * 100 / creditBudget) * 100) / 100;
            percents.push(cPercent);
                labels.push(category.name)

                return  categories.push({
                    id: category.id,
                    name: category.name,
                    budget: category.budget,
                    spend: category.spend,
                    img: category.img,
                    percentDone: (category.spend * 100 / category.budget)
                });
            }
        );
        setCategories(categories);
        setLabels(labels)
        setPercents(percents);
    }

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
                            onChange={(e) => changeCategoryList(e.currentTarget.value)}
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
                    {categories.map(category =>
                        radioValue === "1"
                            ?
                            <CategoryItem key={category.id} category={category} type={"credit"}/>
                            :
                            <CategoryItem key={category.id} category={category} type={"debit"}/>
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
                    <Button className="led-blink" onClick={radioValue === "1"
                        ? ()=>setCreditCategoryModalVisible(true)
                        : ()=>setDebitCategoryModalVisible(true)}
                    >Додати категорію</Button>

                    <CreateCreditCategoryModal show={creditCategoryModalVisible} onHide={() => setCreditCategoryModalVisible(false)}/>
                    <CreateDebitCategoryModal show={debitCategoryModalVisible} onHide={() => setDebitCategoryModalVisible(false)}/>
                </div>
            </Container>
        </Container>
    )
});

export default Categories;