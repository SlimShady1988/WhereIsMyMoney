import React, {useContext, useEffect} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import UserContext from "../../context";
import {observer} from "mobx-react-lite";

const CreateDebitCategoryModal = observer( ({show, onHide}) => {
    const {user} = useContext(UserContext)
    const categories = user.debit_categories;

    // useEffect(() => {
    //   fetchDebitCategory().then(data => userCa)
    // }, [])

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
                                        <Dropdown.Item key={category}>{category.name}</Dropdown.Item>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
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

export default CreateDebitCategoryModal;