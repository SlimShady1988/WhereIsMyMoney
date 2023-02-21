import {$authHost, $host} from "../http/index";
import jwt_decode from "jwt-decode";

export const registration = async (username, password) => {
     const {data} = await $host.post("api/auth/registration", {username, password});
     localStorage.setItem("token", data.token)
     return jwt_decode(data.token);
}

export const login = async (username, password) => {
     const {data} = await $host.post("api/auth/login", {username, password});
     localStorage.setItem("token", data.token)
     return jwt_decode(data.token);
}

export const clearToken = async () => {
     const {data} = await $authHost.post("api/auth/logout");
     localStorage.setItem("token", '')
     return true;
}

export const check = async () => {
     const {data} = await $authHost.get("api/auth/check");
     localStorage.setItem("token", data.token)
     return jwt_decode(data.token);
}