const cart_btn = document.querySelector("#cart_btn");
const items_menu = document.querySelector("#items");
const quantity = document.querySelector("#quantity");
let checkOut = document.querySelector(".checkOut");
const prev = document.querySelector(".prev")
const first = document.querySelector(".first")
const next = document.querySelector(".next")
const last = document.querySelector(".last")
let showItemsPrice = document.querySelector(".items_price_list");
let showItemsName = document.querySelector(".items_name_list");
let showItemsQuantity = document.querySelector(".items_quantity_list");

let count = 0;


const priceObj = {
  mobile: 15000,
  tv: 10000,
  sneaker: 7000,
  tshirt: 500,
  jean: 800,
  hoodie: 1000,
};
// console.log(items);
let items_list = [];

cart_btn.addEventListener("click", (e) => {
  e.preventDefault();
//   console.log(quantity.value)
  if (quantity.value > 20 || quantity.value == 0) {
    alert("Min quantity : 1 and max quantity : 20 ");
  } else {
    // if(items_list)
    if (items_list.length == 0) {
      let itemObj = { [items_menu.value]: quantity.value };
      items_list.push(itemObj);
    }
    let flag = false;
    for (let obj of items_list) {
    //   console.log(obj);
      if (obj[items_menu.value]) {
        obj[items_menu.value] = quantity.value;
        flag = true;
        break;
      }
    }
    if (!flag) {
      let itemObj = { [items_menu.value]: quantity.value };
      // console.log("false");
      items_list.push(itemObj);
    }
  }
//   console.log(items_list);
  if(items_list.length > 0){
    checkOut.disabled = false
}

  let items_name_list = document.createElement("ul");
  let items_quantity_list = document.createElement("ul");

   keys = [];
   quantities = [];
    price = [];
  for (let obj of items_list) {
    keys.push(Object.keys(obj)[0]);
    let key = Object.keys(obj)[0];
    quantities.push(obj[key]);
    items_quantity_list.innerHTML += `<li> ${obj[key]} </li>`;
    // console.log(items_quantity_list);
    items_name_list.innerHTML += `<li> ${[key]} </li>`;
    // console.log(items_name_list);
  }
  showItemsName.innerHTML = items_name_list.innerHTML;
  showItemsQuantity.innerHTML = items_quantity_list.innerHTML;

  let items_price_list = document.createElement("ul");

  for (let key of keys) {
    price.push(+priceObj[key]);
  }
//   console.log(items_price_list);
totalPrice=0;
for(let i=0; i<price.length; i++){
    totalPrice += quantities[i] * price[i]; 
    items_price_list.innerHTML +=  `<li> ${quantities[i] * price[i] } </li>`;
}
showItemsPrice.innerHTML = items_price_list.innerHTML;
// console.log("my total price is ",totalPrice);
let grandTotal = document.querySelector(".grandTotal");
grandTotal.innerHTML = totalPrice;

});

if(items_list.length > 0){
    checkOut.disabled = false
}


let checkOutObj = {};
let name = document.querySelector("#name")
let phone = document.querySelector("#phone")
let email = document.querySelector("#email")
let address = document.querySelector("#address")
let subSec1 = document.querySelector(".subSec1");
let subSec2 = document.querySelector(".subSec2");
let goto = document.querySelector(".goto");
let gotoInput = document.querySelector(".gotoInput");
let totalSummary = document.querySelector(".totalSummary");
let totalOrders = [];

function displayOrders(totalOrders,index){
  let paraTag = document.createElement("p");
  let temp = document.createElement("div");
  console.log("inside func ",index);
  paraTag.innerText = `${totalOrders[index].name}, ${totalOrders[index].phone}, ${totalOrders[index].email}, ${totalOrders[index].address} `;
  subSec1.innerHTML = paraTag.innerHTML;
  console.log(totalOrders[index].name);
  for(let i=0;i<totalOrders[index].item.length; i++){
    temp.innerHTML += `<div class="itemSummary"> <p> ${totalOrders[index].item[i][0].toUpperCase() + totalOrders[index].item[i].slice(1)} </p> <p> X ${totalOrders[index].quantities[i]} <p/> </div>`
    // console.log();
    subSec2.innerHTML = temp.innerHTML;
    totalSummary.innerText = totalOrders[index].price;
  }
}

checkOut.addEventListener("click",(e)=>{
    e.preventDefault();
    if(items_list.length > 0){
      checkOut.disabled = false
  }
    // console.log(name.value.length);
    if(!(name.value.length > 3)){
        alert("name should be of atleast 3 char long.");
        return;
    }
    if(phone.value.length !== 10){
        alert("phone number should be of 10 no.")
        return;
    }
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!(email.value.match(mailformat))){
        alert("You have entered an invalid email address!");
        return;
    }
    if(!(address.value.length > 3)){
        alert("address should be of atleast 3 char long.")
        return;
    }

    checkOutObj = {
        name:name.value,
        phone:phone.value,
        email:email.value,
        address:address.value,
        item:keys,
        quantities:quantities,
        price:totalPrice
    }
    totalOrders.push(checkOutObj);
    console.log(checkOutObj);
    console.log(totalOrders);
    paraTag = document.createElement("p");
    // let itemSummary = document.createElement("div");
    // itemSummary.classList.add("itemSummary")
    // let checkoutKeys = Object.keys(checkOutObj);
    // for(let i=0; checkoutKeys.length; i++){



      paraTag.innerText = `${checkOutObj.name}, ${checkOutObj.phone}, ${checkOutObj.email}, ${checkOutObj.address} `;
    //  console.log(paraTag);
      subSec1.innerHTML = paraTag.innerHTML;
      let temp = document.createElement("div");
      for(let i=0;i<checkOutObj.item.length; i++){
        temp.innerHTML += `<div class="itemSummary"> <p> ${checkOutObj.item[i][0].toUpperCase() + checkOutObj.item[i].slice(1)} </p> <p> X ${checkOutObj.quantities[i]} <p/> </div>`
        // console.log();
      }
      subSec2.innerHTML = temp.innerHTML;
      totalSummary.innerText = checkOutObj.price;
      count = totalOrders.length-1;
      console.log(totalOrders);

      showItemsPrice.innerText = "";
      showItemsName.innerText = "";
      showItemsQuantity.innerText = "";
      name.value = "";
      phone.value = "";
      email.value = "";
      address.value = "";
      console.log(keys);
      console.log(quantities);
      console.log(price);
      keys = [];
      quantities = [];
      price = [];
      items_list = [];
      checkOut.disabled = true;


    //}
})

prev.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log("prev clicked");
  console.log("outside func ",count);
  if(count == 0){
    alert("there is no previous order to show");
    return;
  }else{
    count--;
    displayOrders(totalOrders,count)
  }
})
next.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log("prev clicked");
  console.log("outside func ",count);
  count++;
  if(count >= totalOrders.length){
    count--;
    alert("there is no next product to show");
    return;
  }
  displayOrders(totalOrders,count)
})

first.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log("prev clicked");
  console.log("outside func ",count);
  displayOrders(totalOrders,0)
})


last.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log("prev clicked");
  console.log("outside func ",count);
  displayOrders(totalOrders,totalOrders.length-1);
})

goto.addEventListener("click",(e)=>{
  e.preventDefault();
  let value = +gotoInput.value;
  console.log(totalOrders.length);
  if(totalOrders.length == 0){
    alert("there is no order to display, first order something to get summary. Thanks");
    return;
  }
  if(value <= 0 || value > totalOrders.length){
    alert(`As per your order details page no. should be between 1 and ${totalOrders.length}`);
    return;
  }
  displayOrders(totalOrders,value-1);
  console.log(value);
})

