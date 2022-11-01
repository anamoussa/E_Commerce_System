try {
    if (GetCookie("FullName") && GetCookie("Email")) {
        document.getElementById("Name").innerText = GetCookie("FullName");
    }
} catch {
    location.replace("./Register.html");
}


document.getElementById("Name").onclick = function () {
    DeleteCookie("FullName");
    DeleteCookie("Email");
    location.assign("./Register.html");
}
window.onload = function () {
    GetProduct();
}


function GetProduct() {

    var XHR = new XMLHttpRequest();
    XHR.open("get", "https://fakestoreapi.com/products", true);
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            var Data = JSON.parse(XHR.responseText);
            console.log(Data);

            for (item of Data) {
                var itemCard = CreateProductCard(item);
                document.querySelector("#Products>.row").appendChild(itemCard);
                if (localStorage[item.id]) {
                    var parent = document.getElementById(item.id);
                    parent.querySelector("#rating-control").value = localStorage[item.id];
                    getRatings(item.id);
                }
            }
        }
    }
    XHR.send();
}

function CreateProductCard(item) {

    //Card
    var card = document.createElement("div");
    card.style.maxWidth = "20rem";
    card.setAttribute("id", item.id);
    card.classList.add("card");
    card.classList.add("border-warning");
    card.classList.add("mb-3");
    card.innerHTML = `<div class="card-header">
        <img src="${item.image}" height="80%">
        </div>
        <div class="card-body">
          <div class="card-subtitle">${item.title}</div>
          <p class="card-subtitle text-muted">${item.price}</p>
          <p class="card-subtitle text-muted">${item.rating.rate}</p>

          <input type="number" id="rating-control" class="form-control" step="0.1" min="0" max="5" placeholder="Rate 1 - 5" onblur="getRatings(${item.id})">
          <div class="stars-outer">
          <div class="stars-inner"></div>
        </div>
        <span class="number-rating"></span> <br>
          <button type="button" class="btn btn-warning" onclick="AddToCart(${item.id},'${item.title}','${item.image}','${item.price}')">Add to Cart</button>
        </div>`;


    return card;
}



function AddToCart(itemID, itemTitle, itemImage, itemPrice) {
    var myname = GetCookie("FullName");
    //debugger;
    //1.intializa Cart either by new empty Cart or old Locastorage Cart
    var CartArr = {};
    if (localStorage[myname]) {
        CartArr = JSON.parse(localStorage[myname]);
    }
    //var CartArr = (localStorage.Cart)?JSON.parse(localStorage.Cart):{};

    //2.check if wanted item is already in cart
    if (CartArr[itemTitle]) {
        //increment Quantity
        CartArr[itemTitle].quantity++;
    }
    else {
        CartArr[itemTitle] = {
            id: itemID,
            image: itemImage,
            price: itemPrice,
            quantity: 1
        };
    }

    //3.reflect changes in localstorage cart
    localStorage[myname] = JSON.stringify(CartArr);
}

function OpenCartWindow() {
    window.open("./Cart.html", "_blank", "width=1500px,height=700px");
}


// Total Stars
const starsTotal = 5;
// Get ratings
function getRatings(divID) {


    var par = document.getElementById(divID);

    var rtng = par.querySelector("#rating-control").value;
    localStorage[divID] = rtng;
    // Get percentage
    const starPercentage = (rtng / starsTotal) * 100;
    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    // Set width of stars-inner to percentage
    par.querySelector(".stars-inner").style.width = starPercentageRounded;
    // Add number rating
    par.querySelector(".number-rating").innerHTML = rtng;



}