let apikey = "c54676c6d56fa7ff045f8f9cf259902c";
let url = "http://api.exchangerate.host/convert";
let pFromTo = document.querySelector(".ft");
let pToFrom = document.querySelector(".tf");
let defaultCurrency = document.querySelector(".currency .selected");
let input = document.querySelector(".amount")
let fromOrTo = true;
let handleCurrencyClick = (event) => {
    document.querySelectorAll(".currency button").forEach((button) => {
        button.classList.remove("selected");
    });
    event.target.classList.add("selected");
};
document.querySelectorAll(".currency button").forEach((button) => {
    button.addEventListener("click", handleCurrencyClick);
});
defaultCurrency.click();

let defaultCurrencyButton = document.querySelector(".currency2 button:nth-child(2)");
defaultCurrencyButton.classList.add("selected");
let currencyButtons = document.querySelectorAll(".currency2 button");
currencyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        defaultCurrencyButton.classList.remove("selected");
        button.classList.add("selected");
        defaultCurrencyButton = button;
    });
});
let from = "RUB";
let to = "USD";
let res = document.querySelector(".res");
// let amount = Number(document.querySelector('.amount').value)
async function converter(type) {
    let amount;
    if(type == "input"){
        amount = Number(document.querySelector('.amount').value)
        console.log("input: "+amount)
    }
    else if(type == "res"){
        amount = Number(document.querySelector('.res').value)
        console.log("res: "+amount)
    }
    if(to != from){
        if(amount>=0){
            let apiurl;
            if(type == "input"){
                apiurl = `${url}?access_key=${apikey}&from=${from}&to=${to}&amount=${amount}`;
            }
            else if(type == "res"){
                apiurl = `${url}?access_key=${apikey}&from=${to}&to=${from}&amount=${amount}`;
            }
            let response = await fetch(apiurl);
            let data = await response.json();
            
            let apiurlft = `${url}?access_key=${apikey}&from=${from}&to=${to}&amount=1`;
            let response2 = await fetch(apiurlft);
            let data2 = await response2.json();
            pFromTo.innerText = "1"+to+" = "+data2.result+from;
            
            let apiurltf = `${url}?access_key=${apikey}&from=${to}&to=${from}&amount=1`;
            let response3 = await fetch(apiurltf);
            let data3 = await response3.json();
            pToFrom.innerText = "1"+to+" = "+data3.result+from;
            
            if(type == "input"){
                if(data.result == undefined){
                    res.value = "0"
                }
                else{
                    res.value = data.result;
                }
                console.log("res = "+data.result)
            }
            else if(type == "res"){
                console.log("input = "+data.result)
                if(data.result == undefined){
                    input.value = "0";
                }
                else{
                    input.value = data.result;
                }
            }
            console.log(data)
        }
    }
    else{
        if(type == "input"){
            res.value = amount;
        }
        else if(type == "res"){
            input.value = amount;
        }
        pFromTo.innerText = "1"+from+" = "+"1"+to;
        pToFrom.innerText = "1"+to+" = "+"1"+from;
    }
}
async function fromBtnFcn(e){
    from = e.target.id;
    converter("input");
}
async function toBtnFcn(e){
    to = e.target.id;
    converter("input");
}
let btns = document.querySelectorAll('button');
btns.forEach(btn =>{
    if((btn.classList == "from")||(btn.classList == "from selected")){
        btn.addEventListener('click', fromBtnFcn);
    }
    else{
        btn.addEventListener('click', toBtnFcn);
    }
})
input.addEventListener("input", () => {
    converter("input")
});
res.addEventListener("input", () => {
    converter("res")
});

converter("input")