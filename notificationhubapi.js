// const fetch = require("node-fetch");

// //var myHeaders = new fetch.Headers();
// let base64 = require('base-64');

// let url = 'https://localhost:44338/api/register/';
// let username = 'sudip';
// let password = 'sudip';

// let headers = new fetch.Headers();

// //headers.append('Content-Type', 'text/json');
// headers.append('Authorization', 'Basic' + base64.encode(username + ":" + password));

// fetch(url, {method:'GET',
//         headers: headers,
//         //credentials: 'user:passwd'
//        })
// .then(response => response.json())
// .then(json => console.log(json))
// .catch(error=>console.error());

// // function parseJSON(response) {
// // return response.json()
// // }

var username="sudip";
 var password="sudip";
// var url = "https://localhost:44338/api/register/";
// var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");
// exports.checkApi = function (req, res) {
//     // do the GET request
//     request.get({
//         url: url,
//         headers: {
//             "Authorization": auth
//         }
//     }, function (error, response, body) {
//         if(error)
//        { console.error("Error while communication with api and ERROR is :  " + error);
//        res.send(error);
//     }
//         console.log('body : ', body);
//         res.send(body);      

//     });    
// }

const https = require('https').globalAgent.options.ca = require('ssl-root-cas').create();
var axios = require("axios");
const AuthStr = "Basic " + Buffer.from(username + ":" + password).toString("base64"); 
axios.get('https://localhost:44338/api/register/', { headers: { Authorization: AuthStr } })
 .then(response => {
     // If request is good...
     console.log(response.data);
  })
 .catch((error) => {
     console.log('error ' + error);
  });