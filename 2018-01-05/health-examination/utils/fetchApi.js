var fetch = require("isomorphic-fetch");
var FormData = require('form-data');
// var MD5=require('md5');
var header = {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    },
    method = 'post',

    url1 = "http://10.1.1.194:8080/maystar_tj/services/servicesEnter.html",
    url2 = "http://123.56.232.141:8082/maystar_tj/services/servicesEnter.jsp";

var data1 = {
    "method": "login",
    "params": {
        "userid": "admin",
        "password": "E10ADC3949BA59ABBE56E057F20F883E"
    },
    "config": {
        "sblx": "andriod",
        "version": "1",
        "stutime": "yyyy-MM-dd HH:mm:ss"
    }
}
var data2 = {
    "method": "login",
    "params": {
        "userid": "lisi",
        "password": "670b14728ad9902aecba32e22fa4f6bd"
    },
    "config": {
        "sblx": "andriod",
        "version": "1",
        "stutime": "yyyy-MM-dd HH:mm:ss"
    }
}
// var form = new FormData();
// form.append("method", "login");
// form.append("params", JSON.stringify({
//     "userid": "admin",
//     "password": "E10ADC3949BA59ABBE56E057F20F883E"
// }));
// form.append("config", JSON.stringify({
//     "sblx": "andriod",
//     "version": "1",
//     "stutime": "yyyy-MM-dd HH:mm:ss"
// }));
fetch(url2, {
        header,
        method,
        mode: 'cors',
        credentials:'include',
        body: JSON.stringify(data2)
    })
    // .then(response => console.log(response.headers))
    .then(response => console.log(response))
    // .then(response=>console.log(response.json()))
    // .then(json=>console.log(json))
    .catch(error => { console.log(error) });