import {$authHost, $host} from "../index";

export const createCategory = async (category) => {
     const {data} = await $authHost.post("api/category/create", category);
     return data;
}
//
export const fetchCategory = async () => {
     const {data} = await $host.get("api/category");
     return data;
}
//
// export const createBrand = async (brand) => {
//      const {data} = await $authHost.post("api/brand/create", brand);
//      return data;
// }
//
// export const fetchBrands = async () => {
//      const {data} = await $host.get("api/brand");
//      return data;
// }
//
// export const createDevice = async (device) => {
//      const {data} = await $authHost.post("api/device/create", device);
//      return data;
// }
//
// export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
//      const {data} = await $host.get("api/device", {params: {typeId, brandId, page, limit}});
//      return data;
// }
//
// export const fetchOneDevice = async (id) => {
//      const {data} = await $host.get("api/device/" + id);
//      return data;
// }
