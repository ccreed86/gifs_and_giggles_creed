const gifContainer = document.querySelector("#gifContainer");

const gigglesContainer = document.querySelector("#gigglesContainer");

const dropdownButton= document.querySelector('#submitButton');

const initModal = document.querySelector("#intModal");

const dropdownList=document.querySelector('.dropdown');

const modal = document.querySelector(".modal");

const htmlBody = document.querySelector("#htmlBody")

// Gif button selector
const gifSwitcher = document.querySelector("#gifSwitcher");

// below the theme selector and the variables
const themeSwitcher = document.querySelector("#themeSwitcher");

const container = document.querySelector(".container");

const mainBody = document.querySelector("#mainBody");

const imageGif = document.querySelector(".imgGif");

const gifName = document.querySelector("#giphyName");

const gifTitle = document.querySelector("#gifTitleNEmoji");

const gigglesTitle = document.querySelector("#gigglesTitleNEmoji");

const initDescription = document.querySelector("#initDescription");

// GitHub Buttons section
const gitHubButtons = document.querySelector("#gitHubButtons");

const cliffButton = document.querySelector("#cliffButton");

const erikButton = document.querySelector("#erikButton");

const pauleeButton = document.querySelector("#pauleeButton");

const reynButton = document.querySelector("#reynButton");
// Buttons End

let mode = "dark";

let modeType;

let themeStorage;

saveTheme();

// if there`s no gif displaying it hides the button to new gif
if(!imageGif){

  gifSwitcher.style.display = "none";

  gifName.style.display = "none";

  gigglesTitle.style.display = "none";

  gifTitle.style.display = "none";

  initDescription.style.display = "block";

  gitHubButtons.style.display = "block";

}

// Finish here the theme settings
const gifyKeyR = ['fNQfgqsi1G5OnBPBlie4e1lN3wVCBTTk', '9tWD3JSotxpdhYNXTURQMtKldzGKZt2t', "jndGrbHB8UNfs39YHeJrJxvGYGulBx2p", "dV41RjkIQ6RJa2Max5a1rGtLNk4c43Hw"];

dropdownButton.addEventListener('click', function(event){ //fx for submit button in modal

  event.preventDefault();

  event.stopPropagation();

  let category=dropdownList.value

  fetchData(category) //calls fetchdata fx and passes on the category input

  // it close the modal when the user finish choosing the category
  modal.classList.remove('is-active');

})

document.querySelector('.button')

document.addEventListener('DOMContentLoaded', () => {

    // Functions to open and close a modal

    function openModal($el) {

      $el.classList.add('is-active');

    }
  
    function closeModal($el) {

      $el.classList.remove('is-active');

    }
  
    function closeAllModals() {

      (document.querySelectorAll('.modal') || []).forEach(($modal) => {

        closeModal($modal);

      });

    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {

      const modal = $trigger.dataset.target;

      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {

        openModal($target);

      });

    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {

      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {

        closeModal($target);

      });

    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {

      if(event.key === "Escape") {

        closeAllModals();

      }

    });

  });

async function fetchData(category) { ///fetches api data and stores it in local

    try {
        // below just a random index to get different key for the gify(it have a low rate limit so we got 4 differents keys to keep using)
        let keyIndex = Math.floor(Math.random() * 4);

        // below its the random key variable
        const gifyKey = gifyKeyR[keyIndex];
        
        let jokeUrl=`https://v2.jokeapi.dev/joke/${category}?format=json?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
        
        let gifyUrl= `https://api.giphy.com/v1/gifs/search?api_key=${gifyKey}&q=${category}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`

        const jokeResponse = await fetch(jokeUrl); // Fetching data from the joke API

        const jokeData = await jokeResponse.json();

        localStorage.setItem("joke", JSON.stringify(jokeData));

        console.log("--------- joke request --------");

        console.log(jokeData);

        const gifResponse = await fetch(gifyUrl); // Fetching data from the GIF API

        const gifData = await gifResponse.json();

        localStorage.setItem("gif", JSON.stringify(gifData));

        console.log("--------- gif request --------");

        console.log(gifData);

    } catch (error) {

        console.error("Error fetching data:", error);
        
    }  jokeSetup();

}

// below we have the joke function that will create the container and append to our gif and giggles containers
    function jokeSetup(){

        const jokeContainer = document.createElement("div");

        jokeContainer.className = "divGiggles";

        const jokeSetup = document.createElement("p");

        jokeSetup.className = "jokeSetup"

        const jokeDelivery = document.createElement("p");

        jokeDelivery.className = "jokeDelivery"
    
        const jokeInfo = JSON.parse(localStorage.getItem("joke"));

        if(jokeInfo.type === "twopart"){

        jokeSetup.textContent = jokeInfo.setup;

        jokeDelivery.textContent = jokeInfo.delivery;

        jokeContainer.appendChild(jokeSetup);

        setTimeout(()=> {
          jokeContainer.appendChild(jokeDelivery);//delays the delivery of the 2 part joke for 3 seconds
        }
        ,3000);
        
       
        // jokeContainer.appendChild(jokeDelivery);

    }else {

        jokeSetup.textContent = jokeInfo.joke;

        jokeContainer.appendChild(jokeSetup);

    }

    gigglesContainer.appendChild(jokeContainer);

    gifSetup();
}


    function gifSetup(){ //fx to get a random gif from the associated category

        let count = Math.floor(Math.random() * 49);

        const gifSetup = document.createElement("img");

        gifSetup.className = "imgGif";

        const gifInfo = JSON.parse(localStorage.getItem("gif"));

        gifSetup.src = gifInfo.data[count].images.original.url;

        gifContainer.appendChild(gifSetup);

        gifSwitcher.style.display = "block";

        gifName.style.display = "block";

        gigglesTitle.style.display = "block";

        gifTitle.style.display = "block";

        initDescription.style.display = "none";

        gitHubButtons.style.display = "none";

    }

    // and function that will initialize the modal when the user click the button
    initModal.addEventListener("click", function(event){

      event.preventDefault();
      
      // below set the modal active to open
      modal.classList.add('is-active');

      // two loops to clean the html from the previous choice, that way the user always see a new joke and gif
      if(gifContainer.hasChildNodes()){
        
        const gifContainerImg = document.querySelector(".imgGif");

        if(gifContainerImg){

        gifContainer.removeChild(gifContainerImg);
        
        // below its an config that hides the button for a new gif when it removes the gif
        gifSwitcher.style.display = "none";

        gifName.style.display = "none";

        gigglesTitle.style.display = "none";

        gifTitle.style.display = "none";

        initDescription.style.display = "block";

        gitHubButtons.style.display = "block";

      }

      }

      if(gigglesContainer.hasChildNodes()){

        const gigglesContainerP = document.querySelector(".divGiggles");

        if(gigglesContainerP){

        gigglesContainer.removeChild(gigglesContainerP);

      }

      }
        
    })

    // Below Function to save the theme and check if exist
    function saveTheme() {

      if(localStorage.getItem("theme")  === null){

        themeStorage = localStorage.setItem("theme", "dark");

        mainBody.className = "column has-background-black";

        htmlBody.className = "has-background-black";

        themeSwitcher.textContent = "🤣";

      } 
        themeStorage = localStorage.getItem("theme", modeType);

        if (themeStorage === "dark"){

          mainBody.className = "column has-text-warning is-size-3 has-background-black";

          htmlBody.className = "has-background-black";

          themeSwitcher.textContent = "🤣";

        }else{

          mainBody.className = "column has-text-warning is-size-3 has-background-white";

          htmlBody.className = "has-background-white";

          themeSwitcher.textContent = "😂";

        }

        container.setAttribute("class", themeStorage);

      }

    // Theme Switcher button
    themeSwitcher.addEventListener("click", function() {

      console.log(mode);

      if (mode === "dark") {

        mode = "light"

        localStorage.setItem("theme", "light");

        mainBody.className = "column has-text-warning is-size-3 has-background-white";

        htmlBody.className = "has-background-white";

        themeSwitcher.textContent = "😂";

      }else {

        mode = "dark"

        localStorage.setItem("theme", "dark");

        mainBody.className = "column has-text-warning is-size-3 has-background-black";

        htmlBody.className = "has-background-black";

        themeSwitcher.textContent = "🤣";

      }

      modeType = mode;

      saveTheme();

    });

    // Function that allows the user to change the gif if they want
    gifSwitcher.addEventListener("click", function(event){

      event.preventDefault();

      let randomGif = Math.floor(Math.random() * 49);

      const gifInfo = JSON.parse(localStorage.getItem("gif"));

      document.querySelector(".imgGif").src = gifInfo.data[randomGif].images.original.url;

    })


    
    cliffButton.addEventListener("click", function(event){

      event.preventDefault();

      window.open("https://github.com/ccreed86");

    })
    erikButton.addEventListener("click", function(event){
      
      event.preventDefault();

      window.open("https://github.com/Erikrainer");

    })
    pauleeButton.addEventListener("click", function(event){
      
      event.preventDefault();

      window.open("https://github.com/Pauleerama93");

    })
    reynButton.addEventListener("click", function(event){
      
      event.preventDefault();

      window.open("https://github.com/RTAKA808");

    })
   
document.querySelector("#reloadButton").addEventListener('click', function(event){

  event.preventDefault()

  location.reload();
})