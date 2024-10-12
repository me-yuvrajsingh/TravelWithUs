let explr = document.querySelectorAll(".explr-txt")
let seasons = document.querySelectorAll(".seasons");
// let hotelsList = document.querySelectorAll(".hotels-list")

seasons.forEach((elem)=>{
    elem.onclick=()=>{
        seasons.forEach((elem)=>{
            elem.classList.remove("active")
        })
        elem.classList.add("active")
    }
})


// stays here 
console.log("reach")
explr.forEach((elem)=>{elem.onclick=(e)=>{
    console.log("reach")
    let hotelsList = e.target.parentElement.parentElement.parentElement.parentElement.children[1]
    let angleDown = e.target.children[0];
    if(hotelsList.classList.contains("hotels-list-visible") == true){ 
        hotelsList.classList.remove("hotels-list-visible") 
        angleDown.style.transform="rotate(0deg)"
        setTimeout(() => {
            hotelsList.style.display="none"
        }, 100);
    }else{ 
        hotelsList.style.display="flex"
        angleDown.style.transform="rotate(180deg)"
        setTimeout(() => {
            hotelsList.classList.add("hotels-list-visible") 
        }, 50);
    }
}
})

function moveUnderline(elem){
    // Remove active class from all items
    document.querySelectorAll('.sn-li').forEach(li => li.classList.remove('active'));
        
    // Add active class to clicked item
    elem.classList.add('active');
    
    // Move the underline
    const underline = document.querySelector('.underline');
    underline.style.width = `${elem.offsetWidth}px`;
    underline.style.left = `${elem.offsetLeft}px`;
}

document.querySelectorAll('.sn-li').forEach(item => {
    item.addEventListener('click', function() {
        moveUnderline(this)
    });
});

// Initialize underline position
const firstActive = document.querySelector('.sn-li.active') || document.querySelector('.sn-li');
if (firstActive) {
    const underline = document.createElement('div');
    underline.classList.add('underline');
    document.querySelector('.sub-nav').appendChild(underline);
    underline.style.width = `${firstActive.offsetWidth}px`;
    underline.style.left = `${firstActive.offsetLeft}px`;
}

window.onscroll=()=>{
    let active=false;
    const underline = document.querySelector('.underline');
    document.querySelector(".switch-theme").classList.add("animate__fadeOutDownBig")
    document.querySelectorAll(".dc-conts").forEach((elem)=>{
        document.querySelector(`a[href='#${elem.id}']`).classList.remove("active")
        if(elem.getBoundingClientRect().top < 116 && elem.getBoundingClientRect().bottom > 116){
            if(elem.id!=''){
                document.querySelector(`a[href='#${elem.id}']`).classList.add("active")
            }
            active=true
            underline.style.width = `${document.querySelector(`a[href='#${elem.id}']`).offsetWidth}px`;
            underline.style.left = `${document.querySelector(`a[href='#${elem.id}']`).offsetLeft}px`;
        }
    })
    if(!active){
        console.log("none")
        underline.style.width=0;
    }
}

window.onscrollend=()=>{
    document.querySelector(".switch-theme").classList.remove("animate__fadeOutDownBig")
}

let elem;
let switchTheme = document.querySelector(".switch-theme");
switchTheme.onclick=(e)=>{
    switchTheme.children[0].style.transform='rotate(250deg)';
    // switchTheme.children[0].style.opacity='0';
    setTimeout(() => {
        if(switchTheme.children[0].classList.contains("fa-moon")){
        switchTheme.children[0].classList.remove("fa-moon")
        switchTheme.children[0].classList.add("fa-sun")
        document.querySelectorAll(".d-elem").forEach((elem)=>{
            elem.classList.add("dark")
        })
    }else{
        switchTheme.children[0].classList.remove("fa-sun")
        switchTheme.children[0].classList.add("fa-moon")
        document.querySelectorAll(".d-elem").forEach((elem)=>{
            elem.classList.remove("dark")
        })
        }
        // switchTheme.children[0].style.opacity='1';
        setTimeout(() => {
            switchTheme.children[0].style.transform='rotate(360deg)';
        }, 100);
    }, 100);
    switchTheme.children[0].style.transform='rotate(0deg)';

    elem=e.target;
}