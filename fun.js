/*get data from local storage*/ 
var data;
if (localStorage.getItem("allStudents") != null) {
    data = JSON.parse(localStorage.getItem("allStudents"));
} else {
    data = [];
}

function checkid(){
  const id=document.querySelector("#ID").value;
  for (let i = 0; i < data.length; i++) {
    if(data[i].ID==id){
      alert("The id already exsist");
      return;
    }
  }
  addStudentInfo();
}

function pop_up() {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("homeid").style.filter = "blur(5px)";
}

function close_modal() {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("homeid").style.filter = "blur(0px)";
}

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

function ChangePage(select) {
    var selectedOption = select.options[select.selectedIndex];

    if (selectedOption.value != "") {
        if (localStorage.getItem("isloggedin") === "true") {
            window.location.href = selectedOption.value;
        }
    }
}

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

function switchbtn() {
    if (localStorage.getItem("isloggedin") === "true") {
        document.getElementById("btnlogin").style.zIndex = "1";
        document.getElementById("btnlogout").style.zIndex = "2";
    } else {
        document.getElementById("btnlogin").style.zIndex = "2";
        document.getElementById("btnlogout").style.zIndex = "1";
    }
}

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

window.onload = function () {
    switchbtn();
    if (localStorage.getItem("isloggedin") !== "true" && window.location.href.indexOf("/home.html") === -1) {
        window.location.href = "home.html";
    }

};
function gotohomepage(){
  window.location.href = "home.html";
 }

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

function checklevel() {
    var select = document.getElementById("Level");
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value == "1" || selectedOption.value == "2") {
        document.getElementById("Department").value = "General";
    }
}

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

/*st data in local storage*/
function set(s) {
    localStorage.setItem("allStudents", JSON.stringify(s));
}

function viewTable() {
    var body = document.getElementById("tcontent");
    body.innerHTML = ``;
    var table = '';
    for (var i = 0; i < data.length; i++) {
        if (data[i].active == true) {
            table += `
    <tr class="trdb">
    <td class="tddb">${data[i].name}</td>
    <td class="tddb">${data[i].ID}</td>
    <td class="tddb">${data[i].dateOfBirth}</td>
    <td class="tddb">${data[i].gpa}</td>
    <td class="tddb">${data[i].email}</td>
    <td class="tddb">${data[i].gender}</td>
    <td class="tddb">${data[i].active ? "Active" : "Inactive"}</td>
    <td class="tddb">${data[i].mobile}</td>
    <td class="tddb">${data[i].level}</td>
    <td class="tddb">${data[i].department}</td>
    <td class="tddb">
      <select id="databaseoptions1" class="databaseoptions" onchange="ChangePage(databaseoptions1)">
        <option value=""></option>
        <option value="UpdateAndDelete.html">Update</option>
        <option value="AssignDep.html">Department</option>
      </select>
    </td>
  </tr>
    `;
        }
    }
    body.innerHTML = table;
}

if (window.location.href.includes("StudentDataBase.html")) {
    viewTable();
}



/*===============================================================================*/
let GlobalIDs = [];

function viewAll() {
    const table = document.getElementsByTagName("table")[0];
    table.innerHTML = ' <thead>\n' +
        '            <tr>\n' +
        '                <th>Student Name</th>\n' +
        '                <th>Student ID</th>\n' +
        '                <th>Current Status</th>\n' +
        '            </tr>\n' +
        '        </thead>';


    for (let i = 0; i < data.length; i++) {

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
function searchByName(name) {

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
        let tempName = data[i].name.toLowerCase().substring(0, data[i].name.indexOf(' '));
        if (name === tempName ) {

            // console.log(data);
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


document.addEventListener('click', () => {
    const searchButton = document.getElementById("search-button");
    const idOption = document.getElementById("idOption");

    searchButton.addEventListener("click", () => {
        let userInputValue = document.getElementById('userInput').value;
        if (idOption.checked) {
            searchByID(userInputValue);
        } else {
            searchByName(userInputValue.toLowerCase());

        }
    });
});

function saveStatus() {
    let flag = false;
    console.log(GlobalIDs.length);

    for (let i = 0; i < GlobalIDs.length; i++) {

        let string = "active" + GlobalIDs[i] ;
        let element = document.getElementById(string);
        let status = element.checked;

        for (let j = 0; j < data.length; j++) {
            if (data[j].ID === GlobalIDs[i]) {
                flag = true;
                data[j].active = status;
                console.log(data[j].active);
                break;
            }
        }
    }
    if (flag) {
        alert("Status saved")
    }
   localStorage.setItem("allStudents", JSON.stringify(data));
}
if(window.location.href.indexOf("studentStatusPage.html") > -1) {
    viewAll();
  // console.log("This function will execute when the specific page loads");
}