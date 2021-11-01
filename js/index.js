let no_of_floors = 3
let lift = document.getElementById('lift')

function createFloor(floor_number){

    let container = document.getElementById('container');

    let new_div = document.createElement('div');
    new_div.className = "floor";
    new_div.id = floor_number;

    let new_up_btn = document.createElement('button')
    let up_text = document.createTextNode('Up')
    let new_down_btn = document.createElement('button')
    let down_text = document.createTextNode('Down')
    let new_br = document.createElement('br')
    let new_hr = document.createElement('hr')
    let new_span = document.createElement('span')
    let new_floor_text = document.createTextNode('Floor ' + floor_number)
    new_span.appendChild(new_floor_text)
    new_span.className = 'floor-text'
    new_up_btn.classList.add('btn','up'); 
    new_down_btn.classList.add('btn','down'); 

    new_up_btn.appendChild(up_text)
    new_up_btn.id = floor_number;
    new_down_btn.appendChild(down_text)
    new_down_btn.id = floor_number

    new_div.appendChild(new_up_btn)
    new_div.appendChild(new_br)
    new_div.appendChild(new_down_btn)
    new_div.appendChild(new_span)
    new_div.appendChild(new_hr)

    container.insertBefore(new_div,container.childNodes[0]);

}


for(let i = 1; i <= no_of_floors; i++){
    createFloor(i);
}

function moveLift(e){
    // lift.style.bottom = 70 + e.target.id * 100 + "px" ;
    console.log(e.target.id, ' clicked btn ',lift.style.bottom)  
    console.log(e.target.getBoundingClientRect()); 
}

let up_btn_list = document.getElementsByClassName('up')
let down_btn_list = document.getElementsByClassName('down')
let upBtn;
for ( up_btn of up_btn_list){
    up_btn.addEventListener('click',moveLift)
}

let downBtn;
for ( down_btn of down_btn_list){
    down_btn.addEventListener('click',moveLift)
}