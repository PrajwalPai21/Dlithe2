// function greet(name){
//     alert(("Hello "+name));
// }
// greet("Prajwal");

const { Button } = require("bootstrap");

// let interestsNews = [
//     {sports:"Cricket,Football,Volleyball"},
//     {politics:"BJP,Congress,JDS"},
//     {entertainment:"Movies,TV Shows,Cartoons"}
// ]

// let outputResult = interestsNews.filter(output => output.sports !== undefined);
// console.log(outputResult);

let person = {
    name: 'Alice',
    age:25,
    greet: function(){
        console.log("Hello");
    }
};

document.write(person.name+"<br>");
// window.alert(person.name);
person.greet();

let fruits = ["Apple","Banana"];
document.write(fruits+"<br>");
fruits.push("GRAPES");
document.write(fruits);

    
function test(){
    var testVar = 10;
    document.write(testVar);
}

test();
document.write(testVar);