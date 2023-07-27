
document.addEventListener("DOMContentLoaded", function () {
  window.bridge.updateMessage(updateMessage);
  
});

let btnTeste = document.getElementById('teste');
let textArea = document.getElementById('text');


function updateMessage(event, message) {
  console.log("message logged in view");
  let elemE = document.getElementById("message");
  elemE.innerHTML = message;
}

function mandarPrint(){
  console.log('funcçao print');
}


btnTeste.addEventListener('click', () =>{
  alert('AAAAAAAAAAAAA');
  window.bridge.fecharJanela();
});

const evtSource = new EventSource("http://localhost/testedePing/index.php");

evtSource.addEventListener('ping', () =>{
  alert('foi');
})







