import { baseUrl } from "../utils/global.js"

const getAllCIP = () => fetch(baseUrl + '/countryIp/getAllCIp', { method: 'get', credentials: 'include' }).then((res) => res.json());
const delCIP = (id) => fetch(baseUrl + '/countryIp/delCIp', { 
	method: 'post', 
	body: JSON.stringify(id), 
	credentials: 'include',
	headers:{
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	} 
}).then((res) => res.json());
const addCIP = (row) => fetch(baseUrl + '/countryIp/addCIp', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(row),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then((res) => res.json());
const updateCIP = (item) => fetch(baseUrl + '/countryIp/updateCIp', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(item),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then((res) => res.json());
const findAddCIPIdFromServer = (row) => fetch(baseUrl + '/countryIp/findAddCIpId',{
	method:'post',
	body: JSON.stringify(row),
	credentials:'include',
	headers:{
		'Accept': 'application/json',
		'Content-Type':'application/json'
	}
}).then((res)=> res.json());

export default { getAllCIP, delCIP, addCIP, updateCIP, findAddCIPIdFromServer }