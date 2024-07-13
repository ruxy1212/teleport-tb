import axios from "axios";

export default axios.create({
    baseURL: "https://api.timbu.cloud",
})

// https://api.timbu.cloud/products?organization_id=123&reverse_sort=false&page=2&size=10&Appid=123&Apikey=1234567890