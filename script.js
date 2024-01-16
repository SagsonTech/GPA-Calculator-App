// event elements 
const form = document.querySelector('#marks-input-form');
const tbody = document.querySelector('tbody');
const calculateBtn = document.querySelector('.calculate-gpa-btn');

// Required Arrays 
pointsAndMarks = [];
let marksArray = [];
let pointsArray = [];

// function to calculate the individual subject points based on the marks 
let calculatePoints = (marks) => {
    if (marks > 90 && marks <= 100) {
        return 10;
    }
    else if (marks > 80 && marks <= 90) {
        return 9;
    }
    else if (marks > 70 && marks <= 80) {
        return 8;
    }
    else if (marks > 60 && marks <= 70) {
        return 7;
    }
    else if (marks > 50 && marks <= 60) {
        return 6;
    }
    else {
        return 5;
    }
}

let generateId = () => {
    return Math.trunc((Math.random() * 1000));
}

// function add the marks,subject and points to the table 
let addToTable = (subject, marks, points , rowId) => {

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

    td1.innerText = subject;
    td2.innerText = marks;
    td3.innerText = points;
    btn.innerText = 'Remove';
    td4.append(btn);

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);

    tr.setAttribute('id' , rowId);

    tbody.append(tr);
}

let displayGpa = (displayContents) => {
    let gpaValue = document.querySelector('#gpa');
    let marksValue = document.querySelector('#marks-value');
    let gradeValue = document.querySelector('#grade');

    gpaValue.innerHTML = displayContents.gpa;
    marksValue.innerHTML = `${displayContents['securedMarks']} / ${displayContents['totalMarks']}`;
    gradeValue.innerHTML = displayContents.grade;

    document.querySelector('#gpa-box').style.display = 'inline-block';
    document.querySelector('#marks-box').style.display = 'inline-block';
    document.querySelector('#grade-box').style.display = 'inline-block';
}

let expectedGrade = (gpa) => {
    if (gpa >= 9) {
        return 'A+'
    }
    else if (gpa >= 8 && gpa < 9) {
        return 'A';
    }
    else if (gpa >= 7 && gpa < 8) {
        return 'B';
    }
    else if (gpa >= 6 && gpa < 7) {
        return 'C';
    }
    else if (gpa >= 5 && gpa < 6) {
        return 'D';
    }
}

// handling submit event 
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let subject = form.subject.value;
    let marks = form.marks.value;
    if (subject === '' || marks === '') {
        alert('Kindly enter the subject name and marks to add');
    }
    else {
        let points = calculatePoints(marks);
        // genertaing the row id 
    let rowId = generateId();

        pointsAndMarks.push(
            {
                id : rowId ,
                mark: marks,
                pts: points
            }
        );

        form.subject.value = '';
        form.marks.value = '';

        addToTable(subject, marks, points , rowId);
    }
})

// removing a row as an event 
tbody.addEventListener('click', (event) => {
    let target = event.target;

    if (target.nodeName === "BUTTON") {
        let row = (event.target.parentElement).parentElement;
        row.style.display = 'none';

        let rowId = row.getAttribute('id');

        let index = pointsAndMarks.findIndex(obj => {
            return obj.id == Number(rowId);
        })

        pointsAndMarks.splice(index , 1);
        
    }
});

// calculate gpa event 
calculateBtn.addEventListener('click', (event) => {
    marksArray = [];
    pointsArray = [];

    // pushing marks and points into separate arrays for calculations 
    pointsAndMarks.forEach(object => {
        marksArray.push(object.mark);
        pointsArray.push(object.pts);
    })

    // calculating the sum of marks 
    let securedMarks = marksArray.reduce(function (sum, marks) {
        return sum = sum + Number(marks);
    }, 0)

    // calculating the total marks :
    let totalMarks = marksArray.length * 100;

    // calculating the gpa
    let sumOfPoints = pointsArray.reduce(function (sum, points) {
        return sum = sum + points;
    }, 0)
    let gpa = sumOfPoints / pointsArray.length;

    // calculating the expected grade 
    let grade = expectedGrade(gpa);

    displayGpa({
        gpa: gpa,
        totalMarks: totalMarks,
        securedMarks: securedMarks,
        grade: grade
    });
})








