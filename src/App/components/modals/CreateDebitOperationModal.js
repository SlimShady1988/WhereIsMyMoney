import React, {useContext} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import UserContext from "../../context";
import "../../pages/style/hide_spinner.css"

const CreateDebitOperationModal = ({show, onHide}) => {
    const {user} = useContext(UserContext)

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
                                        {user.wallets.map(item =>
                                            <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown className="mb-3">
                                    <Dropdown.Toggle>Виберіть категорію</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {user.debit_categories.map(item =>
                                            <Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Form.Label>Назва операції</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="input"
                                    placeholder="Наприклад: Зарплата за ... премія за..."
                                    autoFocus
                                />
                                <Form.Label>Сума</Form.Label>
                                <Form.Control className="mb-3 no-spinner" type="number"
                                    placeholder="0.00"
                                />

                            </Form>
                        </Form.Group>
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
export default CreateDebitOperationModal;