import React from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";

const CreateCreditCategoryModal = ({show, onHide}) => {
    const categories = ["Одяг", "їжа", "Подарунки", "Кафе та ресторани", "Комунальні платежі"];

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Додавання категорії</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Dropdown>
                    <Dropdown.Toggle>Виберіть категорію</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                categories.map(category =>
                                    <Dropdown.Item key={category}>{category}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                        <hr/>
                        <Form.Control className="no-spinner" placeholder={"Вкажіть бюджет"} type={"number"}/>
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

export default CreateCreditCategoryModal;