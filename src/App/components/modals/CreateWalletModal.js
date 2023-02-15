import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const CreateWalletModal = observer( ({show, onHide}) => {
    const currency = ["UAH", "USD", "EUR", "PLN", "GBP"];

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Додавання гаманця</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="walletName">
                            <Form.Label>Назва гаманця</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Наприклад: Під подушкою"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="currency">
                            <Form.Label>Виберіть валюту:</Form.Label><br/>
                            {
                                currency.map(item =>
                                     <Form.Check key={item} inline type="radio" label={item} name="group1" id={`disabled-default-${item}`}/>
                                )
                            }
                        </Form.Group>
                        <hr/>
                        <p>Після створення гаманця, вам буде додано декілька категорій дебетових операцій.
                            В налаштуваннях категорій ви зможете видалити деякі з них,
                            або додати більше.</p>
                        І нехай прибутки переважають витрати!
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Закрити</Button>
                    <Button variant="primary" onClick={onHide}>Додати</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateWalletModal;