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
    if (localStorage.getItem("isloggedin") === "true")  {
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
    if (localStorage.getItem("isloggedin") === "true")  {
      window.location.href = selectedOption.value;
    } 
  }
}

function checkData() {
  const userName = document.querySelector(".EnterUsername").value;
  const password = document.querySelector(".EnterPassword").value;
  if ((userName === "Tawfik" && password === "12345" )||(userName === "Habiba" && password === "123456" ) ||(userName === "Amira" && password === "1234567" )||(userName === "Omran" && password === "12345678" )||(userName === "Alaa" && password === "123456789" )||(userName === "Karem" && password === "1234567890" )) {
    close_modal();
    localStorage.setItem("isloggedin", true);
    switchbtn();
  }
  else {
    alert("Username or password incorrect");
  }
}

function switchbtn(){
  if (localStorage.getItem("isloggedin") === "true") {
    document.getElementById("btnlogin").style.zIndex = "1";
    document.getElementById("btnlogout").style.zIndex = "2";
  } 
  else {
    document.getElementById("btnlogin").style.zIndex = "2";
    document.getElementById("btnlogout").style.zIndex = "1";
  }
}

function logout(){
  localStorage.setItem("isloggedin", false);
  switchbtn();
  if (localStorage.getItem("isloggedin") === "false") {
    window.location.href = "home.html"; 
    switchbtn();
  } else {
    window.location.href = window.location.href;
  }
}

window.onload = function() {
  switchbtn();
  if (localStorage.getItem("isloggedin") !== "true" && window.location.href.indexOf("/home.html") === -1) {
    window.location.href = "home.html";
  }
  
};

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
  constructor(name, ID, mobile, email, dateOfBirth, level, department, active, gender) {
    this.name = name;
    this.ID = ID;
    this.mobile = mobile;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.level = level;
    this.department = department;
    this.active = active;
    this.gender = gender;
  }
}

function setStudentInfo() {
  const name = document.querySelector("#NameOfStudent").value;
  const ID = document.querySelector("#ID").value;
  const mobile = document.querySelector("#Moblie").value;
  const email = document.querySelector("#Email").value;
  const dateOfBirth = document.querySelector("#Dateofbirth").value;
  const level = document.querySelector("#Level").value;
  const department = document.querySelector("#Department").value;
  const active = document.querySelector("#Active").checked;
  const gender = document.querySelector("#Gender").value;
  const student = new Student(name, ID, mobile, email, dateOfBirth, level, department, active, gender);
  localStorage.setItem(ID, JSON.stringify(student));
}
