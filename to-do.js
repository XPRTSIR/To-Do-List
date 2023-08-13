const addUserbtn = document.getElementById("adduser");
const btnText = addUserbtn.innerText;
const usernameT = document.getElementById("username");
const recordDisplay = document.getElementById("record");
userArray = [];
let edit_id = null;

let objStr = localStorage.getItem("users");
if (objStr != null) {
  userArray = JSON.parse(objStr);
}
DisplayInfo();

// Action btn

addUserbtn.onclick = () => {
  const name = usernameT.value;
  //
  if (edit_id != null) {
    // edit
    userArray.splice(edit_id, 1, { nam: name });
    edit_id = null;
  } else {
    //insert
    userArray.push({ nam: name });
  }
  //
  SaveInfo(userArray);
  usernameT.value = "";
  // DisplayInfo();
  addUserbtn.innerText = btnText;
};

//
//saveinfo
function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  DisplayInfo();
}

//display user's name
function DisplayInfo() {
  let statement = "";
  userArray.forEach((u, i) => {
    statement += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${u.nam}</td>
                      <td>
                          <i class="btn fa-regular fa-pen-to-square" style="color: white; background-color: rgb(70, 95, 128);"  onclick="EditInfo(${i})"></i>
                          <i class="btn fa-regular fa-trash-can" style="color: white; background-color: red" onclick="DeletInfo(${i})"> </i> 
                      </td>
                 </tr>`;
  });
  recordDisplay.innerHTML = statement;
}

//edit user's name
function EditInfo(id) {
  edit_id = id;
  usernameT.value = userArray[id].nam;
  addUserbtn.innerText = "Save Change";
}

//delete user's name
function DeletInfo(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);
  // DisplayInfo();
}
