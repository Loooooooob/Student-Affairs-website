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
    window.location.href = selectedOption.value;
  }
}
function checkData(){
  const UserName=document.querySelector(".EnterUsername").value;
  const Password=document.querySelector(".EnterPassword").value;
  var Login=document.querySelector("#btn");
  
  if(UserName=="Tawfik" && Password=="123456"){
    Login.innerHTML="Logout";
    Login.style.backgroundColor="#F9F4ED";
    Login.style.color="black";
    close_modal();
  }
}

