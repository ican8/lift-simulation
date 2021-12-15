// create lift
let form = document.getElementById('form')
form.addEventListener('click',function(e){
  e.preventDefault();
})

let lifts = []

// let lift = document.createElement("div");
// lift.className = "lift";
// lift.id = "l1";
// let left_door = document.createElement("div");
// let right_door = document.createElement("div");
// left_door.classList.add("door","door-left")
// right_door.classList.add("door","door-right")
// lift.appendChild(left_door)
// lift.appendChild(right_door)


function createLifts(n){
  lifts = []
  for (let i = 1; i <= n; i++) {
    let lift = document.createElement("div");
    lift.className = "lift";
    lift.id = 'l'+i;
    let left_door = document.createElement("div");
    let right_door = document.createElement("div");
    left_door.classList.add("door","door-left")
    right_door.classList.add("door","door-right")
    left_door.id = 'ld'+i;
    right_door.id = 'rd'+i;
    lift.style.left = `${15 + 10*i}%`
    lift.appendChild(left_door)
    lift.appendChild(right_door)
    lifts.push(lift)
  }  
}

let currentFloor = 1;

function createFloor(floor_number) {
  let container = document.getElementById("container");

  let new_div = document.createElement("div");
  new_div.className = "floor";
  new_div.id = "floor" + floor_number;

  let new_up_btn = document.createElement("button");
  let up_text = document.createTextNode("Up");
  let new_down_btn = document.createElement("button");
  let down_text = document.createTextNode("Down");
  let new_br = document.createElement("br");
  let new_hr = document.createElement("hr");
  let new_span = document.createElement("span");
  let new_floor_text = document.createTextNode("Floor " + floor_number);
  new_span.appendChild(new_floor_text);
  new_span.className = "floor-text";
  new_hr.className = "hr";
  new_hr.id = "hr" + floor_number;
  new_up_btn.classList.add("btn", "up");
  new_down_btn.classList.add("btn", "down");

  new_up_btn.appendChild(up_text);
  new_up_btn.id = "up" + floor_number;
  new_down_btn.appendChild(down_text);
  new_down_btn.id = "down" + floor_number;

  new_div.appendChild(new_up_btn);
  new_div.appendChild(new_br);
  new_div.appendChild(new_down_btn);
  new_div.appendChild(new_span);
  new_div.appendChild(new_hr);

  container.insertBefore(new_div, container.childNodes[0]);
}

function closeDoor(e){
  let target_id = e.target.id;
  // NOTE :- BAD ASSUMPTION , MAX LIFTS = 9
  let lift_no = target_id[target_id.length-1]
  console.log("LIFT TARGET = ",lift_no);
  let left_door = document.getElementById('ld'+lift_no);
  let right_door = document.getElementById('rd'+lift_no);
  left_door.style.transform = `translateX(0)`;
  right_door.style.transform = `translateX(0)`;
  left_door.style.transition = `all 2.5s ease-out`;
  right_door.style.transition = `all 2.5s ease-out`;
}

function doorAnimation(e){
  let target_id = e.target.id;
  // NOTE :- BAD ASSUMPTION , MAX LIFTS = 9
  let lift_no = target_id[target_id.length-1]
  console.log("LIFT TARGET = ",lift_no);
  let lift = document.getElementById('l'+lift_no)
  lift.removeEventListener('webkitTransitionEnd',doorAnimation)
  // console.log('START DOOR ANIMATION!')
  let left_door = document.getElementById('ld'+lift_no);
  let right_door = document.getElementById('rd'+lift_no);
  right_door.addEventListener('webkitTransitionEnd',closeDoor,lift_no)
  left_door.style.transform = `translateX(-100%)`;
  right_door.style.transform = `translateX(100%)`;
  left_door.style.transition = `all 2.5s ease-out`;
  right_door.style.transition = `all 2.5s ease-out`;
  
}

function scheduledLift(){
  return Math.floor(Math.random() * no_of_lifts) + 1;
}

function moveLift(e) {
  let clicked_on = e.target.id;
  let n;
  if(clicked_on.startsWith('up'))
    n = Number(clicked_on.substring(2,clicked_on.length));
  else if(clicked_on.startsWith('down'))
    n = Number(clicked_on.substring(4,clicked_on.length));
  console.log('go to floor ',n);
  let distance = -1*(n-1)*100 ;

  let lift_no = scheduledLift();
  console.log('RANDOMLY SELECTED LIFT = ',lift_no);
  let lift = document.getElementById('l'+lift_no)
  console.log('HERE LIFT = ',lift)
  // let right_door = document.getElementsByClassName('door-right')[0];
  lift.addEventListener('webkitTransitionEnd',doorAnimation,lift_no)
  lift.style.transform = `translateY(${distance}%)`
  
  // lift.style.transform = `translateY(${-620 }%)`
  let time = 2 * Math.abs(currentFloor - n);
  lift.style.transitionDuration = `${time}s`;
  console.log('ETA- ',Math.abs(currentFloor - n));
  currentFloor = n;
  // console.log('Current floor - ',c);
  // let target_floor = document.getElementById("floor" + n);
  // target_floor.insertBefore(
  //   lift,
  //   target_floor.childNodes[target_floor.childNodes.length - 1]
  // );
}

function getButtons(){
    let up_btn_list = document.getElementsByClassName("up");
    let down_btn_list = document.getElementsByClassName("down");
    let upBtn;
    for (up_btn of up_btn_list) {
    up_btn.addEventListener("click", moveLift);
    }

    let downBtn;
    for (down_btn of down_btn_list) {
    down_btn.addEventListener("click", moveLift);
    }
}

let input_floors = document.getElementById("input-floors");
let input_lifts = document.getElementById("input-lifts");
let no_of_floors;
let no_of_lifts;

function make_floors() {
  container.innerHTML = "";
  no_of_floors = input_floors.value;
  no_of_lifts  = input_lifts.value;
  for (let i = 1; i <= no_of_floors; i++) {
    createFloor(i);
  }
  createLifts(no_of_lifts);
  console.log(lifts);

  for(lift of lifts){
    lift.style.transform = null
    lift.style.transitionDuration = null
    // set initial position of lift
    console.log(lift);
  }

  let first_floor = document.getElementById("floor1");
  console.log(first_floor);

  for(let i = lifts.length-1; i >= 0; i--){
    first_floor.insertBefore(
      lifts[i],
      first_floor.childNodes[first_floor.childNodes.length - 1]
    );
  }
  
  // set up buttons to listen for click event
  getButtons()
}

let input_btn = document.getElementById("input-btn");

input_btn.addEventListener("click", make_floors);
