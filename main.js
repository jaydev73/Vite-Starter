import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import { renderTableRows } from './nutrition.js'
import { getDropdown } from './countries'
import  {getNumberOfGrades, sumOfGrades, averageGrades, passingGrades, failingGrades, raisedGrades} from "./classrooms"
import FetchWrapper from "./fetch-wrapper"
import { getVotersCount } from './stats'
import {confetti} from 'dom-confetti'


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://create-new-app-fadab-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    confetti(addButtonEl)
    
    push(shoppingListInDB, inputValue)
    
    clearInputEl()
})

onValue(shoppingListInDB, function(snapshot) {    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        shoppingListEl.innerHTML = ""
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            appendItemToShoppingListEl(currentItem)
        } 
    } else {
        shoppingListEl.innerHTML = "No items in list... yet"
    }
})

function clearInputEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}
// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
  
// `

// function for render Nutrition Table
const data = [["carbs", "12g"], ["protein", "14g"],["fat", "15g"]]
const html = renderTableRows(data);


const tbody = document.querySelector("#nutrition-table tbody");

tbody.insertAdjacentHTML("beforeend", html);

// function for countries dropdown
const countries = ["Amsterdam", "Berlin"]
const select = document.querySelector("#countries-dropdown")
const cityName = document.querySelector("#city-name")
const count = document.querySelector("#count")
select.innerHTML = getDropdown(countries)
select.addEventListener("change", () => {
  if (!select.value) {
    return false
  }else {
  //   fetch(`https://jsdemo-3f387-default-rtdb.europe-west1.firebasedatabase.app/city-stats/${select.value}.json`, {
  //     method: "GET"
  //   })
  //   .then(response => {
  //     if(!response.ok){
  //     throw new Error("API issues.");
  //   }
  //     return response.json();
  // })
    const API = new FetchWrapper("https://jsdemo-3f387-default-rtdb.europe-west1.firebasedatabase.app")
    API.get(`/city-stats/${select.value}.json`)
    .then(data => {
      console.log(data)
      cityName.textContent = select.options[select.selectedIndex].textContent
      count.textContent = getVotersCount(data)
    })
    .catch(error => console.error(error))
  }
})
// classroom function grades
const grades = [14, 15, 16]
const form = document.querySelector("#grades-form")
const yourGrade = document.querySelector("#your-grade")
const saveGrade = grade => {
  fetch("https://api.learnjavascript.online/demo/grades.json", {
   method : "put",
   body: JSON.stringify({
    grade: grade
   }) 
  }).then(response => response.json()).then(data => {
    console.log(data.grade)
  })
}

const renderStatsTable1 = (grades) => {
  const tbody = document.querySelector("#stats-table1 tbody")
  tbody.innerHTML = `<tr>
    <td>${getNumberOfGrades(grades)}</td>
    <td>${sumOfGrades(grades)}</td>
    <td>${averageGrades(grades)}</td>
  </tr>
  `
}
const renderStatsTable2 = (grades) => {
  const tbody = document.querySelector("#stats-table2 tbody")
  tbody.innerHTML = `<tr>
    <td>${passingGrades(grades)}</td>
    <td>${failingGrades(grades)}</td>
    <td>${raisedGrades(grades)}</td>
  </tr>
  `
}

const render = (grades) => {
    renderStatsTable1(grades)
    renderStatsTable2(grades)
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newGrade = Number.parseInt(yourGrade.value, 10)
  grades.push(newGrade)
  yourGrade.value = ""
  render(grades)
  console.log(saveGrade(yourGrade.value))
})
render(grades)


// setupCounter(document.querySelector('#counter'))
