localStorage.setItem("1", JSON.stringify(["kareem", true]));
localStorage.setItem("2", JSON.stringify(["tawfik", false]));
localStorage.setItem("3", JSON.stringify(["youssef", true]));
localStorage.setItem("4", JSON.stringify(["tawfik", true]));
localStorage.setItem("5", JSON.stringify(["Sarah", false]));
localStorage.setItem("6", JSON.stringify(["Ahmed", true]));
localStorage.setItem("7", JSON.stringify(["Fatima", false]));
localStorage.setItem("8", JSON.stringify(["Sara", true]));
localStorage.setItem("9", JSON.stringify(["Ali", true]));

let GlobalID = [];


function searchByName(name) {

    GlobalID.length = 0;
    const table = document.getElementsByTagName("table")[0];
    table.innerHTML = ' <thead>\n' +
        '            <tr>\n' +
        '                <th>Student Name</th>\n' +
        '                <th>Student ID</th>\n' +
        '                <th>Current Status</th>\n' +
        '            </tr>\n' +
        '        </thead>';


    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let student = JSON.parse(localStorage.getItem(key));

        if (name && name === student[0]?.toLowerCase()) {

            const newRow = table.insertRow();
            const nameCell = newRow.insertCell(0);
            const idCell = newRow.insertCell(1);
            const statusCell = newRow.insertCell(2);

            nameCell.innerHTML = student[0];
            idCell.innerHTML = key;
            GlobalID.push(key);
            statusCell.innerHTML = `
        <label>
          <input type="radio" name=${"activity" + i} value="activity" id=${"active" + key}
                                                            ${student[1] ? 'checked' : ''} style="display: inline-flex"> Active
        </label>
        
        <label>
          <input type="radio" name=${"activity" + i} value="inactivity" id=${"inactive" + key} 
                                                            ${!student[1] ? 'checked' : ''}  style="display: inline-flex"> Inactive
        </label>`;

            if (table.rows.length % 2 === 1) {
                newRow.classList.add("even-row");
            }
        }
    }

}

function searchByID(ID) {
    GlobalID.length = 0;
    const table = document.getElementsByTagName("table")[0];
    table.innerHTML = ' <thead>' +
        '            <tr>' +
        '                <th>Student Name</th>' +
        '                <th>Student ID</th>' +
        '                <th>Current Status</th>\n' +
        '            </tr>\n' +
        '        </thead>';

    let student = JSON.parse(localStorage.getItem(ID));

    const newRow = table.insertRow();
    const nameCell = newRow.insertCell(0);
    const idCell = newRow.insertCell(1);
    const statusCell = newRow.insertCell(2);

    nameCell.innerHTML = student[0];
    idCell.innerHTML = ID;
    GlobalID.push(ID);
    statusCell.innerHTML = `
        <label>
          <input type="radio" name="activity" value="activity" id="active1" 
                                ${student[1] ? 'checked' : ''}  style="display: inline-flex" > Active
        </label>
        
        <label>
          <input type="radio" name="activity" value="inactivity" id="inactive1" 
                              ${!student[1] ? 'checked' : ''}  style="display: inline-flex" > Inactive
        </label>

    `;
    if (table.rows.length % 2 === 1) {
        newRow.classList.add("even-row");
    }

}


document.addEventListener('click', () => {
    const searchButton = document.getElementById("search-button");
    const idOption = document.getElementById("idOption");

    searchButton.addEventListener("click", () => {
        let userInputValue = document.getElementById('userInput').value;
        if (idOption.checked) {
            if (localStorage.getItem(userInputValue)) {
                searchByID(userInputValue);
            }
        } else {
            searchByName(userInputValue.toLowerCase());

        }
    });
});

function saveStatus() {
    let flag = false;
    for (let i = 0; i < GlobalID.length; i++) {

        let string = "active" + GlobalID[i];
        let element = document.getElementById(string);
        let status = element.checked;
        let student = JSON.parse(localStorage.getItem(GlobalID[i]));

        if ( status !== student[1])
            flag = true;

        student[1] = status;

        console.log(student);
        localStorage.setItem(GlobalID[i], JSON.stringify(student));
    }
    if ( flag ) {
        alert("Status saved")
    }
}
