import React, {useContext, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import Save from "../static/save.png";
import UserContext from "../context";

const Budget = () => {
    const table = ['№', 'Назва Категорії', 'Бюджет(грн)', 'Витрачено(грн)', 'Витрачено (%)', 'save']
    const [budget, setBudget] = useState()
    const {user} = useContext(UserContext)
    const categories = user._credit_categories;
    console.log(categories)

    const save = (categoryId) => {
        console.log("відправ запит на update  поля бюджет категорії з ID categoryId в БД ")

    };

    return (
        <Container>
            <Table className="m-3" striped bordered hover >
                <thead>
                <tr>
                    {table.map(title => <th key={title}>{title}</th>)}
                </tr>
                </thead>
                <tbody>
                {categories.map((category, i) =>
                    <tr key={category.date}>
                        <td>
                            {i + 1}
                        </td>
                        <td>
                            {category.name}
                        </td>

                        <td>
                            <Form.Control className="no-spinner"
                                          type="number"
                                          defaultValue={category.budget}
                                          onChange={(e) =>
                                              setBudget(Number(e.target.value))}/>
                        </td>
                        <td>
                            <Form.Control className="no-spinner"
                                          type="number"
                                          disabled
                                          value={category.spend}/>
                        </td>
                        <td width="15%">
                            <Form.Control className="no-spinner amount-value"
                                          type="number"
                                          disabled
                                          value={(category.spend * 100 / category.budget)}
                            />
                        </td>
                        <td className="d-flex justify-content-center">
                            <Button onClick={() => save(category.id)}
                                    title = "Save changes"
                                    className="w-100 btn-success">
                                <img style={{width: 20, height: 20}} src={Save} alt="save"/>
                            </Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
};

export default Budget;