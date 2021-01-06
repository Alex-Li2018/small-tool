var xlsx2json = require("node-xlsx");
var list = xlsx2json.parse("./您孩子目前处于什么入学状态？.xlsx");

console.log(list[0].data[0]);