const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");
const sortScore = document.getElementById("sortScore");
const noResult = document.getElementById("noResult");

let students = [];
let filteredStudents = [];

let sortAsc = true;

function getRank(score){

if(score >= 8.5) return "Giỏi";
if(score >= 7) return "Khá";
if(score >= 5) return "Trung bình";
return "Yếu";

}

function addStudent(){

let name = nameInput.value.trim();
let score = parseFloat(scoreInput.value);

if(name === ""){
alert("Họ tên không được trống");
return;
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0-10");
return;
}

students.push({
name:name,
score:score
});

nameInput.value="";
scoreInput.value="";
nameInput.focus();

applyFilters();

}

function applyFilters(){

let keyword = searchInput.value.toLowerCase();
let filter = filterSelect.value;

filteredStudents = students.filter(sv =>{

let matchName = sv.name.toLowerCase().includes(keyword);

let rank = getRank(sv.score);

let matchRank = filter === "all" || rank === filter;

return matchName && matchRank;

});

filteredStudents.sort((a,b)=>{

if(sortAsc){
return a.score - b.score;
}else{
return b.score - a.score;
}

});

renderTable();

}

function renderTable(){

tableBody.innerHTML="";

if(filteredStudents.length === 0){

noResult.style.display="block";
stats.innerText="Tổng SV: 0 | Điểm TB: 0";
return;

}else{

noResult.style.display="none";

}

filteredStudents.forEach((sv,index)=>{

let rank = getRank(sv.score);

let row = `
<tr class="${sv.score < 5 ? 'yellow' : ''}">
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${rank}</td>
<td><button data-name="${sv.name}">Xóa</button></td>
</tr>
`;

tableBody.innerHTML += row;

});

updateStats();

}

function updateStats(){

let total = filteredStudents.length;

let sum = filteredStudents.reduce((a,b)=>a+b.score,0);

let avg = total ? (sum/total).toFixed(2) : 0;

stats.innerText = `Tổng SV: ${total} | Điểm TB: ${avg}`;

}

tableBody.addEventListener("click",function(e){

if(e.target.tagName === "BUTTON"){

let name = e.target.dataset.name;

students = students.filter(sv => sv.name !== name);

applyFilters();

}

});

addBtn.addEventListener("click",addStudent);

scoreInput.addEventListener("keypress",function(e){

if(e.key === "Enter"){
addStudent();
}

});

searchInput.addEventListener("input",applyFilters);

filterSelect.addEventListener("change",applyFilters);

sortScore.addEventListener("click",function(){

sortAsc = !sortAsc;

sortScore.innerText = sortAsc ? "Điểm ▲" : "Điểm ▼";

applyFilters();

});