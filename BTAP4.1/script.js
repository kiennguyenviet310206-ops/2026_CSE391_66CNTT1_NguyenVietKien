const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

let students = [];

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable(){

    tableBody.innerHTML = "";

    students.forEach((sv,index)=>{

        let rank = getRank(sv.score);

        let row = `
        <tr class="${sv.score < 5 ? 'yellow' : ''}">
            <td>${index+1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${rank}</td>
            <td>
                <button data-index="${index}">Xóa</button>
            </td>
        </tr>
        `;

        tableBody.innerHTML += row;

    });

    updateStats();
}

function updateStats(){

    let total = students.length;

    let avg = 0;

    if(total > 0){
        let sum = students.reduce((a,b)=>a + b.score,0);
        avg = (sum/total).toFixed(2);
    }

    stats.innerText = `Tổng SV: ${total} | Điểm TB: ${avg}`;
}

function addStudent(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === ""){
        alert("Họ tên không được trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";

    nameInput.focus();
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});

tableBody.addEventListener("click", function(e){

    if(e.target.tagName === "BUTTON"){

        let index = e.target.dataset.index;

        students.splice(index,1);

        renderTable();
    }

});