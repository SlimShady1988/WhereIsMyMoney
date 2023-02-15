import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row, Table} from "react-bootstrap";
import "../../pages/style/hide_spinner.css"
import UserContext from "../../context";
import {observer} from "mobx-react-lite";

const PlannedCreditOperationModal = observer( ({show, onHide, data}) => {
    const options = {year: "numeric", month: 'long', day: 'numeric' };
    const {user} = useContext(UserContext)
    const [goods, setGoods] = useState([])
    const [wallet, setWallet] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [table, setTable] = useState([])
    let title = "Планую купити";

    const addGoods = () => {
        setTable(['№', 'Назва товару', 'Кількість товару'])
        setGoods([...goods, {title: '', count: '', date: new Date()}])
    }

    const removeGoods = (date) => {

        setGoods(goods.filter((e) =>
            e.date.getTime() !== date
        ));
        if (goods.length <= 1) {
            setTable([])
        }
    }

    useEffect(() => {
        if (data.id !== undefined) {
            setWallet(data.wallet)
            setCategory(data.category)
            setName(data.name)
            setGoods(data.items)
            setTable(['№', 'Назва товару', 'Кількість товару'])
        } else {
            setWallet('')
            setCategory('')
            setName('')
            setGoods([])
            setTable([])
        }
    }, [data])

    const toPlanCredit = () => {
        goods.map(good => {
            good.count = document.querySelector('#data-count-' + good.date.getTime()).value;
            good.title = document.querySelector('#data-name-' + good.date.getTime()).value;
        });
        // name, category, wallet
        // window.location.reload();
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
                                    <Dropdown.Toggle> {wallet || 'Виберіть заначку'}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {user.wallets.map(item =>
                                            <Dropdown.Item
                                                onClick={() => setWallet(item.name)}
                                                key={item.name}>{item.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md={6}>
                                {new Date(data.date).toLocaleDateString('uk-UK', options)}
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
                            value={name || ''}
                            onChange={e => setName(e.target.value)}
                            className="mb-3"
                            type="input"
                            placeholder="Наприклад: сільпо ... д.н. коханки..."
                            autoFocus/>

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
                                <tr key={g.date.getTime()}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td width="60%">
                                        <Form.Control defaultValue={g.name}
                                                      id={'data-name-' + g.date.getTime()}
                                                      type="input"
                                                      placeholder="Назва товару"/>
                                    </td>

                                    <td width="10%">
                                        <Form.Control className="no-spinner"
                                                      type="number"
                                                      defaultValue={g.count}
                                                      id={'data-count-' + g.date.getTime()} data-count={g.date.getTime()}/>
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
                    <Button variant="primary" onClick={toPlanCredit}>Запланувати</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});
export default PlannedCreditOperationModal;