import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import UserContext from "../context";
import {ListGroup, Row} from "react-bootstrap";
import WalletImg from "../../App/static/210297132.png";

const WalletSidebar = observer(() => {
    const {user} = useContext(UserContext)
    return (
        <ListGroup className="my-3">
            {user.wallets.map(wallet=>
                <ListGroup.Item
                    active={wallet.id === user.selectedWallet.id}
                    key={wallet.id}
                    onClick={()=>user.setSelectedWallet(wallet)}
                >
                    <Row className="text-center" style={{display: "initial"}}>
                        <img  style={{width: 100, height: 50}} src={WalletImg} alt="wallet"/>
                         {wallet.name}
                    </Row>

                </ListGroup.Item>
            )}
        </ListGroup>
    )
});



export default WalletSidebar;


