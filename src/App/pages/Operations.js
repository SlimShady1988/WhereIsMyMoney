import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Col, Container, DropdownButton, Row} from "react-bootstrap";
import OperationList from "../components/OperationList";
import "../pages/style/operations.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CreateWalletModal from "../components/modals/CreateWalletModal";
import CreateCreditOperationModal from "../components/modals/CreateCreditOperationModal";
import OperationsByWallet from "../components/OperationsByWallet";
import CreateCreditCategoryModal from "../components/modals/CreateCreditCategoryModal";
import CreateDebitCategoryModal from "../components/modals/CreateDebitCategoryModal";
import CreateDebitOperationModal from "../components/modals/CreateDebitOperationModal";

const Operations = observer(() => {
    const options = {year: "numeric", month: 'long', day: 'numeric' };
    // const {operation} = useContext(UserContext);
    const [startDate, setStartDate] = useState(new Date());
    const [creditOperationModalVisible, setCreditOperationModalVisible] = useState(false);
    const [debitOperationModalVisible, setDebitOperationModalVisible] = useState(false);

    const [value, setValue] = useState(new Date());

    let selectedDate= new Date().toLocaleDateString('uk-UK', options);
    function setNewDate (operation) {
        selectedDate = operation;
        return null;
    }


/*Получені з БД операцыъ треба змерджити в 1 масив тому що не будуть операції сортуватись
 по сторонах якщо зробити 2 різні колонки в гаманцю, або не буде точної сортування по даті, якщо на сторінці операцій*/
    const operations = [
        {id: 1, type:1, name: "Покупки їди", value: 190, date: new Date(2022,10,23,11,25,26),
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
        {id: 3, type:2, name: "ЗП", value: 50000, date: new Date(2022,11,23,14,25,26), items: []},
        {id: 4, type:2, name: "ЗП", value: 30000, date: new Date(2022,11,23,14,25,26), items: []},
        {id: 5, type:2, name: "Мама", value: 20000, date: new Date(2023,1,23,15,25,26), items: []}

    ];


    return (
        <Container>
            <Row className="mt-2">
                <Col md={4}>
                        <h3 style={{textAlign: "center"}}>Період</h3>
                        <Row className="d-flex flex-column m-3">
                            <Calendar locale = {"uk-Uk"} onChange={setValue} value={value}/>
                        </Row>
                    <Row style={{ borderBottom: "6px solid dodgerblue"}}></Row>
                    <Col>
                        <h3 style={{textAlign: "center"}}>Хочу купити <br/>
                            {value.toLocaleDateString('uk-UK', options)}:</h3>

                        <Button className="mt-2">Додати заплановану покупку</Button>
                    </Col>
                </Col>


                <Col md={8} >
                        <Row>
                            <Col className="d-flex" md={3}>
                                <Button className="led-blink-credit"
                                        onClick={()=>setCreditOperationModalVisible(true)}>Пішло як в землю
                                </Button>
                            </Col>
                            <Col md={6}>
                                <h3 style={{textAlign: "center"}}>Операції за останні
                                    <select style={{height: "30px", fontSize: "20px", margin: "5px"}} id="days"
                                            name="days">
                                        <option value="volvo">5</option>
                                        <option value="saab">10</option>
                                        <option value="fiat">20</option>
                                        <option value="audi">30</option>
                                    </select>
                                    днів
                                </h3>
                            </Col>
                            <Col className="d-flex" md={3}>
                                <Button className="led-blink-debit"
                                        onClick={()=>setDebitOperationModalVisible(true)}>Капнуло трохи
                                </Button>
                            </Col>
                        </Row>
                        {operations.map(operation =>
                            <>
                                {operation.date.toLocaleDateString('uk-UK', options) === selectedDate
                                    ?
                                    <Row className="mt-2">
                                        <OperationList key={operation.id} operation={operation}/>
                                    </Row>
                                    :
                                    <Row className="mt-2">
                                        {setNewDate(operation.date.toLocaleDateString('uk-UK', options))}
                                        <Col md={4}><hr/></Col>
                                        <Col md={4} className="ps-5">{operation.date.toLocaleDateString('uk-UK', options)} </Col>
                                        <Col md={4}><hr/></Col>
                                        <OperationList key={operation.id} operation={operation}/>
                                    </Row>
                                }
                            </>
                        )}
                    <CreateCreditOperationModal show={creditOperationModalVisible} onHide={() => setCreditOperationModalVisible(false)}/>
                    <CreateDebitOperationModal show={debitOperationModalVisible} onHide={() => setDebitOperationModalVisible(false)}/>

                </Col>
            </Row>


        </Container>
    );
})

export default Operations;