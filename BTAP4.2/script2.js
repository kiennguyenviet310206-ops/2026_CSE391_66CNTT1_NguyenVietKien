function showError(id,message){
document.getElementById(id+"Error").textContent=message
}

function clearError(id){
document.getElementById(id+"Error").textContent=""
}

function validateFullname(){
let name=document.getElementById("fullname").value.trim()
let regex=/^[A-Za-zÀ-ỹ\s]{3,}$/
if(!regex.test(name)){
showError("fullname","Tên không hợp lệ")
return false
}

clearError("fullname")
return true
}

function validateEmail(){
let email=document.getElementById("email").value.trim()
let regex=/^\S+@\S+\.\S+$/
if(!regex.test(email)){
showError("email","Email không hợp lệ")
return false
}
clearError("email")
return true
}

function validatePhone(){
let phone=document.getElementById("phone").value.trim()
let regex=/^0\d{9}$/
if(!regex.test(phone)){
showError("phone","Số điện thoại không hợp lệ")
return false
}
clearError("phone")
return true
}

function validatePassword(){
let pass=document.getElementById("password").value
let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
if(!regex.test(pass)){
showError("password","Mật khẩu yếu")
return false
}
clearError("password")
return true
}

function validateConfirm(){
let pass=document.getElementById("password").value
let confirm=document.getElementById("confirmPassword").value
if(pass!==confirm){
showError("confirmPassword","Mật khẩu không khớp")
return false
}
clearError("confirmPassword")
return true
}

function validateGender(){
let gender=document.querySelector('input[name="gender"]:checked')
if(!gender){
showError("gender","Chọn giới tính")
return false
}
clearError("gender")
return true
}

function validateTerms(){
let terms=document.getElementById("terms").checked
if(!terms){
showError("terms","Phải đồng ý điều khoản")
return false
}
clearError("terms")
return true
}

document.getElementById("fullname").onblur=validateFullname
document.getElementById("email").onblur=validateEmail
document.getElementById("phone").onblur=validatePhone
document.getElementById("password").onblur=validatePassword
document.getElementById("confirmPassword").onblur=validateConfirm

document.getElementById("fullname").oninput=()=>clearError("fullname")
document.getElementById("email").oninput=()=>clearError("email")
document.getElementById("phone").oninput=()=>clearError("phone")
document.getElementById("password").oninput=()=>clearError("password")
document.getElementById("confirmPassword").oninput=()=>clearError("confirmPassword")

document.getElementById("registerForm").addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){
let name=document.getElementById("fullname").value
document.getElementById("registerForm").style.display="none"
document.getElementById("success").textContent=
"Đăng ký thành công! 🎉 Xin chào "+name
}
})