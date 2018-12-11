import { baseUrl } from '../utils/global.js';

const getAllGeo = () => fetch(baseUrl + '/Geo/getAllGeo', { method: 'get', credentials: 'include' }).then((res) => res.json());
const delGeo = (id) => fetch(baseUrl + '/Geo/delGeo', { 
	method: 'post',
	body: JSON.stringify(id), 
	credentials: 'include',
	headers:{
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	} 
}).then((res) => res.json());
// row代表要传入的数据没有Id
const addGeo = (row) => fetch(baseUrl + '/Geo/addGeo', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(row),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then((res) => res.json());
// item代表要传入的数据具有Id
const updateGeo = (item) => fetch(baseUrl + '/Geo/updateGeo', {
    method: 'post',
    body: JSON.stringify(item),
    // 这里的include值表示此请求在执行时有包括该域的cookies
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then((res) => res.json());
const findAddGeoIdFromServer = (row) => fetch(baseUrl + '/Geo/findAddGeoId',{
	method:'post',
	body: JSON.stringify(row),
	credentials:'include',
	headers:{
		'Accept': 'application/json',
		'Content-Type':'application/json'
	}
}).then((res)=> res.json());
export default { getAllGeo, delGeo, addGeo, updateGeo, findAddGeoIdFromServer }