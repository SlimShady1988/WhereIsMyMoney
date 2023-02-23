import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {addWallet} from "../../http/walletApi";

const CreateWalletModal = observer( ({show, onHide}) => {
    const currency = ["UAH", "USD", "EUR", "PLN", "GBP"];
    const [walletName, setWalletName] = useState()
    const [walletCurrency, setWalletCurrency] = useState()


    const createWallet = () => {
        addWallet({name: walletName, currency: walletCurrency}).then(data =>
            alert(data.message)
        ).finally(() => {
            //Поки що перезавантажимо, а далі в стейтах тре буде вийти з циклу... щось придумати...
            window.location.reload()
        });
    }

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Додавання гаманця</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="currencyForm">
                        <Form.Group className="mb-3" controlId="walletName">
                            <Form.Label>Назва гаманця</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder="Наприклад: Під подушкою"
                                autoFocus
                                onChange={(e)=>{setWalletName(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="currency">
                            <Form.Label>Виберіть валюту:</Form.Label><br/>
                            {
                                currency.map(item =>
                                     <Form.Check onChange={(e) => {setWalletCurrency(e.target.value)}}
                                                 key={item}
                                                 inline value={item}
                                                 type="radio"
                                                 label={item}
                                                 name="group1"
                                                 id={`disabled-default-${item}`}/>
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
                    <Button variant="primary" onClick={createWallet}>Додати</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default CreateWalletModal;