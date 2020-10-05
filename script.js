// const timeNow = Date.now();
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const list = document.getElementById("list");
const count = document.getElementById("count");
const form = document.getElementById("form");
const text = document.getElementById("input");
const locationInput = document.getElementById("location");

//get all sessions from local storage

const localStorageSessions = JSON.parse(localStorage.getItem("sessions"));
let sessions = localStorage.getItem("sessions") !== null ? localStorageSessions : [];


// var timer;
const timerObj={
    start:0,
    pause:-1
}

function setTimer(x){
    timerObj.start=x;
}

function getTimer(){
const started= timerObj.start;
    return started
}





// const dummySessions = [
//   {
//     start: 1600517416726,
//     end: 1600517716726,
//     location: "New York",
//     message: "message 1",
//   },
//   {
//     start: 1600616516726,
//     end: 1600618716726,
//     location: "Sydney",
//     message: "message 2",
//   },
//   {
//     start: 1600616516726,
//     end: 1600618716726,
//     location: "London",
//     message: "message 2",
//   },
// ];
// let sessions = dummySessions;
function addSessionDOM(session) {
    // var birds = document.getElementById("birds");//list
    // var i = birds.childNodes.length;// 
    // while (i--)     
    //   birds.appendChild(birds.childNodes[i]);

  const total = Math.floor((session.end - session.start) / (1000));
  const startDate = new Date(session.start);
  const humanDate = startDate.toLocaleDateString();
  const item = document.createElement("li");
  item.innerHTML = `
    ${humanDate}  |  ${total} m |  ${session.location} | ${session.message} <button class="btnDelete" onclick="removeSession(${session.id})">x</button> <button class="btnEdit" id="btnEdit"><i class=" icon icon-edit-modify-streamline"></i> </button>
    `;

  list.appendChild(item);
  reset();
}

// run when stop button pressed
function counterFinish(e) {
  e.preventDefault();
  const startedTime =getTimer();
//   const getCurTime = getCurTime();
//   const calculatedTotal = getCurTime - timer;
  const session = {
    id: generateId(),
    start: startedTime,
    end: getCurTime(),
    location: locationInput.value,
    message: text.value,
  };

  console.log(session);
  sessions.push(session);
  //   addSessionDOM(session)
  updateLocalStorage();
  init();
  reset();
  timerObj.pause=-1;
//   timer=0;
}

function init() {
  list.innerHTML = "";
  stopBtn.disabled=true;
  
  let reverseSessions = sessions.reverse();
  reverseSessions.forEach(addSessionDOM);
//   var i = list.childNodes.length;
//   while(i--)
// list.appendChild(list.childNodes[i])
}

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function getCurTime() {
  const date = new Date();
  const curTime = date.getTime();
  return curTime;
}


let time = 0;
var myInterval = -1;
function activateTimer(e) {
  e.preventDefault();
  //init timer object by getting current time and setting object
  const pause = timerObj.pause;
  if (pause<0){
     const curTime = getCurTime();
  setTimer(curTime);
  timerObj.pause =1;
 
  }
  stopBtn.disabled=false;
  
  //if paused start
  if (myInterval == -1) {
    startBtn.innerHTML = "Pause";
    count.classList.add("orangeBorder");

    myInterval = setInterval(() => {
      time++;
      const seconds = time % 60;
      const minutes = Math.floor(time / 60);
      const hours = Math.floor(time / 3600);

      count.innerHTML = `${hours}h:${minutes}m:${seconds}s`;
    }, 1000);
  } else {
    startBtn.innerHTML = "Start";
    count.classList.remove("orangeBorder");
    clearInterval(myInterval);
    myInterval = -1;
  }
}

function reset() {
  time = 0;
  startBtn.innerHTML = "Start";
  count.classList.remove("orangeBorder");
  clearInterval(myInterval);
  myInterval = -1;
  text.value = "";
  locationInput.value = "";
  count.innerHTML = 0;
//   setTimer(0);
}

function removeSession(id){
    sessions = sessions.filter(session=>session.id!==id);
    updateLocalStorage();
    init();
    reset();
}

//update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

//initialise the app
init();

//add event listeners
startBtn.addEventListener("click", activateTimer);
stopBtn.addEventListener("click", counterFinish);

// startBtn.addEventListener('click', startSession)
