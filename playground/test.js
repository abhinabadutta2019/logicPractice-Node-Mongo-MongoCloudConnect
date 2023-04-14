let email = "quam.pellentesque@protonmail.ca";
let emailArr = email.split(/[.]/);

console.log(emailArr);
// [ 'quam', 'pellentesque@protonmail', 'ca' ]
let mapEmailArr = [];
emailArr.map(function (item) {
  item = item.charAt(0).toUpperCase() + item.slice(1);
  mapEmailArr.push(item);
});

console.log(mapEmailArr);
// [ 'Quam', 'Pellentesque@protonmail', 'Ca' ]

let newJoinString = mapEmailArr.join(".");

console.log(newJoinString);
// QuamPellentesque@protonmailCa
