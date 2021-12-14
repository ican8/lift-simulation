// create lift
let lift = document.createElement("div");
lift.className = "lift";
lift.id = "lift";
let left_door = document.createElement("div");
let right_door = document.createElement("div");
left_door.classList.add("door","door-left")
right_door.classList.add("door","door-right")
lift.appendChild(left_door)
lift.appendChild(right_door)

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

function closeDoor(){
  // console.log('START CLOSE DOOR ANIMATION!')
  let left_door = document.getElementsByClassName('door-left')[0];
  let right_door = document.getElementsByClassName('door-right')[0];
  left_door.style.transform = `translateX(0)`;
  right_door.style.transform = `translateX(0)`;
  left_door.style.transition = `all 2.5s ease-out`;
  right_door.style.transition = `all 2.5s ease-out`;
}

function doorAnimation(){
  lift.removeEventListener('webkitTransitionEnd',doorAnimation)
  // console.log('START DOOR ANIMATION!')
  let left_door = document.getElementsByClassName('door-left')[0];
  let right_door = document.getElementsByClassName('door-right')[0];
  right_door.addEventListener('webkitTransitionEnd',closeDoor)
  left_door.style.transform = `translateX(-100%)`;
  right_door.style.transform = `translateX(100%)`;
  left_door.style.transition = `all 2.5s ease-out`;
  right_door.style.transition = `all 2.5s ease-out`;
  
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
  // let right_door = document.getElementsByClassName('door-right')[0];
  lift.addEventListener('webkitTransitionEnd',doorAnimation)
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

let input = document.getElementById("input");
let no_of_floors;

function make_floors() {
  container.innerHTML = "";
  no_of_floors = input.value;
  for (let i = 1; i <= no_of_floors; i++) {
    createFloor(i);
  }
  lift.style.transform = null
  lift.style.transitionDuration = null
  // set initial position of lift
  console.log(lift);
  let first_floor = document.getElementById("floor1");
  console.log(first_floor);
  first_floor.insertBefore(
    lift,
    first_floor.childNodes[first_floor.childNodes.length - 1]
  );
  // set up buttons to listen for click event
  getButtons()
}

let input_btn = document.getElementById("input-btn");

input_btn.addEventListener("click", make_floors);
