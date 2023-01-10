import React, {useContext} from 'react';
// import './NavBar.css'
import {
    ABOUT_ROUTE, CATEGORIES_ROUTE,
    CATEGORY_ROUTE,
    LOGIN_ROUTE, LOGOUT_ROUTE,
    OPERATION_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    WALLET_ROUTE,
    WALLETS_ROUTE
} from "../utils/consts";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../context";

const NavBar = observer(() => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();


    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        // if (process.env.REACT_APP_API_URL.endsWith("8080/")){
        //     navigate(LOGOUT_ROUTE)
        // } else {
            navigate(ABOUT_ROUTE)
        // }
    }
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="{{ WALLET_ROUTE }}">WhereIsMyMoney</Navbar.Brand>
                {user.isAuth ?
                    <Nav className="me-auto">
                        <Button className="ms-2" onClick={() => navigate(WALLETS_ROUTE)} variant={"outline-light"}>Гаманець</Button>
                        <Button className="ms-2" onClick={() => navigate(CATEGORIES_ROUTE)} variant={"outline-light"}>Категорії</Button>
                        <Button className="ms-2" onClick={() => navigate(OPERATION_ROUTE)} variant={"outline-light"}>Операції</Button>
                        <Button className="ms-2" onClick={() => navigate(PROFILE_ROUTE)} variant={"outline-light"}>Налаштування</Button>
                        <Button onClick={() => logout()} variant={"outline-light"}
                                style={{ position: "absolute", right: 100 }}>Вихід</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {/*<Button onClick={() => navigate(ABOUT_ROUTE)} variant={"outline-light"}>Огляд</Button>*/}
                        <Button className={"ms-3"}
                                variant={"outline-light"}
                                onClick={() => navigate(LOGIN_ROUTE)}>Увійти</Button>
                        <Button className={"ms-3"}
                                variant={"outline-light"}
                                onClick={() => navigate(REGISTRATION_ROUTE)}>Зареєструватись</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})


export default NavBar;