import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import OperationList from "../components/OperationList";
import "../pages/style/operations.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CreateCreditOperationModal from "../components/modals/CreateCreditOperationModal";
import CreateDebitOperationModal from "../components/modals/CreateDebitOperationModal";
import {CREDIT_OPERATION_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import EditIcon from "../static/edit-40.png";
import PlannedCreditOperationModal from "../components/modals/PlannedCreditOperationModal";

const Operations = observer(() => {
    const options = {year: "numeric", month: 'long', day: 'numeric' };
    const selectedDate = useRef(new Date().toLocaleDateString('uk-UK', options));
    const navigate = useNavigate();

    const [creditOperationModalVisible, setCreditOperationModalVisible] = useState(false);
    const [debitOperationModalVisible, setDebitOperationModalVisible] = useState(false);
    const [plannedCreditOperationModalVisible, setPlannedCreditOperationModalVisible] = useState(false);

    const [value, setValue] = useState(new Date());
    const [dataCreditOperation, setDataCreditOperation] = useState({});

    function setNewDate (operationDate) {
        selectedDate.current = operationDate;
        return null;
    }

    const operationForEditMok =
        {id: 7, wallet: "wallet1", category: "кафе та ресторани", name: "Покупки їжі", value: 190,
            date: new Date(2023, 2, 7, 11, 25, 26),
            items: [
                {id: 1, name: "Огірки",  count: 2, date: new Date(2023, 2, 7, 11, 25, 25)},
                {id: 2, name: "Red Bull",  count: 1, date: new Date(2023, 2, 7, 11, 25, 28)},
                {id: 3, name: "Буряк",  count: 2, date: new Date(2023, 2, 7, 11, 25, 26)}
            ]
        };

    const operationsInProgress = [
        {id: 7, type: 1, name: "Покупки їжі", value: 190, date: new Date(2023, 2, 7, 11, 25, 26),
            items: [
                {id: 1, name: "Огірки",  count: 2, date:new Date()},
                {id: 2, name: "Red Bull",  count: 1, date:new Date()},
                {id: 3, name: "Буряк",  count: 2, date:new Date()}
            ]
        }];

/* Отримані з БД операції треба змерджити в 1 масив тому що не будуть операції сортуватись
 по сторонах якщо зробити 2 різні колонки в гаманцю, або не буде точного сортування по даті, якщо на сторінці операцій*/
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
        {id: 3, type:2, name: "ЗП", value: 50000, date: new Date(2022,11,22,12,25,26), items: []},
        {id: 4, type:2, name: "ЗП", value: 30000, date: new Date(2022,11,20,11,15,26), items: []},
        {id: 5, type:2, name: "Дарунок", value: 20000, date: new Date(2023,1,21,15,35,26), items: []}

    ];

    const planOperation = () => {
        setDataCreditOperation({date: value.getTime()});
        setPlannedCreditOperationModalVisible(true);
    }

    const editOperation = (id) => {
        setDataCreditOperation(operationForEditMok)
        setPlannedCreditOperationModalVisible(true)
    }

    return (
        <Container>
            <Row className="mt-2">
                <Col md={4}>
                    <h3 style={{textAlign: "center"}}>Період</h3>
                    <Row className="d-flex flex-column m-3">
                        <Calendar locale={"uk-Uk"} onChange={setValue} value={value}/></Row>
                    <Row style={{borderBottom: "6px solid dodgerblue"}}></Row>
                    <h3 style={{textAlign: "center"}}>Хочу купити <br/>
                        {value.toLocaleDateString('uk-UK', options)}</h3>
                    <Button onClick={planOperation}
                            className="mt-2">Додати заплановану покупку</Button>
                    <hr/>
                    Вибрати всі кредитні операції де статус inProgress і число вибране...
                    Операція при натисканні на операцію має перекидати на сторінку ОПЕРАЦІЯ( це може бути модалка)
                    де є назва та список з заповненими назвами товарів лише без кількості і цін.
                    При Сабміті форми ставить статус DONE та сабмітить як виконану кредитну форму

                    {operationsInProgress.map(operation =>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col className="p-0" md={10}>
                                        <Button onClick={() => navigate(CREDIT_OPERATION_ROUTE + "/" + operation.id)}
                                                className="w-100 btn-dark">{operation.name}</Button>
                                    </Col>
                                    <Col className="p-0" md={2}>
                                        <Button onClick={() => editOperation(operation.id)}
                                                className="w-100 btn-success">
                                            <img style={{width: 20, height: 20}} src={EditIcon} alt="edit"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    )}
                </Col>
                <Col md={8}>
                    <Row>
                        <Col className="d-flex" md={3}>
                            <Button className="led-blink-credit"
                                    onClick={() => setCreditOperationModalVisible(true)}>Пішло як в землю
                            </Button>
                        </Col>
                        <Col md={6}>
                            <h3 style={{textAlign: "center"}}>
                                    Операції за
                                <select style={{height: "30px", fontSize: "20px", margin: "5px"}} id="days"
                                        name="days">
                                    <option value="volvo">{value.getDate()}</option>
                                    <option value="saab">10</option>
                                    <option value="fiat">20</option>
                                    <option value="audi">30</option>
                                </select>
                                {(() => {
                                    if (value.getDate() === 2 || value.getDate() === 3 || value.getDate() === 4) {
                                        return ' дні '
                                    } else if (value.getDate() === 1) {
                                        return ' день '
                                    } else {
                                        return ' днів '
                                    }
                                }) ()
                                }
                            </h3>

                        </Col>
                        <Col className="d-flex" md={3}>
                            <Button className="led-blink-debit"
                                    onClick={() => setDebitOperationModalVisible(true)}>Капнуло трохи
                            </Button>
                        </Col>
                    </Row>
                    Вибрати всі кредитні операції за останні Х днів з статусом DONE.
                    Та Дебетові операції за останні Х днів, скласти їх в масив і посортувати по даті
                    {operations.map(operation =>
                        <>
                            {operation.date.toLocaleDateString('uk-UK', options) === selectedDate.current
                                ?
                                <Row className="mt-2">
                                    <OperationList key={operation.id} operation={operation}/>
                                </Row>
                                :
                                <Row className="mt-2">
                                    {setNewDate(operation.date.toLocaleDateString('uk-UK', options))}
                                    <Col md={4}>
                                        <hr/>
                                    </Col>
                                    <Col md={4}
                                         className="ps-5">{operation.date.toLocaleDateString('uk-UK', options)} </Col>
                                    <Col md={4}>
                                        <hr/>
                                    </Col>
                                    <OperationList key={operation.id} operation={operation}/>
                                </Row>
                            }
                        </>
                    )}
                    <PlannedCreditOperationModal
                        data={dataCreditOperation}
                        show={plannedCreditOperationModalVisible}
                        onHide={() => setPlannedCreditOperationModalVisible(false)}/>

                    <CreateCreditOperationModal show={creditOperationModalVisible}
                                                onHide={() => setCreditOperationModalVisible(false)}/>
                    <CreateDebitOperationModal show={debitOperationModalVisible}
                                               onHide={() => setDebitOperationModalVisible(false)}/>

                </Col>
            </Row>
        </Container>
    );
})

export default Operations;