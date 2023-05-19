/*--------------------------------------------------------function used in several pages--------------------------------------------------*/

//get data from local storage
var data;
if (localStorage.getItem("allStudents") != null) {
    data = JSON.parse(localStorage.getItem("allStudents"));
} else {
    data = [];
}

// go to page from select options in header 
function goToPage() {
    var select = document.getElementById("studentoptions");
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value != "") {
        if (localStorage.getItem("isloggedin") === "true") {
            window.location.href = selectedOption.value;
        } else {
            alert("Please log in first");
            pop_up();
        }
    }
}

// function goToPageAbout() {
//     if (localStorage.getItem("isloggedin") === "true") {
//         window.location.href = "about.html";
//     } else {
//         alert("Please log in first");
//         //pop_up();
//     }
// }

// change page from select options in active student table
function ChangePage(select) {
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value != "") {
        if (localStorage.getItem("isloggedin") === "true") {
            window.location.href = selectedOption.value;
        }
    }
}

// function ChangePage(select) {
//     if (!select) {
//         return;
//     }
//     var selectedOption = select.options[select.selectedIndex];
//     if (selectedOption && selectedOption.value !== "") {
//         var isLoggedIn = localStorage.getItem("isloggedin");
//         if (isLoggedIn === "true") {
//             var pageUrl = selectedOption.value;
//             if (pageUrl == "AssignDep.html") {
//                 if (checkLevelThree()) {
//                     window.location.href = pageUrl;
//                 } else {
//                     alert("You can add department only for level 3 students");
//                 }
//             } else {
//                 window.location.href = pageUrl;
//             }
//         }
//     }
// }

//switch login and logout button
function switchbtn() {
    if (localStorage.getItem("isloggedin") === "true") {
        document.getElementById("btnlogin").style.zIndex = "1";
        document.getElementById("btnlogout").style.zIndex = "2";
    } else {
        document.getElementById("btnlogin").style.zIndex = "2";
        document.getElementById("btnlogout").style.zIndex = "1";
    }
}

//logout function
function logout() {
    localStorage.setItem("isloggedin", false);
    switchbtn();
    if (localStorage.getItem("isloggedin") === "false") {
        window.location.href = "home.html";
        switchbtn();
    } else {
        window.location.href = window.location.href;
    }
}

//go to home page
function gotohomepage() {
    window.location.href = "home.html";
}

//check level and set department
function checklevel() {
    var select = document.getElementById("Level");
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value == "1" || selectedOption.value == "2") {
        document.getElementById("Department").value = "General";
    }
}

//remove access from logged out user from pressing back button to go to the previous page
window.onload = function () {
    switchbtn();
    if ((!window.location.href.indexOf("/about.html")) && localStorage.getItem("isloggedin") !== "true" && window.location.href.indexOf("/home.html") === -1) {
        window.location.href = "home.html";
    }
};

//class for student object
class Student {
    constructor(name, ID, mobile, email, dateOfBirth, level, department, active, gender, gpa) {
        this.name = name;
        this.ID = ID;
        this.mobile = mobile;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.level = level;
        this.department = department;
        this.active = active;
        this.gender = gender;
        this.gpa = gpa;
    }
}

//set data to local storage
function set(s) {
    localStorage.setItem("allStudents", JSON.stringify(s));
}

// function to check if the inputs is empty or not
function validation(id) {
    var element = document.getElementById(id);
    if (element.value == "") {
        element.setCustomValidity("Please fill this field");
        return false;
    } else {
        element.setCustomValidity("");
    }
    return true;
}


function checkValidation() {
    validation("ID");
    validation("NameOfStudent");
    validation("Dateofbirth");
    validation("Level");
    validation("Department");
    validation("gpa");
}

/*-------------------------------------------------------------------Home Page--------------------------------------------------------------*/

//close the pop up screen for login page
function close_modal() {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("homeid").style.filter = "blur(0px)";
}

//pop up login screen
function pop_up() {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("homeid").style.filter = "blur(5px)";
}

//check valid users and password
function checkData() {
    const userName = document.querySelector(".EnterUsername").value;
    const password = document.querySelector(".EnterPassword").value;
    if ((userName === "Tawfik" && password === "12345") || (userName === "Habiba" && password === "123456") || (userName === "Amira" && password === "1234567") || (userName === "Omran" && password === "12345678") || (userName === "Alaa" && password === "123456789") || (userName === "Karem" && password === "1234567890")) {
        close_modal();
        localStorage.setItem("isloggedin", true);
        switchbtn();
    } else {
        alert("Username or password incorrect");
    }
}

/*---------------------------------------------------------------Add new student Page----------------------------------------------------------*/

var x = document.getElementById("addForm");
if (x) {
    x.addEventListener("submit", function (y) {
        y.preventDefault();
        if (checkid()) {
            addStudentInfo();
        }
    });
}

//function to check if the id already exsist
function checkid() {
    const id = document.querySelector("#ID").value;
    for (let i = 0; i < data.length; i++) {
        if (data[i].ID == id) {
            alert("The id already exsist");
            return false;
        }
    }
    return true;
}

//function to set data to a new student to the database
function addStudentInfo() {
    const name = document.querySelector("#NameOfStudent").value;
    const ID = document.querySelector("#ID").value;
    const mobile = document.querySelector("#Moblie").value;
    const email = document.querySelector("#Email").value;
    const dateOfBirth = document.querySelector("#Dateofbirth").value;
    const level = document.querySelector("#Level").value;
    const department = document.querySelector("#Department").value;
    var active = document.getElementsByName('ActivationStutes');
    const gpa = document.querySelector("#gpa").value;
    var avtiveValue;
    for (var i = 0, length = active.length; i < length; i++) {
        if (active[i].checked) {
            avtiveValue = active[i].value == "Active" ? true : false;
            break;
        }
    }
    var gender = document.getElementsByName('Gender');
    var genderValue;
    for (var i = 0, length = gender.length; i < length; i++) {
        if (gender[i].checked) {
            genderValue = gender[i].value;
            break;
        }
    }
    const student = new Student(name, ID, mobile, email, dateOfBirth, level, department, avtiveValue, genderValue, gpa);
    data.push(student);
    set(data);
    if (student.active == true) {
        window.location.href = "StudentDataBase.html";
    } else {
        window.location.href = "studentStatusPage.html";
    }
}

/*-------------------------------------------------------------All Active Student Page-----------------------------------------------------------*/

//search for student in active student page
function Search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementsByClassName("tabledb")[0];
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
//function to view the table of all active students
function viewTable() {
    var body = document.getElementById("tcontent");
    body.innerHTML = ``;
    var table = '';
    for (var i = 0; i < data.length; i++) {
        if (data[i].active == true) {
            table += `
    <tr class="trdb">
    <td class="tddb">${data[i].name}</td>
    <td class="tddb" id = "tdID">${data[i].ID}</td>
    <td class="tddb">${data[i].dateOfBirth}</td>
    <td class="tddb">${data[i].gpa}</td>
    <td class="tddb">${data[i].email}</td>
    <td class="tddb">${data[i].gender}</td>
    <td class="tddb">${data[i].active ? "Active" : "Inactive"}</td>
    <td class="tddb">${data[i].mobile}</td>
    <td class="tddb">${data[i].level}</td>
    <td class="tddb">${data[i].department}</td>
    <td class="tddb">
      <select id="databaseoptions1" class="databaseoptions" onchange="ChangePage(this)">
        <option value=""></option>
        <option value="UpdateAndDelete.html?id=${data[i].ID}">Update</option>
        <option value="AssignDep.html?id=${data[i].ID}">Department</option>
      </select>
    </td>
  </tr>
    `;
        }
    }
    body.innerHTML = table;
}



//if condition to add the data in active student page
if (window.location.href.includes("StudentDataBase.html")) {
    viewTable();
}

/*---------------------------------------------------------------Update page functions-------------------------------------------------*/

var a = document.getElementById("myForm");
if (a) {
    a.addEventListener("submit", function (y) {
        y.preventDefault();
        updateStudentInfo();
    });
}

//function to get data of specific student from database
function getDataFromDB() {
    var currentLink = window.location.href;
    var url = new URL(currentLink);
    var getParameter = url.searchParams;
    var getID = getParameter.get("id");
    var index = data.find(allStudents => allStudents.ID == getID);

    console.log(index);

    document.getElementById("NameOfStudent").value = index.name;

    var active = document.getElementsByName('ActivationStutes');
    for (var i = 0; i < active.length; i++) {
        if (active[i].value == (index.active ? "Active" : "Inactive")) {
            active[i].checked = true;
            break;
        }
    }

    var gender = document.getElementsByName('Gender');
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].value == index.gender) {
            gender[i].checked = true;
            break;
        }
    }

    document.getElementById("gpa").value = index.gpa;
    document.getElementById("Department").value = index.department;
    document.getElementById("Level").value = index.level;
    document.getElementById("Dateofbirth").value = index.dateOfBirth;
    document.getElementById("Email").value = index.email;
    document.getElementById("Moblie").value = index.mobile;
    document.getElementById("ID").value = index.ID;
}
//if condition to add the data in update page
if (window.location.href.includes('UpdateAndDelete.html')) {
    getDataFromDB();
}

//function to update data of specific student in database
function updateStudentInfo() {
    var currentLink = window.location.href;
    var url = new URL(currentLink);
    var getParameter = url.searchParams;
    var getID = getParameter.get("id");
    var index = data.findIndex(allStudents => allStudents.ID == getID);

    const name = document.querySelector("#NameOfStudent").value;
    const ID = document.querySelector("#ID").value;
    const mobile = document.querySelector("#Moblie").value;
    const email = document.querySelector("#Email").value;
    const dateOfBirth = document.querySelector("#Dateofbirth").value;
    const level = document.querySelector("#Level").value;
    const department = document.querySelector("#Department").value;
    var active = document.getElementsByName('ActivationStutes');
    const gpa = document.querySelector("#gpa").value;
    var avtiveValue;
    for (var i = 0, length = active.length; i < length; i++) {
        if (active[i].checked) {
            avtiveValue = active[i].value == "Active" ? true : false;
            break;
        }
    }
    var gender = document.getElementsByName('Gender');
    var genderValue;
    for (var i = 0, length = gender.length; i < length; i++) {
        if (gender[i].checked) {
            genderValue = gender[i].value;
            break;
        }
    }
    data[index].name = name;
    data[index].ID = ID;
    data[index].mobile = mobile;
    data[index].email = email;
    data[index].dateOfBirth = dateOfBirth;
    data[index].level = level;
    data[index].department = department;
    data[index].active = avtiveValue;
    data[index].gender = genderValue;
    data[index].gpa = gpa;
    set(data);
    if (data[index].active == true) {
        window.location.href = "StudentDataBase.html";
    } else {
        window.location.href = "studentStatusPage.html";
    }
}

//function to delete data of specific student in database
function deleteStudentInfo() {
    var confirmation = confirm("Are you sure you want to delete?");
    var id;
    var link = window.location.href;
    var url = new URL(link);
    var searchPrams = url.searchParams;
    id = searchPrams.get('id');

    if (!confirmation) {
        window.location.href = "UpdateAndDelete.html?id=" + id;
        return;
    }

    var index = data.findIndex(e => e.ID == id);
    data.splice(index, 1);
    set(data);
    window.location.href = "StudentDataBase.html";
}

// function to check if the id is already exsist or not
function checkIdUpdate() {
    var currentLink = window.location.href;
    var url = new URL(currentLink);
    var getParameter = url.searchParams;
    var getID = getParameter.get("id");

    const id = document.querySelector("#ID").value;
    for (let i = 0; i < data.length; i++) {
        if (data[i].ID != getID && data[i].ID == id) {
            alert("The id already exsist");
            return;
        }
    }
}

/*------------------------------------------------------------Department page functions--------------------------------------------------*/

//function to get data of specific student from database
function getDataFromDB_dep() {
    var currentLink = window.location.href;
    var url = new URL(currentLink);
    var getParameter = url.searchParams;
    var getID = getParameter.get("id");
    var index = data.find(allStudents => allStudents.ID == getID);
    document.getElementById("NameOfStudent").value = index.name;
    document.getElementById("Department").value = index.department;
    document.getElementById("Level").value = index.level;
    document.getElementById("ID").value = index.ID;
}

//if condition to add the data in Department page
if (window.location.href.includes('AssignDep.html')) {
    getDataFromDB_dep();
}

//function to set data of specific student from database
function depStudentInfo() {
    var currentLink = window.location.href;
    var url = new URL(currentLink);
    var getParameter = url.searchParams;
    var getID = getParameter.get("id");
    var index = data.findIndex(allStudents => allStudents.ID == getID);
    const nameField = document.querySelector("#NameOfStudent");
    const idField = document.querySelector("#ID");
    const levelField = document.querySelector("#Level");
    nameField.readOnly = true;
    nameField.disabled = true;
    idField.readOnly = true;
    idField.disabled = true;
    levelField.readOnly = true;
    levelField.disabled = true;
    const department = document.querySelector("#Department").value;
    data[index].department = department;
    set(data);
    if (data[index].active == true) {
        window.location.href = "StudentDataBase.html";
    } else {
        window.location.href = "studentStatusPage.html";
    }
}

if (window.location.href.includes("AssignDep.html?id")) {
    var currentLink = window.location.href;
    var url = new URL(currentLink);
    var getParameter = url.searchParams;
    var getID = getParameter.get("id");
    var s = data.find(allStudents => allStudents.ID == getID);

    if (s.level.toString() != "3") {
        alert("You can add department only for level 3 students");
        window.location.href = "StudentDataBase.html";
    }
}

/*-------------------------------------------------------------Status page functions--------------------------------------------------*/

// GlobalIDs is an array used to save the current table IDs; its purpose is explained in the saveStatus function.
let GlobalIDs = [];

// viewAll function runs when you open the student status's page , it projects all active/inactive students
function viewAll() {
    const table = document.getElementsByTagName("table")[0];
    // make the table header ( name, id and status )
    table.innerHTML = ' <thead>\n' +
        '            <tr>\n' +
        '                <th>Student Name</th>\n' +
        '                <th>Student ID</th>\n' +
        '                <th>Current Status</th>\n' +
        '            </tr>\n' +
        '        </thead>';


    for (let i = 0; i < data.length; i++) {
        // insert each row and cell in "data" which is in local storage .

        const newRow = table.insertRow();
        const nameCell = newRow.insertCell(0);
        const idCell = newRow.insertCell(1);
        const statusCell = newRow.insertCell(2);

        GlobalIDs.push(data[i].ID);

        // Assign each cell
        nameCell.innerHTML = data[i].name;
        idCell.innerHTML = data[i].ID;

        // Handle which radio button is checked by knowing the student's activity status from "data".
        // Assign a unique id to each radio button so that i can easily access it.

        statusCell.innerHTML = `
      <label>
          <input type="radio" name=${"activity" + i} value="activity" id=${"active" + data[i].ID}
                                                            ${data[i].active ? 'checked' : ''} style="display: inline-flex"> Active
        </label>
        
        <label>
          <input type="radio" name=${"activity" + i} value="inactivity" id=${"inactive" + data[i].ID} 
                                                            ${!data[i].active ? 'checked' : ''}  style="display: inline-flex"> Inactive
        </label>`;

        // Making even rows has different style (different class in style sheet) .
        if (table.rows.length % 2 === 1) {
            newRow.classList.add("even-row");
        }

    }

}
function searchByName(name) {
    // make GlobalIDs array empty to assign it with different IDs.
    GlobalIDs.length = 0;

    const table = document.getElementsByTagName("table")[0];
    table.innerHTML = ' <thead>\n' +
        '            <tr>\n' +
        '                <th>Student Name</th>\n' +
        '                <th>Student ID</th>\n' +
        '                <th>Current Status</th>\n' +
        '            </tr>\n' +
        '        </thead>';


    for (let i = 0; i < data.length; i++) {
        // add space to name to handle (one word name) case in substring function >> e.g. (mohamed, kareem, alaa)
        data[i].name += ' ';
        let tempName = data[i].name.toLowerCase().substring(0, data[i].name.indexOf(' '));

        // Revert to the original name.
        data[i].name = data[i].name.slice(0, -1);

        // If user input was the first name or full name, then pass .
        if (name === tempName || name === data[i].name.toLowerCase()) {

            const newRow = table.insertRow();
            const nameCell = newRow.insertCell(0);
            const idCell = newRow.insertCell(1);
            const statusCell = newRow.insertCell(2);

            GlobalIDs.push(data[i].ID);

            nameCell.innerHTML = data[i].name;
            idCell.innerHTML = data[i].ID;
            statusCell.innerHTML = `
        <label>
          <input type="radio" name=${"activity" + i} value="activity" id=${"active" + data[i].ID}
                                                            ${data[i].active ? 'checked' : ''} style="display: inline-flex"> Active
        </label>
        
        <label>
          <input type="radio" name=${"activity" + i} value="inactivity" id=${"inactive" + data[i].ID} 
                                                            ${!data[i].active ? 'checked' : ''}  style="display: inline-flex"> Inactive
        </label>`;

            if (table.rows.length % 2 === 1) {
                newRow.classList.add("even-row");
            }
        }
    }
}
function searchByID(ID) {
    GlobalIDs.length = 0;
    const table = document.getElementsByTagName("table")[0];
    table.innerHTML = ' <thead>' +
        '            <tr>' +
        '                <th>Student Name</th>' +
        '                <th>Student ID</th>' +
        '                <th>Current Status</th>\n' +
        '            </tr>\n' +
        '        </thead>';


    for (let i = 0; i < data.length; i++) {
        if (data[i].ID === ID) {
            const newRow = table.insertRow();
            const nameCell = newRow.insertCell(0);
            const idCell = newRow.insertCell(1);
            const statusCell = newRow.insertCell(2);

            nameCell.innerHTML = data[i].name;
            idCell.innerHTML = data[i].ID;
            GlobalIDs.push(data[i].ID);
            statusCell.innerHTML = `
            <label>
          <input type="radio" name=${"activity" + i} value="activity" id=${"active" + data[i].ID}
                                                            ${data[i].active ? 'checked' : ''} style="display: inline-flex"> Active
        </label>
        
        <label>
          <input type="radio" name=${"activity" + i} value="inactivity" id=${"inactive" + data[i].ID} 
                                                            ${!data[i].active ? 'checked' : ''}  style="display: inline-flex"> Inactive
        </label>`;
            if (table.rows.length % 2 === 1) {
                newRow.classList.add("even-row");
            }
        }

    }
}

// Handle the event when the user clicks the search button.
document.addEventListener('click', () => {
    const searchButton = document.getElementById("search-button");
    const idOption = document.getElementById("idOption");

    searchButton.addEventListener("click", () => {
        // Get user input
        let userInputValue = document.getElementById('userInput').value;

        // If the user clicks search with the ID option selected, then search by ID; otherwise, search by name.
        if (idOption.checked) {
            searchByID(userInputValue);
        } else {
            searchByName(userInputValue.toLowerCase());

        }
    });
});
// Save status function runs when user click "save status" button , it
// saves the changes made by the user in the students' activity status.

function saveStatus() {
    // Flag is a boolean variable that determines whether the user changed at least one status.
    let flag = false;
    for (let i = 0; i < GlobalIDs.length; i++) {
        // We can easily access the current table that the user wants to save its status by assisting with GlobalIDs data.

        let string = "active" + GlobalIDs[i];
        let element = document.getElementById(string);
        let status = element.checked;

        // Loop through the data to find the similar ID and assign it the new activity status.
        for (let j = 0; j < data.length; j++) {
            if (data[j].ID === GlobalIDs[i]) {
                flag = true;
                data[j].active = status;
                // console.log(data[j].active);
                break;
            }
        }
    }
    // If user changes at least one status project message "Status saved".
    if (flag) {
        alert("Status saved")
    }

    // Put the new data into local storage.
    localStorage.setItem("allStudents", JSON.stringify(data));
}
// If user opens the Student status page , run "viewAll" function.
if (window.location.href.indexOf("studentStatusPage.html") > -1) {

    viewAll();
    // console.log("This function will execute when the specific page loads");
}