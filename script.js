// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUIjfeb3lBjH68QvU8Uj6fWGDn5xfEeN4",
  authDomain: "paperlycart.firebaseapp.com",
  projectId: "paperlycart",
  storageBucket: "paperlycart.firebasestorage.app",
  messagingSenderId: "577246075569",
  appId: "1:577246075569:web:c59a37b49eda34fbefa090"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const db = firebase.firestore();


let cart = {}
let total = 0
let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || []

const productList = document.getElementById("productList")
const billItems = document.getElementById("billItems")
const totalDisplay = document.getElementById("total")
const search = document.getElementById("search")

function displayProducts(list){

productList.innerHTML=""

list.forEach((product)=>{

let div = document.createElement("div")
div.className = "product"

div.innerHTML = `
<img src="${product.image}" alt="${product.name}" style="width:120px; height:auto; margin-bottom:10px;">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<p>Pieces: ${product.pieces}</p>

<input type="number" id="qty-${product.name}" value="1" min="1" style="width:60px">

<button onclick="addToCart('${product.name}')">Add</button>
`

productList.appendChild(div)

})

}

displayProducts(products)

function showCategory(cat){

if(cat==="all"){
displayProducts(products)
}

else{

let filtered = products.filter(p => p.category===cat)
displayProducts(filtered)

}

}

function addToCart(name){

let product = products.find(p => p.name===name)

let qtyInput = document.getElementById("qty-"+name)
let qty = parseInt(qtyInput.value)

if(cart[name]){
cart[name].qty += qty
}
else{
cart[name] = {...product, qty: qty}
}

updateBill()

}

function updateBill(){

billItems.innerHTML=""
total = 0

for(let key in cart){

let item = cart[key]
let subtotal = item.price * item.qty

total += subtotal

billItems.innerHTML += `

<div class="bill-item">

${item.name} x ${item.qty} = ₹${subtotal}

<div>

<button class="qty-btn" onclick="changeQty('${key}',-1)">-</button>
<button class="qty-btn" onclick="changeQty('${key}',1)">+</button>
<button onclick="removeItem('${key}')">x</button>

</div>

</div>

`

}

totalDisplay.innerText = total

}

function changeQty(name,change){

cart[name].qty += change

if(cart[name].qty <= 0){
delete cart[name]
}

updateBill()

}

function removeItem(name){

delete cart[name]
updateBill()

}

search.addEventListener("keyup", ()=>{

let value = search.value.toLowerCase()

let filtered = products.filter(p =>
p.name.toLowerCase().includes(value)
)

displayProducts(filtered)

})

function printBill(){

  if(Object.keys(cart).length === 0){
    alert("Cart is empty");
    return;
  }

  let customerName = document.getElementById("customerName").value;
  let customerPhone = document.getElementById("customerPhone").value;
  let payment = document.getElementById("paymentMethod").value;

  let totalAmount = 0;
  let itemsHTML = "";

  for(let item in cart){
    let p = cart[item];
    totalAmount += p.price * p.qty;

    itemsHTML += `
      <tr>
        <td>${item}</td>
        <td>${p.qty}</td>
        <td>${p.price}</td>
        <td>${p.price * p.qty}</td>
      </tr>
    `;
  }

  let billContent = `
    <html>
    <head>
      <title>Bill</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        h2 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        table, th, td { border: 1px solid black; }
        th, td { padding: 8px; text-align: center; }
      </style>
    </head>
    <body>

      <h2>Bill</h2>

      <p><b>Customer Name:</b> ${customerName}</p>
      <p><b>Phone:</b> ${customerPhone}</p>
      <p><b>Date:</b> ${new Date().toLocaleString()}</p>

      <table>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        ${itemsHTML}
      </table>

      <h3>Total: ₹${totalAmount}</h3>
      <p><b>Payment:</b> ${payment}</p>

    </body>
    </html>
  `;

  let printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(billContent);
  printWindow.document.close();

  printWindow.onload = function(){
    printWindow.print();
  };

  let order = {
    date: new Date().toLocaleString(),
    customerName,
    customerPhone,
    payment,
    total: totalAmount,
    items: {...cart}
  };

  saveToFirebase(order);
  
  loadHistoryFromFirebase();

  cart = {};
  updateBill();
}


// ================= HISTORY =================

function displayHistory(){

  let historyDiv = document.getElementById("orderHistory");
  historyDiv.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

  history.forEach((order,index)=>{

    let div = document.createElement("div");

    div.innerHTML = `
      <p><b>Order ${index+1}</b></p>
      <p>Name: ${order.customerName || ""}</p>
      <p>Phone: ${order.customerPhone || ""}</p>
      <p>Date: ${order.date}</p>
      <p>Total: ₹${order.total}</p>
      <p>Payment: ${order.payment}</p>
      <hr>
    `;

    historyDiv.appendChild(div);
  });
}


// ================= CLEAR BILL =================

function clearBill(){
  cart = {};
  updateBill();
}


// ================= TOGGLE HISTORY =================

function toggleHistory(){

  let panel = document.getElementById("historyPanel");

  if(panel.style.display === "none"){
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}


// ================= EXPORT CSV =================

function exportHistory(){

  let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

  let csv = "Order,Date,Payment,Total\n";

  history.forEach((order,index)=>{

    let dateText = `"${order.date || ""}"`;

    csv += `${index+1},${dateText},${order.payment},${order.total}\n`;

  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = window.URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "order_history.csv";
  a.click();
}


// ================= LOGOUT =================

function logout(){
  window.location.href = "index.html";
}


// ================= FIREBASE =================

function saveToFirebase(order){
  db.collection("orders").add(order)
  .then(() => {
    console.log("Order saved");
  })
  .catch((error) => {
    console.log("Error:", error);
  });
}


// ================= LOAD HISTORY =================

displayHistory();


// ================= COMPLETE ORDER =================

function completeOrder(){
  printBill();
}

function loadHistoryFromFirebase(){

  let historyDiv = document.getElementById("orderHistory");
  historyDiv.innerHTML = "";

  db.collection("orders")
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {

      querySnapshot.forEach((doc, index) => {

        let order = doc.data();

        let div = document.createElement("div");

        div.innerHTML = `
          <p><b>Order ${index = 1}</b></p>
          <p>Name: ${order.customerName || ""}</p>
          <p>Phone: ${order.customerPhone || ""}</p>
          <p>Date: ${order.date}</p>
          <p>Total: ₹${order.total}</p>
          <p>Payment: ${order.payment}</p>
          <hr>
        `;

        historyDiv.appendChild(div);

      });

    })
    .catch((error) => {
      console.log("Error loading history:", error);
    });
}

