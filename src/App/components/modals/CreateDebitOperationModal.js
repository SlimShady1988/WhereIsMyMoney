import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import UserContext from "../../context";
import "../../pages/style/hide_spinner.css"
import {observer} from "mobx-react-lite";
import {fetchWallets} from "../../http/walletApi";

const CreateDebitOperationModal = observer( ({show, onHide}) => {
    const {user} = useContext(UserContext)
    const [wallet, setWallet] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [wallets, setWallets] = useState([])

    useEffect(() => {
        fetchWallets().then(data => {
            setWallets(data)
        })
    }, [])

    const submitDebit = () => {
        onHide();
    }
    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Боженька змилосердилась</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form>
                                <Dropdown className="mb-3">
                                    <Dropdown.Toggle>Виберіть заначку</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {wallets.map(item =>
                                            <Dropdown.Item
                                                onChange={()=>setWallet(item.name)}
                                                key={item.name}>{item.name}</Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown className="mb-3">
                                    <Dropdown.Toggle>Виберіть категорію</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {user.debit_categories.map(item =>
                                            <Dropdown.Item
                                                onChange={()=>setCategory(item.name)}
                                                key={item.name}>{item.name}</Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Form.Label>Назва операції</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="input"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Наприклад: Заробітня плата, ..."
                                    autoFocus/>
                                <Form.Label>Сума</Form.Label>
                                <Form.Control className="mb-3 no-spinner total-amount"
                                              type="number"
                                              onChange={e => setAmount(Number(e.target.value))}
                                              defaultValue={amount}/>

                            </Form>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Закрити</Button>
                    <Button variant="primary" onClick={submitDebit}>Додати</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});
export default CreateDebitOperationModal;