let totalCost = (cart, prod) => {
  let amount = 0;

  for (let i = 0; i < prod.length; i++) {
    for (let j = 0; j < cart.length; j++) {
      if (prod[i].id == cart[j]) {
        amount = amount + Number(prod[i].price);
      }
    }
  }
  console.log("am", amount);
  localStorage.setItem("AMOUNT", JSON.stringify(amount));
};
let prod;
let cartArr;
let onLoad = () => {
  if (!JSON.parse(localStorage.getItem("CART")))
    document.getElementById("itemCount").innerHTML = "Cart 0";
  else {
    let arr2 = JSON.parse(localStorage.getItem("CART"));
    document.getElementById("itemCount").innerHTML = "Cart" + " " + arr2.length;
  }
  prod = JSON.parse(localStorage.getItem("PROD"));
  cartArr = JSON.parse(localStorage.getItem("CART"));
  if (!document.getElementById("tabledata").innerHTML || !cartArr) {
    document.getElementById("tabledata").innerHTML = `<tr>
  <th>Name</th>
  <th>Image</th>
  <th>Unit Price</th>
  <th>Order Unit</th>
  <th>Total Price</th>
  <th>Action</th>
</tr>`;
  }
  totalCost(cartArr, prod);
  if (JSON.parse(localStorage.getItem("AMOUNT"))) {
    document.getElementById("totalCost").innerHTML =
      "Total Amount =" +
      JSON.parse(localStorage.getItem("AMOUNT")) +
      " BDT" +
      `<br><button onclick="payStatus()" id="btn-pay">Checkout</button>`;
  } else {
    document.getElementById("totalCost").innerHTML =
      "Total Amount = 0 BDT" +
      `<br><button onclick="payStatus()" id="btn-pay">Checkout</button>`;
  }
};
onLoad();
let payStatus = () => {
  alert("Completed");
};

let cartTable = () => {
  document.getElementById("tabledata").innerHTML = `<tr>
  <th>Name</th>
  <th>Image</th>
  <th>Unit Price</th>
  <th>Order Unit</th>
  <th>Total Price</th>
  <th>Action</th>
</tr>`;
  let cartArr2 = cartArr;
  let data = [];
  let uniqueItems = [];
  for (let i = 0; i < prod.length; i++) {
    let items = {};
    items["id"] = prod[i].id;
    items["count"] = 0;
    items["index"] = i;
    uniqueItems.push(items);
  }
  for (let i = 0; i < uniqueItems.length; i++) {
    let item = {};
    for (let j = 0; j < cartArr.length; j++) {
      if (uniqueItems[i].id == cartArr[j]) {
        uniqueItems[i].count += 1;
      }
    }
    if (uniqueItems[i].count > 0) {
      item["name"] = prod[uniqueItems[i].index].name;
      item["image"] = prod[uniqueItems[i].index].img;
      item["unitprice"] = prod[uniqueItems[i].index].price;
      item["quantity"] = uniqueItems[i].count;
      item["id"] = prod[uniqueItems[i].index].id;
      item["totalprice"] =
        Number(prod[uniqueItems[i].index].price) * uniqueItems[i].count;
      data.push(item);
    }
    console.log(data);
  }
  console.log(cartArr2);
  return (document.getElementById("tabledata").innerHTML =
    document.getElementById("tabledata").innerHTML +
    data
      .map((x) => {
        return `
    <tr>
        <td>${x.name}</td>
        <td><img width="100" src="${x.image}"></td>
        <td>${x.unitprice}</td>
        <td><button onclick="decProd(${x.id})" id="btn-unit">-</button> ${x.quantity} <button onclick="incProd(${x.id})" id="btn-unit">+</button></td>
        <td>${x.totalprice}</td>
        <td><button id="btn-del" onclick="del(${x.id})">Delete</button></td>
    </tr>
`;
      })
      .join(""));
};

if (cartArr) cartTable();

let del = (id) => {
  console.log(id);
  console.log(cartArr);
  for (let i = 0; i < cartArr.length; i++) {
    if (id == cartArr[i]) {
      cartArr[i] = -1;
    }
  }
  let j = 0;
  let data = [];
  for (let i = 0; i < cartArr.length; i++) {
    if (cartArr[i] != -1) {
      data[j] = cartArr[i];
      j++;
    }
  }
  localStorage.setItem("CART", JSON.stringify(data));
  onLoad();
  if (cartArr) cartTable();
  totalCost(cartArr, prod);
};
let incProd = (id) => {
  onLoad();
  cartArr.push(id);
  localStorage.setItem("CART", JSON.stringify(cartArr));
  onLoad();
  console.log(JSON.parse(localStorage.getItem("CART")));
  if (cartArr) cartTable();
  totalCost(cartArr, prod);
};
let decProd = (id) => {
  onLoad();
  for (let i = 0; i < cartArr.length; i++) {
    if (id == cartArr[i]) {
      cartArr[i] = -1;
      break;
    }
  }
  let j = 0;
  let data = [];
  for (let i = 0; i < cartArr.length; i++) {
    if (cartArr[i] != -1) {
      data[j] = cartArr[i];
      j++;
    }
  }
  localStorage.setItem("CART", JSON.stringify(data));
  onLoad();
  console.log(JSON.parse(localStorage.getItem("CART")));
  if (cartArr) cartTable();
  totalCost(cartArr, prod);
};
