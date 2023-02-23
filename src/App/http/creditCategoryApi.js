import {$authHost} from "../http/index";

export const activateCreditCategory = async (creditCategory) => {
     const {data} = await $authHost.patch("api/categories/credit/update", creditCategory);
     return data;
}

// export const addCreditCategory = async(debitCategory) => {
//      const {data} = await $authHost.post("api/categories/credit/add", debitCategory);
//      return data;
// }

export const createCreditCategory = async(creditCategory) => {
     const {data} = await $authHost.post("api/categories/credit/create", creditCategory);
     return data;
}

export const deleteCreditCategory = async(id) => {
     const {data} = await $authHost.delete("api/categories/credit/delete/" + id);
     return data;
}

export const getCreditCategory = async (id) => {
     const {data} = await $authHost.get("api/categories/" + id);
     return data;
}

export const fetchCreditCategories = async () => {
     const {data} = await $authHost.get("api/categories/credit/list");
     return data;
}
