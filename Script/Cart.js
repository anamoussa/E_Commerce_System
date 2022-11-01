
var myname = GetCookie("FullName");
console.log(myname);
if (localStorage[myname]) {
    var CartArr = JSON.parse(localStorage[myname]);
    for (item in CartArr) {
        var product =`
        <div class="row" style="padding-left: 20%; padding-right: 20%;width: 100%;">
            <div class="col-md-3">
                <img src="${CartArr[item].image}" width="60%">
            </div>
            <div class="col-md-8 align-self-center">
                <h4>${item}</h4>
                <br>
                <p class="card-subtitle text-muted">${CartArr[item].price}</p>
            </div>
            <div class="col-md-1 align-self-center">
                <input type="number" class="form-control" style="width:100%" min="0" value=${CartArr[item].quantity} onchange="ValueChanged(this,'${item}')">
            </div>
        </div>`;

        document.getElementById("CartProducts").innerHTML += product;
        document.getElementById("CartProducts").innerHTML += "<hr style='margin-left:15%; margin-right:15%'>";
    }
    document.getElementById("CartProducts").innerHTML += `<div class="row" style="padding-left: 20%; padding-right: 20%;width: 100%;"></div>`;
    var checkOut = document.createElement("button");
    checkOut.innerText = "Check Out";
    checkOut.classList.add("btn");
    checkOut.classList.add("btn-warning");
    document.querySelector("#CartProducts>.row:last-child").appendChild(checkOut);
}

function ValueChanged(input, ProductTitle) {
    var CartArr = JSON.parse(localStorage[myname]);

    //case change values more than 0
    if (input.value != 0) {
        CartArr[ProductTitle].quantity = input.value;
    }

    //case 0 to delete item
    else {
        var sure = confirm(`Are You sure You want to delete ${ProductTitle}?`);
        if (!sure) {
            input.value = 1;
        }
        else {
            delete CartArr[ProductTitle];
            var toBeDeletedDiv = input.parentNode.parentNode;
            var toBeDeletedHr = toBeDeletedDiv.nextElementSibling;
            document.getElementById("CartProducts").removeChild(toBeDeletedDiv);
            document.getElementById("CartProducts").removeChild(toBeDeletedHr);
        }
    }


    localStorage[myname] = JSON.stringify(CartArr);
    document.getElementById("totalprice").innerText = getTolalPrice();
}




function getTolalPrice() {
    document.getElementById("totalpricAfterSale").style.visibility ="hidden";
    document.getElementById("totallable").style.visibility ="hidden";
    var sum = 0.0;
    var CartArr2 = JSON.parse(localStorage[myname]);
    for (x in CartArr2) {
        var quantities = parseFloat(CartArr2[x].quantity);
        var pri = parseFloat(CartArr2[x].price);
        sum = sum + (pri * quantities);
    }

    return sum;
    var sortedarr = [];
}
document.getElementById("totalprice").innerText += getTolalPrice();

function sale50() {
    var newprice = getTolalPrice() / 2;
    document.getElementById("totallable").style.visibility ="visible";
    document.getElementById("totalpricAfterSale").style.visibility ="visible";
    var newprices=parseFloat(newprice).toFixed(2);
    document.getElementById("totalpricAfterSale").value = newprices;
}

function buytowgetone() {
    document.getElementById("totallable").style.visibility ="visible";
    document.getElementById("totalpricAfterSale").style.visibility ="visible";

    var arr = [];
    
    var CartArr2 = JSON.parse(localStorage[myname]);

    for (x in CartArr2) {
        var quantities = parseFloat(CartArr2[x].quantity);
        for (i = 0; i < quantities; i++) {
            var pri = parseFloat(CartArr2[x].price);
            arr.push(pri);
        }

    }

    sortedarr = arr.sort(compare);
    function compare(a, b) {
        return a - b;
    }
    var getOneFreeSum = 0;
    if (sortedarr.length>2& sortedarr.length<5) {
        for (let index = 1; index < sortedarr.length; index++) {
            getOneFreeSum += sortedarr[index];

        }
    }
    else if(sortedarr.length >=5)
    {
        for (let index = 2; index < sortedarr.length; index++) {

            getOneFreeSum += sortedarr[index];

        }  
    }
    var newprices=parseFloat(getOneFreeSum).toFixed(2);
    document.getElementById("totalpricAfterSale").value = newprices;
}
