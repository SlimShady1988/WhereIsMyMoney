import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import WalletSidebar from "../components/WalletSidebar";
import UserContext from "../context";
import "../pages/style/wallets.css";
import OperationsByWallet from "../components/OperationsByWallet";
import CreateWalletModal from "../components/modals/CreateWalletModal";

const Wallets = observer(() => {
    const {user} = useContext(UserContext)
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const [walletModalVisible, setWalletModalVisible] = useState(false);

     let selectedDate= new Date().toLocaleDateString('uk-UK', options);
    // const [selectedDate, setSelectedDate] = useState(null);









    const operations = [
        {id: 1, type:1, name: "Покупки їди", value: 190, date: new Date(2022,10,16,11,25,26),
             items: [
                 {id:1, name: "Огірки", price: 45.00, count: 2, sum: 90.00},
                 {id:2, name: "Red Bull", price: 45.30, count: 1, sum: 45.30},
                 {id:3, name: "Буряк", price: 27.35, count: 2, sum: 54.70}
             ]
        },
        {id: 2, type:1, name: "Шмотки", value: 2300, date: new Date(2022,10,20,12,25,26),
             items: [
                 {id:1, name: "Штани", price: 1000.00, count: 1, sum: 1000.00},
                 {id:2, name: "Труси", price: 250, count: 2, sum: 500.00},
                 {id:3, name: "Сорочка", price: 800, count: 1, sum: 800.00},
             ]
        },
        {id: 3, type:2, name: "ЗП", value: 50000, date: new Date(2022,11,13,14,25,26), items: []},
        {id: 4, type:2, name: "ЗП", value: 30000, date: new Date(2022,11,13,14,25,26), items: []},
        {id: 5, type:2, name: "Мама", value: 20000, date: new Date(2023,1,23,15,25,26), items: []}

    ];


     function setNewDate (operation) {
         selectedDate = operation;
         return null;
     }



    return (
        <Container>
             <Row className="mt-2">
                 <Col>
                     <WalletSidebar user={user}/>
                     <Row style={{ borderBottom: "6px solid dodgerblue"}}></Row>

                     <Button onClick={()=>setWalletModalVisible(true)} className="mt-2">Додати гаманець</Button>
                     <CreateWalletModal show={walletModalVisible} onHide={() => setWalletModalVisible(false)}/>
                 </Col>
                 <Col md={9}>
                     <Row>
                         <ButtonGroup className="mb-2 w-100">
                             <Button className="credit">Пішло</Button>
                             <Button className="debit">Прийшло</Button>
                         </ButtonGroup>
                     </Row>
                     <Container>
                         {operations.map(operation =>
                             <>
                                 {operation.date.toLocaleDateString('uk-UK', options) === selectedDate
                                     ?
                                     <Row>
                                         <OperationsByWallet operation={operation}/>
                                     </Row>
                                     :
                                     <Row>
                                         {setNewDate(operation.date.toLocaleDateString('uk-UK', options))}
                                         <Col md={4}>
                                             <hr/>
                                         </Col>
                                         <Col md={4}
                                              className="ps-5">{operation.date.toLocaleDateString('uk-UK', options)} </Col>
                                         <Col md={4}>
                                             <hr/>
                                         </Col>
                                         <OperationsByWallet operation={operation}/>
                                     </Row>
                                 }
                             </>
                         )}
                     </Container>
                 </Col>
             </Row>
        </Container>
    )
})

export default Wallets;

