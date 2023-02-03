import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal, Table} from "react-bootstrap";
import "../../pages/style/hide_spinner.css"
import UserContext from "../../context";

const CreateCreditOperationModal = ({show, onHide}) => {
    const {user} = useContext(UserContext)
    const [goods, setGoods] = useState([])
    const [table, setTable] = useState([])
    const [math, setMath] = useState([document.querySelectorAll('.amount-value')])
    const [amount, setAmount] = useState(0)
    let number = 1;

    const addGoods = () => {
        setTable(['№', 'Назва товару', 'Ціна товару', 'Кількість товару', 'Сума товару'])
        setGoods([...goods, {title:'', price: 0, count: 1, value: 0}])
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
        setMath([...math]);
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
        setMath([...math])
    }

    useEffect(() => {
        let a = 0;
        let $sum = document.querySelectorAll('.amount-value');
        for (let i = 0; i < $sum.length; i++) {
            a += Number($sum.item(i).value);
        }
        if ($sum.length > 0) {
            let total = document.querySelector('.total-amount');
            total.setAttribute('disabled', '');
            total.value = a;
        }
        setAmount(a)

    }, [math])

    function checkCount(e, number) {
        e = Number.parseFloat(Number(e));
        // let $count = document.querySelector('#data-count-'+number);
        let $price = document.querySelector('#data-price-'+number);
        let $sum = document.querySelector('#data-sum-'+number);
        // if (Number.parseFloat(Number(e)) > 0)  {
        if (e > 0)  {
            $sum.value = e * $price.value;

        } else {
            console.log(e === 0)
            if (e === 0 || e === '') {
                $sum.value = $price.value;
            }
        }
        setMath([...math])

        return undefined;
    }

    return (
        <div>
            <Modal size="lg" show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Що пішло - того не вернеш</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle>Виберіть заначку</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.wallets.map(item =>
                                    <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

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
                        <Form.Label>Сума</Form.Label>
                        <Form.Control className="mb-3 no-spinner total-amount" type="number" placeholder={amount}/>
                        <Button className="mb-3" variant={"outline-info"}
                                onClick={addGoods}> Додати товар</Button>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                {table.map(title => <th key={title}>{title}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {goods.map(() =>
                                <tr key={'key'+number++}>
                                    <td>
                                        {number}
                                    </td>
                                    <td width="60%">
                                        <Form.Control type="input" placeholder=""/>
                                    </td>
                                    <td width="15%">
                                        <Form.Control className="no-spinner"
                                                      type="number"
                                                      id={'data-price-'+number} data-price={number}
                                                      onChange={(e) => checkSum(e.target.value, e.target.dataset.price)}/>
                                    </td>
                                    <td width="10%">
                                        <Form.Control className="no-spinner"
                                                      type="number"
                                                      disabled
                                                      id={'data-count-'+number} data-count={number}
                                                      onChange={(e) => checkCount(e.target.value, e.target.dataset.count)}/>
                                    </td>
                                    <td width="15%">
                                        <Form.Control className="no-spinner amount-value"
                                                      type="number"
                                                      id={'data-sum-'+number}
                                                      data-sum={number}
                                                      onChange={(e) => setSum(e.target.value, e.target.dataset.sum)}/>
                                    </td>
                                    <td>
                                        <Button variant={"outline-danger"}>Видалити</Button>
                                    </td>
                                </tr>
                            )
                            }
                            </tbody>
                        </Table>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Закрити</Button>
                    <Button variant="primary" onClick={onHide}>Додати</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default CreateCreditOperationModal;