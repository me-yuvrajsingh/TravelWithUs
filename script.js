let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let signupForm = document.querySelector('.signup-form');
let formClose = document.querySelectorAll('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
const package_details_card = document.querySelectorAll(".package_details_card")
const box_container = document.querySelector(".box-container")

//base api url
const BASE_URL = "http://localhost:8000"

//register 
const fullname = document.querySelector(".fullname");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirm_password = document.querySelector(".confirm_password");
const signup_button = document.querySelector(".signup_btn");

//login
const lemail = document.querySelector(".lemail");
const lpassword = document.querySelector(".lpassword");
const login_button = document.querySelector(".login_btn")

//book now
const whereto = document.querySelector(".whereto");
const howmany = document.querySelector(".howmany");
const arrival = document.querySelector(".arrival");
const leaving = document.querySelector(".leaving");
const booknow_button = document.querySelector(".booknow_btn");

//contact 
const contact_name = document.querySelector(".contact_name");
const contact_email = document.querySelector(".contact_email");
const contact_phone = document.querySelector(".contact_phone");
const contact_subject = document.querySelector(".contact_subject");
const contact_message = document.querySelector(".contact_message");
const contact_button = document.querySelector(".contact_btn")


//functionality for register
signup_button.addEventListener("click",(event) => {
    event.preventDefault();
    const userData = {
      fullname : fullname.value,
      username : username.value,
      email : email.value,
      password : password.value,
      confirm_password : password.value
    }

    axios.post(`${BASE_URL}/api/register`,userData)
    .then(({data}) => {
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
      fullname.value = "";
      username.value = "";
      email.value = "";
      password.value = "";
      confirm_password.value = "";
      openLoginForm();
    })

    
})

//functionality for login
login_button.addEventListener("click",(event) => {
    event.preventDefault();
    const userData = {
      email : lemail.value,
      password : lpassword.value
    }

    axios.post(`${BASE_URL}/api/login`,userData)
    .then(({data}) => {
      localStorage.setItem("user",JSON.stringify(data))
    })
    .catch((err) => console.log(err))
    .finally(() => {
      email.value = "";
      password.value = "";
      signupForm.classList.remove("active");
      loginForm.classList.remove("active");
      isLogout();
    })
})

//functionality for booknow
booknow_button.addEventListener("click",(event) => {
  event.preventDefault();

  const user = localStorage.getItem("user");
  const time = Date().split(" ")[4]

  

  if(!user){
    openLoginForm();
  }else{
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

    // console.log(userData)
  }
})

//functionality for contact
contact_button.addEventListener("click",(event)  => {
  event.preventDefault();
  const user = localStorage.getItem("user");
  
  
  if(!user){
    openLoginForm();
  }else{
    const userData = {
      userid : JSON.parse(user).id,
      name : contact_name.value,
      email : contact_email.value,
      phone_no : contact_phone.value,
      subject : contact_subject.value,
      message : contact_message.value
    }

    axios.post(`${BASE_URL}/api/contact`,userData)
    .then(({data}) => console.log(data))
    .catch((err) => console.log(err))
    .finally(() => {
      contact_name.value = "";
      contact_email.value = "";
      contact_phone.value = "";
      contact_subject.value = "";
      contact_message.value = "";
    })
  } 

})

//functionality for package details
package_details_card.forEach((item) => {
  const a = document.createElement("a");
  // a.href = "/package_details.html"

  item.addEventListener("click",() => {
    const city = item.ariaValueText;  
    localStorage.setItem("city_id",city)
    // a.click();
  })
})

function isLogout(){
  const user = localStorage.getItem("user");
  if(user){
    formBtn.classList.remove("fas")
    formBtn.classList.remove("fa-user")
    formBtn.classList.add("fa-solid")
    formBtn.classList.add("fa-arrow-right-from-bracket")
  }else{
    formBtn.classList.remove("fa-solid")
    formBtn.classList.remove("fa-arrow-right-from-bracket")
    formBtn.classList.add("fas")
    formBtn.classList.add("fa-user")
  }
}

isLogout();


function openSignupForm(){
  console.log("cakked")
  loginForm.classList.remove("active")
  signupForm.classList.add("active")
}
function openLoginForm(){
  signupForm.classList.remove("active")
  loginForm.classList.add("active")
}

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    const user = localStorage.getItem("user");
    if(!user){
      loginForm.classList.add('active');
    }else{
      localStorage.removeItem("user");
      setTimeout(() => {
          isLogout();
      },1000)
    }
});

formClose.forEach(elem=>{
      elem.addEventListener('click', () =>{
      loginForm.classList.remove('active');
      signupForm.classList.remove('active');
  })
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});