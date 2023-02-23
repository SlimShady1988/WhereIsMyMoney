import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Modal, Row, Table} from "react-bootstrap";
import {OPERATIONS_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";


const CreditOperation = observer(() => {
    const navigate = useNavigate();
    const [controlDivs, setControlDivs] = useState([document.querySelectorAll('.amount-value')]);
    const [amount, setAmount] = useState(0);
    const [goods, setGoods] = useState([]);
    const [table, setTable] = useState(['№', 'Назва товару', 'Ціна товару', 'Кількість товару', 'Сума товару'])

    const operation =
        {id: 7, wallet: "wallet1", category: "кафе та ресторани", name: "Покупки їжі", value: 190,
            date: new Date(2023, 2, 7, 11, 25, 26),
            items: [
                {id: 1, name: "Огірки",  count: 2, date: new Date(2023, 2, 7, 11, 25, 25)},
                {id: 2, name: "Red Bull",  count: 1, date: new Date(2023, 2, 7, 11, 25, 28)},
                {id: 3, name: "Буряк",  count: 2, date: new Date(2023, 2, 7, 11, 25, 26)}
            ]
        };

    let wallet = "wallet 1"
    let category = "category"
    let name = "name"

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

    const removeGoods = (date) => {
        setGoods(goods.filter((e) =>
            e.date.getTime() !== date
        ));
        if (goods.length <= 1) {
            setTable([])
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

    useEffect( () => {
        setGoods(operation.items);
    },[])


    const crossOut = (target, date) => {
        if (!target.hasAttribute('checked')) {
            target.setAttribute('checked', '')
            target.parentElement.parentElement.parentElement.style.textDecoration = 'line-through'
            document.querySelector('#data-price-' + date).setAttribute('disabled', '');
            document.querySelector('#data-count-' + date).setAttribute('disabled', '');
            document.querySelector('#data-sum-' + date).setAttribute('disabled', '');
            target.parentElement.parentElement.parentElement
                .getElementsByTagName('Button').item(0).setAttribute('disabled', '')

        } else {
            target.removeAttribute('checked');
            target.parentElement.parentElement.parentElement.style.textDecoration = '';
            document.querySelector('#data-price-' + date).removeAttribute('disabled');
            document.querySelector('#data-count-' + date).removeAttribute('disabled');
            document.querySelector('#data-sum-' + date).removeAttribute('disabled');
            target.parentElement.parentElement.parentElement.getElementsByTagName('Button')
                .item(0).removeAttribute('disabled');
        }
    }

    const donePlanned = () => {
        goods.map(good => {
            good.value = document.querySelector('#data-sum-' + good.date.getTime()).value;
            good.price = document.querySelector('#data-price-' + good.date.getTime()).value;
            good.count = document.querySelector('#data-count-' + good.date.getTime()).value;
            good.title = document.querySelector('#data-name-' + good.date.getTime()).value;
        });

        navigate(OPERATIONS_ROUTE)
    }

    return (

        <div>
            <Container className="mt-5">
                    <Form>
                        <Form.Label>Назва Рахунку</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="input"
                            disabled
                            defaultValue={wallet}
                            autoFocus/>
                        <Form.Label>Назва Категорії</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="input"
                            disabled
                            defaultValue={category}
                            autoFocus/>
                        <Form.Label>Назва операції</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="input"
                            defaultValue={name}
                            placeholder="Наприклад: сільпо ... д.н. коханки..."
                            autoFocus/>
                        <Form.Label>Сума</Form.Label>
                        <Form.Control className="mb-3 no-spinner total-amount"
                                      type="number"
                                      onChange={e => setAmount(Number(e.target.value))}
                                      defaultValue={amount}/>
                        {goods.length > 0
                            &&
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                {table.map(title => <th key={title}>{title}</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {goods.map((g) =>
                                <tr key={g.date.getTime()}>
                                    <td>
                                        <Form.Check onClick={ e => crossOut(e.target, g.date.getTime()) }
                                                    type="checkbox" />
                                    </td>
                                    <td width="60%">
                                        <Form.Control id={'data-name-' + g.date.getTime()}
                                                      type="input"
                                                      disabled
                                                      value={g.name}/>
                                    </td>
                                    <td width="15%">
                                        <Form.Control className="no-spinner"
                                                      type="number"
                                                      id={'data-price-' + g.date.getTime()}
                                                      data-price={g.date.getTime()}
                                                      onChange={(e) =>
                                                          checkPrice(Number(e.target.value), e.target.dataset.price)}/>
                                    </td>
                                    <td width="10%">
                                        <Form.Control className="no-spinner"
                                                      type="number"
                                                      defaultValue={g.count}
                                                      disabled
                                                      id={'data-count-' + g.date.getTime()}
                                                      data-count={g.date.getTime()}
                                                      onChange={(e) =>
                                                          setCount(Number(e.target.value), e.target.dataset.count)}/>
                                    </td>
                                    <td width="15%">
                                        <Form.Control className="no-spinner amount-value"
                                                      type="number"
                                                      id={'data-sum-' + g.date.getTime()}
                                                      data-sum={g.date.getTime()}
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
                        }
                    </Form>
                    <Button variant="primary" onClick={donePlanned}>Додати</Button>
            </Container>
        </div>
    );
});

export default CreditOperation;