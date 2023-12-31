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
    td1.classList.add("table-row");
    td1.classList.add("td-left");
    td2.appendChild(textNode2);
    td2.classList.add("table-row");
    td2.classList.add("td-right");
    td3.appendChild(textNode3);
    td3.classList.add("table-row");
    td3.classList.add("td-right");
    td4.appendChild(textNode4);
    td4.classList.add("table-row");
    td4.classList.add("td-right");
    td5.appendChild(textNode5);
    td5.classList.add("table-row");
    td5.classList.add("td-right");
    td5.classList.add("td-right1");

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    table.appendChild(trow);
    trow.classList.add("table-row");
  }
}

getCountryData();
//Twiiter
//map for country wise
//affected areas

// CHART-------------------------------------------------------
// const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const xValues = [];
///TESTING CHART
let confirmed = document.getElementById("confirmed");
let recovered = document.getElementById("recovered");
let deceased = document.getElementById("deceased");

//plotting
let dataPoints = [
  {
    // data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
    data: [],
    borderColor: "red",
    fill: false,
  },
  {
    // data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
    data: [],
    borderColor: "green",
    fill: false,
  },
  {
    // data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
    data: [],
    borderColor: "blue",
    fill: false,
  },
];

confirmed.addEventListener("click", function () {
  confirmed.classList.add("active");
  recovered.classList.remove("active");
  deceased.classList.remove("active");
  newChart(dataPoints, 0);
});

recovered.addEventListener("click", function () {
  confirmed.classList.remove("active");
  recovered.classList.add("active");
  deceased.classList.remove("active");
  newChart(dataPoints, 1);
});

deceased.addEventListener("click", function () {
  confirmed.classList.remove("active");
  recovered.classList.remove("active");
  deceased.classList.add("active");
  newChart(dataPoints, 2);
});

// FETCHING DATA
async function dataMap() {
  const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=30";
  const data = await fetch(url);
  const jsonData = await data.json();
  for (const i in jsonData.cases) {
    xValues.push(i);
    dataPoints[0].data.push(jsonData.cases[i]);
  }
  addData(jsonData.cases, 0);
  addData(jsonData.recovered, 1);
  addData(jsonData.deaths, 2);
}

dataMap();

//function for adding data in map
function addData(data, indexElem) {
  for (const i in data) {
    dataPoints[indexElem].data.push(data[i]);
  }
}

//Function for chart creation
function newChart(dataPoints, i) {
  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [dataPoints[i]],
    },
    options: {
      legend: { display: false },
    },
  });
}

newChart(dataPoints, 0);

//CREATE DUMMY NODE ITEMS AND
let tweeterContainer = document.getElementById("tweeter");
let twitterContainer = document.createElement("div");
twitterContainer.classList.add("twitter-container");

let titleData = document.createElement("div");
titleData.classList.add("title");

let username = document.createElement("h2");
username.classList.add("header");
let userText = document.createTextNode("World Health Organistion");

let decsription = document.createElement("p");
decsription.classList.add("twitter-container-para");
let decsriptionText = document.createTextNode("hello");

let icon1 = document.createElement("div");
icon1.classList.add("icons");

let like1 = document.createElement("div");
like1.classList.add("likes");

// let likeImage = document.createElement("i");
// likeImage.classList.add("fa-solid fa-thumbs-up fa-xl");

let likeCount = document.createElement("p");
likeCount.classList.add("likes");
let likeCountText = document.createTextNode("10");

let share1 = document.createElement("div");
share1.classList.add("shares");

let shareCount = document.createElement("p");
let shareCountText = document.createTextNode("10");

async function tweetData() {
  const url =
    "https://twitter154.p.rapidapi.com/search/search?query=covid&section=top&min_retweets=1&min_likes=500&limit=20&start_date=2022-11-01&language=en";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f8da45c009msh74293eeec542a1fp1e067ajsn208f5584d4eb",
      "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
    },
  };

  const data = await fetch(url, options);
  const jsonData = await data.json();
  console.log(jsonData.res);
  for (let i = 0; i < jsonData.results.length; i++) {
    let twitterContainerClone = twitterContainer.cloneNode(true);

    let titleDataClone = titleData.cloneNode(true);
    //username
    let usernameClone = username.cloneNode(true);
    let userTextClone = userText.cloneNode(true);
    userTextClone.data = jsonData.results[i].user.username;
    usernameClone.appendChild(userTextClone);
    titleDataClone.appendChild(usernameClone);
    twitterContainerClone.appendChild(titleDataClone);

    let decsriptionClone = decsription.cloneNode(true);
    let decsriptionTextClone = decsriptionText.cloneNode(true);
    //text
    decsriptionTextClone.data = jsonData.results[i].text;
    decsriptionClone.appendChild(decsriptionTextClone);
    twitterContainerClone.appendChild(decsriptionClone);

    let iconClone = icon1.cloneNode(true);
    let likeClone = like1.cloneNode(true);
    let shareClone = share1.cloneNode(true);

    let likeCountClone = likeCount.cloneNode(true);
    let shareCountClone = shareCount.cloneNode(true);

    let likeCountTextClone = likeCountText.cloneNode(true);
    let shareCountTextClone = shareCountText.cloneNode(true);

    likeCountTextClone.data = jsonData.results[i].favorite_count;
    shareCountTextClone.data = jsonData.results[i].retweet_count;

    likeCountClone.appendChild(likeCountTextClone);
    shareCountClone.appendChild(shareCountTextClone);
    likeClone.appendChild(likeCountClone);
    shareClone.appendChild(shareCountClone);

    iconClone.appendChild(likeClone);
    iconClone.appendChild(shareClone);
    twitterContainerClone.appendChild(iconClone);
    tweeterContainer.appendChild(twitterContainerClone);
  }
}
tweetData();

//news API
let mainContainer = document.getElementById("main");
let slideContainer = document.getElementById("slides-container");

let newsContainer = document.createElement("div");
newsContainer.classList.add("newsContainer");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

let newsHeader = document.createElement("h3");
let headerContent = document.createTextNode("hello");
newsHeader.classList.add("headlines");
let newsContent = document.createElement("p");
let contentText = document.createTextNode("hello");
newsContent.classList.add("text");
let image = document.createElement("img");
image.classList.add("image");

let newsLink = document.createElement("a");
newsLink.setAttribute("target", "_blank");
newsLink.classList.add("news-link");
let counter = 0;
//function
async function newsData() {
  const url =
    "https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=en&media=True";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f8da45c009msh74293eeec542a1fp1e067ajsn208f5584d4eb",
      "X-RapidAPI-Host": "covid-19-news.p.rapidapi.com",
    },
  };

  const data = await fetch(url, options);
  const jsonData = await data.json();
  console.log(jsonData.articles[0].media);

  for (let i = 0; i <= 10; i++) {
    var newsContainerClone = newsContainer.cloneNode(true);

    let newsHeaderClone = newsHeader.cloneNode(true);
    let newsContentClone = newsContent.cloneNode(true);

    newsContainerClone.classList.add("slides");

    let headerContentClone = headerContent.cloneNode(true);
    let contentTextClone = contentText.cloneNode(true);
    let imageClone = image.cloneNode(true);
    imageClone.src = jsonData.articles[i].media;

    let newsLinkClone = newsLink.cloneNode(true);
    newsLinkClone.href = jsonData.articles[i].link;
    headerContentClone.data = jsonData.articles[i].title;
    contentTextClone.data = jsonData.articles[i].summary;
    console.log(jsonData.articles[i].link);
    let linkContent = document.createTextNode(jsonData.articles[i].link);
    newsLinkClone.appendChild(linkContent);
    newsHeaderClone.appendChild(headerContentClone);
    newsContentClone.appendChild(contentTextClone);

    newsContainerClone.appendChild(newsHeaderClone);
    // newsContainerClone.appendChild(newsContentClone);
    newsContainerClone.appendChild(imageClone);
    newsContainerClone.appendChild(newsLinkClone);
    slideContainer.appendChild(newsContainerClone);

    nextButton.addEventListener("click", () => {
      const slideWidth = newsContainerClone.clientWidth;
      slideContainer.scrollLeft += slideWidth;
    });

    prevButton.addEventListener("click", () => {
      const slideWidth = newsContainerClone.clientWidth;
      slideContainer.scrollLeft -= slideWidth;
    });
  }
}
newsData();
