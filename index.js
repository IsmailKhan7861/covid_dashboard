//TOTAL WORLD DATA
//COMPARE WITH

let totalCases = document.getElementById("total-cases");
let totalRecovered = document.getElementById("total-recovered");
let totalActive = document.getElementById("total-active");
let totalDeaths = document.getElementById("total-deaths");
let nan = document.getElementById("nan");

//1.Total Cases fetch call and data addtion
async function totalData() {
  // let url = "https://api.rootnet.in/covid19-in/stats/latest";
  let url = "https://disease.sh/v3/covid-19/all";
  const data = await fetch(url);
  const jsonData = await data.json();

  fillData(jsonData);
}
//adding elements
const fillData = (jsonData) => {
  totalCases.textContent = jsonData.cases;
  totalDeaths.textContent = jsonData.deaths;
  totalRecovered.textContent = jsonData.recovered;
  totalActive.textContent = jsonData.active;
  nan.textContent =
    Math.floor((totalRecovered.textContent / totalCases.textContent) * 100) +
    "%";
};
totalData();

//2.countrywise fetch data
let table = document.getElementById("table1");

async function getCountryData() {
  const url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  let data = await fetch(url);
  let jsonData = await data.json();
  console.log(jsonData);

  addElements(jsonData);
}

// COUNTRYWISE ELEMENT ADD
function addElements(jsonData) {
  for (let i = 0; i <= jsonData.length; i++) {
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    let textNode1 = document.createTextNode(jsonData[i].country);
    let textNode2 = document.createTextNode(jsonData[i].cases);
    let textNode3 = document.createTextNode(jsonData[i].active);
    let textNode4 = document.createTextNode(jsonData[i].recovered);
    let textNode5 = document.createTextNode(jsonData[i].deaths);

    td1.appendChild(textNode1);
    td2.appendChild(textNode2);
    td3.appendChild(textNode3);
    td4.appendChild(textNode4);
    td5.appendChild(textNode5);

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    table.appendChild(trow);
    td1.style.fontWeight = "bold";
    td2.classList.add("total-cases");
    td3.classList.add("total-active");
    td4.classList.add("total-recovered");
    td5.classList.add("total-deaths");
  }
}

getCountryData();
//Twiiter
//map for country wise
//affected areas

///TESTING CHART
