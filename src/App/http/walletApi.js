import {$authHost, $host} from "../http/index";

export const getWallet = async (id) => {
     const {data} = await $authHost.get("api/user/wallets/" + id);
     return data;
}

export const addWallet = async (name) => {
     const {data} = (await $authHost.post("api/user/wallets/add", name))
         // .headers.setContentType("application/json");
     return data;
}

export const fetchWallets = async () => {
     const {data} = await $authHost.get("api/user/wallets/list");
     return data;
}
