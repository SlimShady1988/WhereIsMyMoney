import React, {useContext} from 'react';
import './style/NavBar.css'
import Profile from "../../App/static/Profile.png";
import {clearToken} from "../http/userApi";

import {
    ABOUT_ROUTE, BUDGET_ROUTE, CATEGORIES_ROUTE,
    LOGIN_ROUTE, LOGOUT_ROUTE, OPERATIONS_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    WALLETS_ROUTE
} from "../utils/consts";
import {Button, Container, Dropdown, DropdownButton, Image, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../context";

const NavBar = observer(() => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const logout = async () => {
        user.setUser({});
        user.setIsAuth(false);
        await clearToken();
        navigate(ABOUT_ROUTE)
    }
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#">WhereIsMyMoney</Navbar.Brand>
                {user.isAuth ?
                    <Nav className="me-auto">
                        <Button className="ms-2" onClick={() => navigate(WALLETS_ROUTE)} variant={"outline-light"}>Гаманець</Button>
                        <Button className="ms-2" onClick={() => navigate(CATEGORIES_ROUTE)} variant={"outline-light"}>Категорії</Button>
                        <Button className="ms-2" onClick={() => navigate(OPERATIONS_ROUTE)} variant={"outline-light"}>Операції</Button>
                        <DropdownButton style={{color: "white"}} className="ms-2" variant={"outline-light"}
                                       active="" title={
                            <Image
                            src={Profile}
                            alt="UserName profile image"
                            roundedCircle
                            style={{ width: '25px' }}
                        />}
                        >
                            <Dropdown.Item onClick={() => navigate(PROFILE_ROUTE)} variant={"outline-light"}>Профіль</Dropdown.Item>
                            <Dropdown.Item>Преміум</Dropdown.Item>
                            <Dropdown.Item onClick={() =>navigate(BUDGET_ROUTE)}>Бюджет</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Про додаток</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => logout()} variant={"outline-light"} > Вихід</Dropdown.Item>
                        </DropdownButton>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
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