import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {ABOUT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context";
import {observer} from "mobx-react-lite";

const Auth = observer (() => {
        const {user} = useContext(UserContext);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const isLogin = window.location.pathname === LOGIN_ROUTE;
        const navigate = useNavigate();

        const click = async () => {
            try {
                let data;
                if (isLogin) {
                    data = await login(username, password)
                } else {
                    data = await registration(username, password);
                }

                user.setUser(user);
                user.setIsAuth(true);
                navigate(ABOUT_ROUTE)
            } catch (e) {
                alert(e.response.data.message)
            }
        }

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}>
            <Card className="p-5" style={{width: 600}}>
                <h2 className="m-auto">Авторизація</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3"
                                  value={username}
                                  placeholder="Введіть емейл"
                                  onChange={e=>setUsername(e.target.value)}

                    />
                    <Form.Control className="mt-3"
                                  value={password}
                                  placeholder="Введіть пароль"
                                  type="password"
                                  onChange={e=>setPassword(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-3">
                        {isLogin
                            ?
                            <div>Немає акаунта? - <Button
                                className="btn btn-sm btn-info"
                                onClick={() => navigate(REGISTRATION_ROUTE)}>Зареєструватись</Button>
                            </div>
                            :
                            <div>Є акаунт? - <Button
                                className="btn btn-sm btn-info"
                                onClick={() => navigate(LOGIN_ROUTE)}>Увійти</Button>
                            </div>
                        }
                        <Button onClick={click}
                                variant={"outline-primary"}>{isLogin ? "Увійти" : "Зареєструватись"}</Button>
                    </div>
                </Form>

            </Card>
        </Container>
    );
})

export default Auth;