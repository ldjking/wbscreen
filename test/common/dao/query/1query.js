// JavaScript Document
var dao=require("../../dao.js");
//console.log(dao);
var q={table:"user"}

var user=dao.query(q);
console.log(user);