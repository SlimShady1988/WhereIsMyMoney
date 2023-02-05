import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row, Table} from "react-bootstrap";
import "../../pages/style/hide_spinner.css"
import UserContext from "../../context";

const CreateCreditOperationModal = ({show, onHide, data}) => {
    // const options = {year: "numeric", month: 'long', day: 'numeric' };
    const {user} = useContext(UserContext)
    const [goods, setGoods] = useState([])
    const [table, setTable] = useState([])
    const [controlDivs, setControlDivs] = useState([document.querySelectorAll('.amount-value')])
    const [amount, setAmount] = useState(0)
    let title = data.inPlan === false ? "Що пішло - того не вернеш" : "Планую купити"

    const addGoods = () => {
        setTable(['№', 'Назва товару', 'Ціна товару', 'Кількість товару', 'Сума товару'])
        setGoods([...goods, {title: '', price: 0, count: 1, value: 0, date: Date.now()}])
    }

    const removeGoods = (date) => {
        setGoods(goods.filter((e) =>
            e.date !== date
        ));
        if (goods.length <= 1) {
            setTable([])
        }
        setControlDivs([...controlDivs])

    }

    function checkSum(e, number) {
        let $count = document.querySelector('#data-count-'+number);
        let $sum = document.querySelector('#data-sum-'+number);
        $count.removeAttribute('disabled')

        if (Number.parseFloat(Number(e)) > 0) {
            if (Number.parseFloat($count.value) > 0) {
                $sum.value = e * $count.value;
            } else {
                $count.value = 1;
            }
            $sum.value = e * $count.value;
        } else {
            $count.value = '';
            $sum.value = '';
            $count.setAttribute('disabled', '')
        }
        setControlDivs([...controlDivs]);
        return undefined;
    }

    function setSum(value, number) {
        let $price = document.querySelector('#data-price-'+number);
        let $count = document.querySelector('#data-count-'+number);
        if (Number.parseFloat(Number(value))) {
            $count.value = 1;
            $price.value = value;
            $count.setAttribute('disabled', '')
            $price.setAttribute('disabled', '')
        } else {
            $price.value = '';
            $count.value = '';
            $price.removeAttribute('disabled')
        }
        setControlDivs([...controlDivs])
    }

    useEffect(() => {
        let a = 0;
        let $sum = document.querySelectorAll('.amount-value');
        for (let i = 0; i < $sum.length; i++) {
            a += Number($sum.item(i).value);
        }
        let total = document.querySelector('.total-amount');
        if ($sum.length > 0) {
            total.setAttribute('disabled', '');
            total.value = a;
        } else {
            if (total !== null && total.hasAttribute('disabled')) {
                total.removeAttribute('disabled');
                total.value = 0;
            }
        }

        setAmount(a)

    }, [controlDivs])

    function checkCount(e, number) {
        e = Number.parseFloat(Number(e));
        let $price = document.querySelector('#data-price-'+number);
        let $sum = document.querySelector('#data-sum-'+number);
        if (e > 0)  {
            $sum.value = e * $price.value;

        } else {
            console.log(e === 0)
            if (e === 0 || e === '') {
                $sum.value = $price.value;
            }
        }
        setControlDivs([...controlDivs])

        return undefined;
    }

    return (
        <div>
            <Modal size="lg" show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle>Виберіть заначку</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.wallets.map(item =>
                                    <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                            </Col>

                            <Col md={6}>
                                {data.date}
                            </Col>
                        </Row>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle>Виберіть категорію</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.credit_categories.map(item =>
                                    <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Label>Назва операції</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="input"
                            placeholder="Наприклад: сільпо ... д.н. коханки..."
                            autoFocus/>
                        {data.inPlan === false &&
                            <>
                                <Form.Label>Сума</Form.Label>
                                <Form.Control className="mb-3 no-spinner total-amount" type="number" placeholder={amount}/>
                            </>
                        }
                        <Button className="mb-3" variant={"outline-info"}
                                onClick={addGoods}> Додати товар</Button>

                        <Table striped bordered hover>
                            <thead>
                            {data.inPlan === false &&
                                <tr>
                                {table.map(title => <th key={title}>{title}</th>)}
                                </tr>
                            }
                            </thead>
                            <tbody>
                            {goods.map((e, i) =>
                                <tr key={e.date}>
                                    <td>
                                        {i+1}
                                    </td>
                                    <td width="60%">
                                        <Form.Control type="input" placeholder="Назва товару"/>
                                    </td>

                                    {data.inPlan === false &&
                                        <>
                                            <td width="15%">
                                                <Form.Control className="no-spinner"
                                                              type="number"
                                                              id={'data-price-' + i} data-price={i}
                                                              onChange={(e) =>
                                                                  checkSum(e.target.value, e.target.dataset.price)}/>
                                            </td>
                                            <td width="10%">
                                                <Form.Control className="no-spinner"
                                                              type="number"
                                                              disabled
                                                              id={'data-count-' + i} data-count={i}
                                                              onChange={(e) =>
                                                                  checkCount(e.target.value, e.target.dataset.count)}/>
                                            </td>
                                            <td width="15%">
                                                <Form.Control className="no-spinner amount-value"
                                                              type="number"
                                                              id={'data-sum-' + i}
                                                              data-sum={i}
                                                              onChange={(e) =>
                                                                  setSum(e.target.value, e.target.dataset.sum)}/>
                                            </td>
                                        </>
                                    }
                                    <td className="d-flex justify-content-center">
                                        <Button onClick={() => removeGoods(e.date)} variant={"outline-danger"}>Видалити</Button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Закрити</Button>
                    <Button variant="primary" onClick={onHide}>{data.inPlan === false ? 'Додати' : 'Запланувати' }</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default CreateCreditOperationModal;