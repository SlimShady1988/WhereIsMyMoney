import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, ButtonGroup, Col, Container, ListGroup, Row} from "react-bootstrap";
import WalletSidebar from "../components/WalletSidebar";
import UserContext from "../context";
import "../pages/style/wallets.css";
import OperationsByWallet from "../components/OperationsByWallet";

const Wallets = observer(() => {
    const {user} = useContext(UserContext)

    return (
        <Container>
            <Row className="mt-2">
                <Col>
                    <WalletSidebar user={user}/>

                    <Button className="mt-2">Add Wallet</Button>
                </Col>
                <Col md={9}>
                    <Row>
                        <ButtonGroup className="mb-2 w-100">
                            <Button className="credit">Пішло</Button>
                            <Button className="debit">Прийшло</Button>
                        </ButtonGroup>
                    </Row>
                    <OperationsByWallet/>
                </Col>
            </Row>
        </Container>
    );
})

export default Wallets;