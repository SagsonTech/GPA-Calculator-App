// event elements 
const form = document.querySelector('#marks-input-form');
const tbody = document.querySelector('tbody');
const calculateBtn = document.querySelector('.calculate-gpa-btn');

// Required Arrays 
const pointsArray = [];

// function to calculate the individual subject points based on the marks 
let calculatePoints = (marks) => {
    if(marks > 90 && marks <= 100){
        return 10;
    }
    else if(marks > 80 && marks <= 90){
        return 9;
    }
    else if(marks > 70 && marks <= 80){
        return 8;
    }
    else if(marks > 60 && marks <= 70){
        return 7;
    }
    else if(marks > 50 && marks <= 60){
        return 6;
    }
    else{
        return 5;
    }
}

// function add the marks,subject and points to the table 
let addToTable = (subject , marks , points) => {

    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('btn-danger');
    btn.classList.add('btn-sm');
    btn.classList.add('remove-btn');

    console.dir(btn);

    td1.innerText = subject;
    td2.innerText = marks;
    td3.innerText = points;
    btn.innerText = 'Remove';
    td4.append(btn);

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);

    tbody.append(tr);
}

let displayGpa = (gpa) => {
    gpa = Number.parseFloat(gpa);

    let value = document.querySelector('#gpa');
    value.innerHTML = gpa;

    let gpaBox = document.querySelector('#gpa-box');

    if(gpa >= 9){
        gpaBox.classList.add = 'alert-success';
    }

    gpaBox.style.display = 'block';
}

// handling submit event 
form.addEventListener('submit' , (event) => {
    event.preventDefault();

    let subject = form.subject.value;
    let marks = form.marks.value;
    if(subject === '' || marks === ''){
        alert('Kindly enter the subject name and marks to add');
    }
    else{
        let points = calculatePoints(marks);

        pointsArray.push(points);

        form.subject.value = '';
        form.marks.value = '';

        addToTable(subject , marks , points);
    }
})

// removing a row as an event 
tbody.addEventListener('click' , (event) => {
    let target = event.target;

    if(target.nodeName === "BUTTON"){
        let row = (event.target.parentElement).parentElement;
        row.style.display = 'none';
    }
});

// calculate gpa event 
calculateBtn.addEventListener('click' , (event) => {
    let sum = pointsArray.reduce(function(total , point){
        return total = total + point;
    } , 0);

    let gpa = sum / pointsArray.length;

    displayGpa(gpa);
})








