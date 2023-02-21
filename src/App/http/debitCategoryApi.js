import {$authHost, $host} from "../http/index";

export const activateCategory = async (debitCategory) => {
     const {data} = await $authHost.post("api/categories/debit/update", debitCategory);
     return data;
}

export const addCategory = async(debitCategory) => {
     const {data} = await $authHost.post("api/categories/debit/add", debitCategory);
     return data;
}

export const createCategory = async(debitCategory) => {
     const {data} = await $authHost.post("api/categories/debit/create", debitCategory);
     return data;
}

export const deleteCategory = async(debitCategory) => {
     const {data} = await $authHost.delete("api/categories/debit/delete", debitCategory);
     return data;
}
//
export const fetchCategories = async () => {
     const {data} = await $host.get("api/categories/debit/list");
     return data;
}
