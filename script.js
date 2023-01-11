let numButtons = document.getElementsByClassName("number");
let signButtons = document.getElementsByClassName("sign");
let signCount = 0;
let decimalCount = 0;
let signCurrent = "";
let sign = "";
let numCurrent = 0;
let product = 0;
let equation = "";

Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
}  

function back() {
    document.getElementById("display").innerHTML = document.getElementById("display").innerHTML.slice(0, -1)
}

function erase() {
    numCurrent = 0;
    num1 = 0;
    num2 = 0;
    product = 0;
    decimalCount = 0;
    signCount = 0;
    equation = "";
    document.getElementById("display").innerHTML = "";
}

function equal() {
    document.getElementById("display").innerHTML = total();
    decimalCount = 0;
}

function total() {
    numCurrent = Number(document.getElementById("display").innerHTML);
    if(sign === "+") {
        product = num1 + numCurrent;
    }else if (sign === "-") {
        product = num1 - numCurrent;
    }else if (sign === "*") {
        product = num1 * numCurrent;
    }else if (sign === "/") {
        product = num1 / numCurrent;
    }
        return product.round(2);
}

function max() {
    if (product.round(2) > 99999999999){
        document.getElementById("display").innerHTML = "TOO BIG"
    }
}

function alpha() {
    if(signCount < 2) {
        num1 = Number(document.getElementById("display").innerHTML);
        document.getElementById("display").innerHTML = "";
    }else{
        numCurrent = Number(document.getElementById("display").innerHTML);
        num1 = total();
        document.getElementById("display").innerHTML = num1;
    }

    numCurrent = 0;
    sign = signCurrent;
}

function beta() {
    let  decimals = (numCurrent.match(/\./g)||[]).length

    if(decimals >= 1){
        decimalCount++;
    }
    if (decimalCount > 1){
        document.getElementById("display").innerHTML = "REAL #s!";
    }
}

let numPressed = e => {
    if(numCurrent === 0){
        document.getElementById("display").innerHTML = "";
    }

    numCurrent = e.target.id;
    document.getElementById("display").innerHTML += numCurrent;
    equation += numCurrent;
  
    if(document.getElementById("display").innerHTML.length === 11){
        document.getElementById("display").innerHTML = numCurrent; 
    }

   if(equation.slice(-2) === "/0"){
    document.getElementById("display").innerHTML = "NO!";
   }

    document.getElementById("/").disabled = false;
    document.getElementById("*").disabled = false;
    document.getElementById("+").disabled = false;
    document.getElementById("-").disabled = false;
    document.getElementById("=").disabled = false;
}

let signPressed = e => {
    signCount++;
    signCurrent = e.target.id;
    equation += signCurrent;
    console.log(equation);
    decimalCount = 0;
    
   if(equation.slice(-1) === "/"){
    document.getElementById("/").disabled = true;
   }else if(equation.slice(-1) === "*"){
    document.getElementById("*").disabled = true;
   }else if(equation.slice(-1) === "+"){
    document.getElementById("+").disabled = true;
   }else if(equation.slice(-1) === "-"){
    document.getElementById("-").disabled = true;
   }
}

for (let button of numButtons) {
    button.addEventListener("click", numPressed);
    button.addEventListener("click", beta);
}

for (let button of signButtons) {
    button.addEventListener("click", signPressed);
    button.addEventListener("click", alpha);
    button.addEventListener("click", max);
}

document.getElementById("clear").addEventListener("click", erase);
document.getElementById("=").addEventListener("click", equal);
document.getElementById("=").addEventListener("click", max);
document.getElementById("back").addEventListener("click", back);
