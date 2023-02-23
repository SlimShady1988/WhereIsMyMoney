import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row, Table} from "react-bootstrap";
import "../../pages/style/hide_spinner.css"
import UserContext from "../../context";
import {observer} from "mobx-react-lite";
import {fetchWallets} from "../../http/walletApi";


const CreateCreditOperationModal = observer(({show, onHide}) => {
    const {user} = useContext(UserContext);
    const [wallet, setWallet] = useState('');
    const [category, setCategory] = useState('');
    const [goods, setGoods] = useState([]);
    const [table, setTable] = useState([]);
    const [controlDivs, setControlDivs] = useState([document.querySelectorAll('.amount-value')]);
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState('');
    const [wallets, setWallets] = useState([]);
    let title = "Що пішло - того не вернеш";

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

    const checkPrice = (price, number) => {
        let $count = document.querySelector('#data-count-' + number);
        let $sum = document.querySelector('#data-sum-' + number);
        $count.removeAttribute('disabled')

        if (Number.parseFloat(price) > 0) {
            if (Number.parseFloat($count.value) > 0) {
                $sum.value = price * $count.value;
            } else {
                $count.value = 1;
            }
            $sum.value = price * $count.value;
        } else {
            $count.value = '';
            $sum.value = '';
            $count.setAttribute('disabled', '')
        }

        setControlDivs([...controlDivs]);
    }

    const setCount = (count, number) => {
        count = Number.parseFloat(count);
        let $price = document.querySelector('#data-price-' + number);
        let $sum = document.querySelector('#data-sum-' + number);
        if (count > 0) {
            $sum.value = count * $price.value;
        } else {
            if (count === 0 || count === '') {
                $sum.value = $price.value;
            }
        }

        setControlDivs([...controlDivs])
    }

    const setSum = (value, number) => {
        let $price = document.querySelector('#data-price-' + number);
        let $count = document.querySelector('#data-count-' + number);
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
        let amount = 0;
        let $sum = document.querySelectorAll('.amount-value');
        for (let i = 0; i < $sum.length; i++) {
            amount += Number($sum.item(i).value);
        }
        let total = document.querySelector('.total-amount');
        if ($sum.length > 0) {
            total.setAttribute('disabled', '');
            total.value = amount;
        } else {
            if (total !== null && total.hasAttribute('disabled')) {
                total.removeAttribute('disabled');
                total.value = 0;
            }
        }
        setAmount(amount)

    }, [controlDivs])

    useEffect(() => {
        fetchWallets().then(data => {
            setWallets(data)
        })
    }, [])


    const submitCredit = () => {
        goods.map(good => {
            good.value = document.querySelector('#data-sum-' + good.date).value;
            good.price = document.querySelector('#data-price-' + good.date).value;
            good.count = document.querySelector('#data-count-' + good.date).value;
            good.title = document.querySelector('#data-name-' + good.date).value;
        });

        onHide();
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
                                    <Dropdown.Toggle> { wallet || 'Виберіть заначку'}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {wallets.map(item =>
                                            <Dropdown.Item
                                                onClick={() =>setWallet(item.name)}
                                                key={item.name}>{item.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle>{ category || 'Виберіть категорію'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.credit_categories.map(item =>
                                    <Dropdown.Item
                                        onClick={() =>setCategory(item.name)}
                                        key={item.name}>{item.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Label>Назва операції</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Наприклад: сільпо ... д.н. коханки..."
                            autoFocus/>
                        <Form.Label>Сума</Form.Label>
                        <Form.Control className="mb-3 no-spinner total-amount"
                                      type="number"
                                      onChange={e => setAmount(Number(e.target.value))}
                                      defaultValue={amount}/>
                        <Button className="mb-3" variant={"outline-info"}
                                onClick={addGoods}> Додати товар</Button>

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                {table.map(title => <th key={title}>{title}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {goods.map((g, i) =>
                                <tr key={g.date}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td width="60%">
                                        <Form.Control id={'data-name-' + g.date} type="input" placeholder="Назва товару"/>
                                    </td>

                                    <td width="15%">
                                        <Form.Control className="no-spinner"
                                                      type="number"
                                                      id={'data-price-' + g.date}
                                                      data-price={g.date}
                                                      onChange={(e) =>
                                                          checkPrice(Number(e.target.value), e.target.dataset.price)}/>
                                    </td>
                                    <td width="10%">
                                        <Form.Control className="no-spinner"
                                                      type="number"
                                                      disabled
                                                      id={'data-count-' + g.date} data-count={g.date}
                                                      onChange={(e) =>
                                                          setCount(Number(e.target.value), e.target.dataset.count)}/>
                                    </td>
                                    <td width="15%">
                                        <Form.Control className="no-spinner amount-value"
                                                      type="number"
                                                      id={'data-sum-' + g.date}
                                                      data-sum={g.date}
                                                      onChange={(e) =>
                                                          setSum(e.target.value, e.target.dataset.sum)}/>
                                    </td>
                                    <td className="d-flex justify-content-center">
                                        <Button onClick={() => removeGoods(g.date.getTime())}
                                                variant={"outline-danger"}>Видалити</Button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Закрити</Button>
                    <Button variant="primary" onClick={submitCredit}>Додати</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateCreditOperationModal;