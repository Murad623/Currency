let apikey = "c414195acfe82a70b3d52016";
let url = "https://v6.exchangerate-api.com/v6/c414195acfe82a70b3d52016/latest/USD";
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
                apiurl = `${url}?access_key=${apikey}&from=${from}`;
            }
            else if(type == "res"){
                apiurl = `${url}?access_key=${apikey}&from=${to}`;
            }
            let response = await fetch(apiurl);
            let data = await response.json();
            
            
            if(type == "input"){
                if(data.result == undefined){
                    res.value = "0"
                }
                else{
                    res.value = data.conversion_rates[to]*amount;
                }
                console.log("res = "+ data.conversion_rates[to]*amount)
            }
            else if(type == "res"){
                console.log("input = "+data.result)
                if(data.result == undefined){
                    input.value = "0";
                }
                else{
                    input.value = (data.conversion_rates[from])*amount;
                }
            }
            let apiurlft = `${url}?access_key=${apikey}&from=${from}`;
            let response2 = await fetch(apiurlft);
            let data2 = await response2.json();
            pFromTo.innerText = "1 "+from+" = "+data2.conversion_rates[to]+" "+to;
            
            let apiurltf = `${url}?access_key=${apikey}&from=${to}`;
            let response3 = await fetch(apiurltf);
            let data3 = await response3.json();
            console.log("from "+data.conversion_rates[from])
            pToFrom.innerText = "1 "+to+" = "+data3.conversion_rates[from]+" "+from;

        }
    }
    else{
        if(type == "input"){
            res.value = amount;
        }
        else if(type == "res"){
            input.value = amount;
        }
        pFromTo.innerText = "1 "+from+" = "+"1 "+to;
        pToFrom.innerText = "1 "+to+" = "+"1 "+from;
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