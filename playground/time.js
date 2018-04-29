var moment = require('moment');
// Jan 1st 1970 00:00:00

// var date = new Date();
// console.log(date.getMonth()+1);

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createAd = 1234;
var date = moment(createAd);
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));