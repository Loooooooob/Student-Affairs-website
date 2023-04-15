class student{
    constructor(name,ID,Moblie,Email,DateOfBirth,Level,Department,Active,Gender) {
        this.name=name;
        this.ID=ID;
        this.Moblie=Moblie;
        this.Email=Email;
        this.DateOfBirth=DateOfBirth;
        this.Level=Level;
        this.Department=Department;
        this.Active=Active;
        this.Gender=Gender;
    }
}
function Set_Info(){
    const Name=document.querySelector("#NameOfStudent").value;
    const ID=document.querySelector("#ID").value;
    const Moblie=document.querySelector("#Moblie").value;
    const Email =document.querySelector("#Email ").value;
    const DateOfBirth=document.querySelector("#Dateofbirth").value;
    const Level=document.querySelector("#Level").value;
    const Department =document.querySelector("#Department").value;
    const Active=document.querySelector("#Active").value;    
    const Gender=document.querySelector("#Gender").value;    
    
    const mystudent=new student(Name,ID,Moblie,Email,DateOfBirth,Level,Department,Active,Gender);
    
    localStorage.setItem(Name,JSON.stringify(mystudent));
};
// localStorage.clear();

console.log(localStorage.getItem('tawfik'));