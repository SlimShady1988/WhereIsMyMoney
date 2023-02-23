import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import UserContext from "../context";
import {ListGroup, Row} from "react-bootstrap";
import {fetchWallets} from "../http/walletApi";

const WalletSidebar = observer(() => {
    const {user} = useContext(UserContext)
    const [wallets, setWallets] = useState([])
    useEffect(() => {
        fetchWallets().then(data => {
            setWallets(data)
        })
    }, [])

    return (
        <ListGroup className="my-3">
            {wallets.map(wallet=>
                <ListGroup.Item
                    active={wallet.id === user.selectedWallet.id}
                    key={wallet.id}
                    onClick={()=>user.setSelectedWallet(wallet)}
                >
                    <Row className="text-center" style={{display: "initial"}}>
                        <img  style={{width: 100, height: 50}} src={wallet.img} alt="wallet"/>
                         {wallet.name}
                    </Row>

                </ListGroup.Item>
            )}
        </ListGroup>
    )
});



export default WalletSidebar;


