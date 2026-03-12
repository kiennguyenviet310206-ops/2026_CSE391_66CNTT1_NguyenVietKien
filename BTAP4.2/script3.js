const prices={
"Áo":150000,
"Quần":200000,
}

function showError(id,msg){
document.getElementById(id+"Error").textContent=msg
}

function clearError(id){
document.getElementById(id+"Error").textContent=""
}

function validateProduct(){
let p=document.getElementById("product").value
if(p===""){
showError("product","Chọn sản phẩm")
return false
}
clearError("product")
return true
}

function validateQuantity(){
let q=Number(document.getElementById("quantity").value)
if(!Number.isInteger(q)||q<1||q>99){
showError("quantity","Số lượng 1-99")
return false
}
clearError("quantity")
return true
}

function validateDelivery(){
let d=new Date(document.getElementById("delivery").value)
let today=new Date()
let max=new Date()
max.setDate(today.getDate()+30)
if(d<today||d>max){
showError("delivery","Ngày giao không hợp lệ")
return false
}
clearError("delivery")
return true
}

function validateAddress(){
let a=document.getElementById("address").value.trim()
if(a.length<10){
showError("address","Địa chỉ quá ngắn")
return false
}
clearError("address")
return true
}

function validateNote(){
let note=document.getElementById("note").value
if(note.length>200){
showError("note","Tối đa 200 ký tự")
return false
}
clearError("note")
return true
}

function validatePayment(){
let pay=document.querySelector('input[name="payment"]:checked')
if(!pay){
showError("payment","Chọn phương thức thanh toán")
return false
}
clearError("payment")
return true
}

function updateTotal(){
let p=document.getElementById("product").value
let q=Number(document.getElementById("quantity").value)
if(prices[p]&&q){
let total=prices[p]*q
document.getElementById("total").textContent=
Number(total).toLocaleString("vi-VN")
}
}

document.getElementById("product").onchange=updateTotal
document.getElementById("quantity").oninput=updateTotal
document.getElementById("note").oninput=function(){
let len=this.value.length
document.getElementById("count").textContent=len+"/200"
if(len>200){
document.getElementById("count").style.color="red"
}else{
document.getElementById("count").style.color="black"
}
}

document.getElementById("orderForm").addEventListener("submit",function(e){
e.preventDefault()

let valid=
validateProduct()&
validateQuantity()&
validateDelivery()&
validateAddress()&
validateNote()&
validatePayment()
if(valid){
let p=document.getElementById("product").value
let q=document.getElementById("quantity").value
let d=document.getElementById("delivery").value
let total=document.getElementById("total").textContent
let box=document.getElementById("confirmBox")
box.innerHTML=`
<p>Sản phẩm: ${p}</p>
<p>Số lượng: ${q}</p>
<p>Ngày giao: ${d}</p>
<p>Tổng tiền: ${total} VND</p>
<button id="ok">Xác nhận</button>
<button id="cancel">Hủy</button>
`

box.style.display="block"
document.getElementById("ok").onclick=function(){
document.getElementById("orderForm").style.display="none"
box.style.display="none"
document.getElementById("success").textContent=
"Đặt hàng thành công 🎉"
}
document.getElementById("cancel").onclick=function(){
box.style.display="none"
}
}
})