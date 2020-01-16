const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');


    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }     
        });

        burger.classList.toggle('toggle');
    });
}
navSlide();



let css = document.getElementById("text-font");
let color = document.getElementsByClassName("customize-font-button")[0];
let p = document.getElementsByTagName("p");
let imageArray = document.getElementsByClassName("image");


color.addEventListener("input", () => {
    Array.from(p).forEach(element => {
        element.style.color = color.value;
    } )
});

const minRadioButtons = 3, maxRadioButtons = 4;
let buttonNumbers = 3;
let button = document.getElementById("enter");
let input = document.getElementById("enter-box");
let enterBoxStyle = window.getComputedStyle(input);
let radioContainer = document.getElementById("radio-container");

let enterContainer = document.getElementById("enter-container");

button.addEventListener("click", () => {
    if (buttonNumbers < 4) {
        buttonNumbers +=1;
        let radioInput = document.createElement("input");
        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("name", "box-buttons");
        radioInput.setAttribute("value", input.value);
        radioInput.setAttribute("id", "radio-b4");

        let label = document.createElement("label");
        label.setAttribute("for", "radio-b4");
        label.setAttribute("class", "radio-font");
        let radioText = document.createTextNode(input.value);

        label.appendChild(radioText);

        radioContainer.appendChild(label);
        radioContainer.appendChild(radioInput)

        let buttonRemove = document.createElement("button");
        buttonRemove.setAttribute("class", "signup-btn");
        buttonRemove.setAttribute("id", "enter");

        let textButton = document.createTextNode("Remove");
        buttonRemove.appendChild(textButton);
        enterContainer.appendChild(buttonRemove);

        let intervalID = setInterval( () => {
            if (buttonNumbers == 4) {
                let rm = document.getElementsByClassName("signup-btn")[1];
                let radioB4 = document.getElementById("radio-b4");

                radioB4.addEventListener('change', checkBox);
                clearInterval(intervalID);
                rm.addEventListener('click', () => {
                    buttonNumbers -= 1;
                    rm.parentNode.removeChild(rm.parentNode.lastChild);
                    radioContainer.removeChild(radioContainer.lastChild);
                    radioContainer.removeChild(radioContainer.lastChild); 
                    Array.from(p).forEach(element => {
                        element.style.fontFamily = "";
                    })   
                })


            }
        }, 100);
    }
    input.value = "";
});
let radioB1 = document.getElementById("radio-b1");
let radioB2 = document.getElementById("radio-b2");
let radioB3 = document.getElementById("radio-b3");
let checkBox = evt => {

    Array.from(p).forEach(element => {
        element.style.fontFamily = evt.target.value;
    })
    
}
radioB1.addEventListener('change', checkBox);
radioB2.addEventListener('change', checkBox);
radioB3.addEventListener('change', checkBox);
;

  
function updateClock() {
    let now = new Date()
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let hours, minutes, seconds;
        if (now.getHours() < 10) {
            hours = '0' + now.getHours();
        }
        else {
            hours = now.getHours(); 
        }
        if (now.getMinutes() < 10) {
            minutes = '0' + now.getMinutes();
        }
        else {
            minutes = now.getMinutes();
        }
        if (now.getSeconds() < 10) {
            seconds = '0' + now.getSeconds();
        }
        else {
            seconds = now.getSeconds();
        }
        time = hours + ':' + minutes + ':' + seconds;
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');

    document.getElementById('datetime').innerHTML = [date, time].join(' / ');

    setTimeout(updateClock, 1000);
}
updateClock();
document.getElementById("result").innerHTML = localStorage.getItem("NumbersOfClicks");
let changePhotoButton = document.querySelector('.change-background');
changePhotoFunction = () => {
    if (typeof(Storage) !== 'undefined') {
        if (localStorage.NumbersOfClicks) {
            localStorage.setItem('NumbersOfClicks', Number(localStorage.getItem('NumbersOfClicks')) + 1);       
        }
        else {
            localStorage.setItem('NumbersOfClicks', 1);
        }
        document.getElementById("result").innerHTML = localStorage.getItem("NumbersOfClicks");
    }
    let imageGallery = document.querySelectorAll('.image-gallery');
    let saveImage = imageGallery[2].getAttribute('src');
    for (let i = 2; i > 0; i--) {
        imageGallery[i].setAttribute('src', imageGallery[i - 1].getAttribute('src'));
    }
    imageGallery[0].setAttribute('src', saveImage);
}
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("POST", "demo_post.asp", true);
    xhttp.send();
}
