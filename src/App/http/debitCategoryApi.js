import {$authHost} from "../http/index";

export const activateDebitCategory = async (debitCategory) => {
     const {data} = await $authHost.patch("api/categories/debit/update", debitCategory);
     return data;
}

// export const addDebitCategory = async(debitCategory) => {
//      const {data} = await $authHost.post("api/categories/debit/add", debitCategory);
//      return data;
// }

export const createDebitCategory = async(debitCategory) => {
     const {data} = await $authHost.post("api/categories/debit/create", debitCategory);
     return data;
}

export const deleteDebitCategory = async(id) => {
     const {data} = await $authHost.delete("api/categories/debit/delete/" + id);
     return data;
}

export const getDebitCategory = async (id) => {
     const {data} = await $authHost.get("api/categories/" + id);
     return data;
}

export const fetchDebitCategories = async () => {
     const {data} = await $authHost.get("api/categories/debit/list");
     return data;
}
