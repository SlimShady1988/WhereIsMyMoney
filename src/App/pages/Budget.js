import React from 'react';
import {Button, Form, Table} from "react-bootstrap";

const Budget = () => {
    const table = ['№', 'Назва Категорії', 'Бюджет(грн)', 'Витрачено(грн)', 'Витрачено (%) ', 'Сума товару']
    // const category  =
    return (
        <div>
            {/*<Table striped bordered hover>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        {table.map(title => <th key={title}>{title}</th>)}*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {goods.map((g, i) =>*/}
            {/*        <tr key={g.date}>*/}
            {/*            <td>*/}
            {/*                {i + 1}*/}
            {/*            </td>*/}
            {/*            <td width="60%">*/}
            {/*                <Form.Control id={'data-name-' + g.date} type="input" placeholder="Назва товару"/>*/}
            {/*            </td>*/}

            {/*            <td width="15%">*/}
            {/*                <Form.Control className="no-spinner"*/}
            {/*                              type="number"*/}
            {/*                              id={'data-price-' + g.date}*/}
            {/*                              data-price={g.date}*/}
            {/*                              onChange={(e) =>*/}
            {/*                                  checkPrice(Number(e.target.value), e.target.dataset.price)}/>*/}
            {/*            </td>*/}
            {/*            <td width="10%">*/}
            {/*                <Form.Control className="no-spinner"*/}
            {/*                              type="number"*/}
            {/*                              disabled*/}
            {/*                              id={'data-count-' + g.date} data-count={g.date}*/}
            {/*                              onChange={(e) =>*/}
            {/*                                  setCount(Number(e.target.value), e.target.dataset.count)}/>*/}
            {/*            </td>*/}
            {/*            <td width="15%">*/}
            {/*                <Form.Control className="no-spinner amount-value"*/}
            {/*                              type="number"*/}
            {/*                              id={'data-sum-' + g.date}*/}
            {/*                              data-sum={g.date}*/}
            {/*                              onChange={(e) =>*/}
            {/*                                  setSum(e.target.value, e.target.dataset.sum)}/>*/}
            {/*            </td>*/}
            {/*            <td className="d-flex justify-content-center">*/}
            {/*                <Button onClick={() => removeGoods(g.date.getTime())}*/}
            {/*                        variant={"outline-danger"}>Видалити</Button>*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*    )}*/}
            {/*    </tbody>*/}
            {/*</Table>*/}
        </div>
    );
};

export default Budget;