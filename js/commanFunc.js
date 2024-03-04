let validateTxt = document.getElementById("validateTxt");


export function validMsgFunc (msg, color){
    validateTxt.innerText = msg;
    validateTxt.style.color = color;
  }