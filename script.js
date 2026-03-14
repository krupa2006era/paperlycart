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
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<p>pieces per box: ${product.pieces} pcs</p>

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
alert("Cart is empty")
return
}

let payment = document.getElementById("paymentMethod").value

let totalAmount = 0

for(let item in cart){
totalAmount += cart[item].price * cart[item].qty
}

let order = {
date: new Date().toLocaleString(),
total: totalAmount,
items: {...cart},
payment: payment
}

orderHistory.push(order)

localStorage.setItem("orderHistory", JSON.stringify(orderHistory))

displayHistory()

window.print()

cart = {}
updateBill()

}

function completeOrder(){

if(Object.keys(cart).length === 0){
alert("Cart is empty")
return
}

let payment = document.getElementById("paymentMethod").value

let totalAmount = 0

for(let item in cart){
totalAmount += cart[item].price * cart[item].qty
}

let now = new Date()

let order = {
date: now.toLocaleDateString(),
time: now.toLocaleTimeString(),
total: total,
payment: payment,
items: cart
}

orderHistory.push(order)

localStorage.setItem("orderHistory", JSON.stringify(orderHistory))

displayHistory()

alert("Order saved successfully")

cart = {}
updateBill()

}

function displayHistory(){

let historyDiv = document.getElementById("orderHistory")

historyDiv.innerHTML=""

orderHistory.forEach((order,index)=>{

let div = document.createElement("div")

div.innerHTML = `
<p><b>Order ${index+1}</b></p>
<p>Date: ${order.date}</p>
<p>Total: ₹${order.total}</p>
<p>Payment: ${order.payment}</p>
<hr>
`

historyDiv.appendChild(div)

})

}

function clearBill(){

cart = {}
updateBill()

}

function toggleHistory(){

let panel = document.getElementById("historyPanel")

if(panel.style.display === "none"){
panel.style.display = "block"
}
else{
panel.style.display = "none"
}



}

displayHistory()

function exportHistory(){

let csv = "Order,Date,Time,Payment,Total\n"

orderHistory.forEach((order,index)=>{

let dateText = `"${order.date || ""}"`
let timeText = `"${order.time || ""}"`

csv += `${index+1},${dateText},${timeText},${order.payment},${order.total}\n`

})

let blob = new Blob([csv], { type: "text/csv" })

let url = window.URL.createObjectURL(blob)

let a = document.createElement("a")

a.href = url
a.download = "order_history.csv"

a.click()

}

function logout(){
    window.location.href = "index.html";
}