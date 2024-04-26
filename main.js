let productArr = [
  { id: 1, name: "Ox", price: 200000, img: "Images/img-A.jpeg" },
  { id: 2, name: "Bull", price: 150000, img: "Images/img-B.png" },
  { id: 3, name: "Australian", price: 220000, img: "Images/img-C.jpeg" },
  { id: 4, name: "Friesian", price: 200000, img: "Images/img-D.jpg" },
  { id: 5, name: "Holand", price: 150000, img: "Images/img-E.jpeg" },
  { id: 6, name: "Shaiwall", price: 130000, img: "Images/img-F.jpeg" },
  { id: 7, name: "Indian Ox", price: 120000, img: "Images/img-G.jpeg" },
];
if (!JSON.parse(localStorage.getItem("PROD"))) {
  localStorage.setItem("PROD", JSON.stringify(productArr));
}
let shop = document.getElementById("shop");
let generateProduct = () => {
  let prod1 = JSON.parse(localStorage.getItem("PROD"));
  return (shop.innerHTML = prod1
    .map((x) => {
      return `<div id=${x.id} class="item">
        <img width="300" height="250" src="${x.img}">
        <h3>${x.name}</h3>
        <p>${x.price} BDT</p>
        <button class="btnCart" onclick="addCart(${x.id})">Cart</button>
    </div>`;
    })
    .join(""));
};
generateProduct();
let cartArr = [];
if (JSON.parse(localStorage.getItem("CART")))
  cartArr = JSON.parse(localStorage.getItem("CART"));
let onLoad = () => {
  if (!JSON.parse(localStorage.getItem("CART")))
    document.getElementById("itemCount").innerHTML = "Cart 0";
  else {
    let arr2 = JSON.parse(localStorage.getItem("CART"));
    document.getElementById("itemCount").innerHTML = "Cart" + " " + arr2.length;
  }
};
onLoad();
let addCart = (id) => {
  cartArr.push(id);
  localStorage.setItem("CART", JSON.stringify(cartArr));
  onLoad();
};

function search() {
  let filter = document.getElementById("search").value.toUpperCase();
  let item = document.querySelectorAll(".item");
  let l = document.getElementsByTagName("h3");
  for (var i = 0; i <= l.length; i++) {
    let a = item[i].getElementsByTagName("h3")[0];
    let value = a.innerHTML || a.innerText || a.textContent;
    if (value.toUpperCase().indexOf(filter) > -1) {
      item[i].style.display = "";
    } else {
      item[i].style.display = "none";
    }
  }
}
let submitProduct = async () => {
  let podName = document.getElementById("podName").value;
  let podPrice = document.getElementById("podPrice").value;
  let podImage = document.getElementById("podImage");
  if (!podName || !podPrice || !podImage.files[0]) {
    alert("Data Mismatch");
  }
  let prod = JSON.parse(localStorage.getItem("PROD"));

  var file = podImage.files[0];
  if (file) {
    var reader = new FileReader();
  }
  let item = {};
  var base64String;
  item["id"] = prod.length + 1;
  item["name"] = podName;
  item["price"] = podPrice;

  reader.onload = function (readerEvent) {
    try {
      base64String = readerEvent.target.result;
      item["img"] = base64String;
    } catch (e) {
      console.log(e);
    }
    prod.unshift(item);
    localStorage.setItem("PROD", JSON.stringify(prod));
    onLoad();
    generateProduct();
  };
  reader.readAsDataURL(file);
  document.getElementById("podName").value = "";
  document.getElementById("podPrice").value = "";
  document.getElementById("podImage").value = "";
};