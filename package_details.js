let explr = document.querySelectorAll(".explr-txt")
let seasons = document.querySelectorAll(".seasons");
// let hotelsList = document.querySelectorAll(".hotels-list")
const destination_name = document.querySelector(".destination-name");
const duration = document.querySelector(".duration");
const visit_to = document.querySelector(".to-visit");
const accomodation = document.querySelector(".accomodation");
const pricing = document.querySelector(".discount_price");
const actualPrice = document.querySelector(".actual_price");
const best_time = document.querySelector(".best_time");
const stays = document.querySelector(".stays");
const star = document.querySelector(".star");
const hotel_location = document.querySelectorAll(".hotel_location");


//base api url
const BASE_URL = "https://travel-app-backend-uoup.onrender.com"

//book now
const whereto = document.querySelector(".whereto");
const howmany = document.querySelector(".howmany");
const arrival = document.querySelector(".arrival");
const leaving = document.querySelector(".leaving");
const booknow_button = document.querySelector(".booknow_btn");

//function to get details
async function getDetails(){
    const city_id = localStorage.getItem("city_id")
    const {data} = await axios.get(`${BASE_URL}/api/package_details/${city_id}`)



    destination_name.innerText = data.place;
    duration.innerHTML = `Duration - ${data.duration}`;
    visit_to.innerHTML = `Visiting Places - ${data.visiting_places}`;
    accomodation.innerHTML = `Accomodations - ${data.accomodation}`;
    pricing.innerHTML = `Price - ₹${data.price}`;
    actualPrice.innerHTML = `₹${data.actual_price}`;
    best_time.innerText = `Best time to visit ${data.place}`;
    stays.innerText = `Stays in ${data.place}`

    hotel_location.forEach((hotel) => {
        hotel.innerText = data.place;
    })
    
    console.log(data)

}

getDetails();

//functionality for booknow
booknow_button.addEventListener("click",(event) => {
    event.preventDefault();
    
    const user = localStorage.getItem("user");
    const time = Date().split(" ")[4]
    
    if(user){
        const userData = {
            userid : JSON.parse(user).id,
            where_to : whereto.value,
            how_many : parseInt(howmany.value),
            arrival : new Date(`${arrival.value}T${time}Z`),
            leaving : new Date(leaving.value)
        }
        axios.post(`${BASE_URL}/api/booking`,userData)
        .then(({data}) => console.log(data))
        .catch((err) => console.log(err))
        .finally(() => {
            whereto.value = "";
            howmany.value = "";
            arrival.value = "";
            leaving.value = "";
        })
    }else{
        const anchorTag = document.createElement("a")
        anchorTag.href = "/"
        anchorTag.click();
    }
})

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
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    switchTheme.children[0].classList.add("fa-sun")
    switchTheme.children[0].classList.remove("fa-moon")
}else{
    switchTheme.children[0].classList.remove("fa-sun")
    switchTheme.children[0].classList.add("fa-moon")
}
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