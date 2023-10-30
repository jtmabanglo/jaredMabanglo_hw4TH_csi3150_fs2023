const carCardsContainer = document.querySelector("#carCardsContainer");
// for filtered results of usedCars array
let usedCarsF = usedCars;

function displayCards() {
  // for making car cards dynamically
  // for adding html elements: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
  //   how to put js variables inside html code: https://stackoverflow.com/questions/30035932/how-do-i-use-this-javascript-variable-in-html
  for (let i = 0; i < usedCarsF.length; i++) {
    carCardsContainer.insertAdjacentHTML(
      "beforeend",
      "<div class='card'> <img src='" +
        usedCarsF[i].src +
        "' alt='" +
        usedCarsF[i].make +
        " " +
        usedCarsF[i].model +
        " Picture' class='carCardPic' /> <h1>" +
        usedCarsF[i].year +
        " " +
        usedCarsF[i].make +
        " " +
        usedCarsF[i].model +
        " </h1> <p class='price'>$" +
        usedCarsF[i].price +
        "</p> <p>" +
        usedCarsF[i].mileage +
        " mi.</p> <p> <button class='fullInfoButton' id=Car" +
        i +
        "Button >FULL INFO</button> </p> <div class='moreInfoCard' id='moreICar" +
        i +
        "'> <h1>" +
        usedCarsF[i].year +
        "</h1> <h2>" +
        usedCarsF[i].make +
        " " +
        usedCarsF[i].model +
        "</h2> <p class='morePrice'>$" +
        usedCarsF[i].price +
        "</p> <p class='moreInfoTitle'>Color:</p> <p class='moreInfoText'>" +
        usedCarsF[i].color +
        "</p> <p class='moreInfoTitle'>Gas Mileage:</p> <p class='moreInfoText'>" +
        usedCarsF[i].gasMileage +
        "</p> <button class='closeButton'id=Car" +
        i +
        "CloseButton'><i class='fa-solid fa-x'></i></button </div> </div> "
    );
  }

  // query selector all source and nodelist info: https://www.w3schools.com/jsref/met_document_queryselectorall.asp
  // https://www.w3schools.com/jsref/dom_obj_html_nodelist.asp
  const fullInfoButtonList = document.querySelectorAll(".fullInfoButton");
  const moreInfoCardsList = document.querySelectorAll(".moreInfoCard");

  // to assign event listener to all Find More Buttons
  for (let j = 0; j < usedCarsF.length; j++) {
    fullInfoButtonList[j].addEventListener("click", (e) => {
      moreInfoCardsList[j].style.display = "block";
    });
  }

  const closeButtonList = document.querySelectorAll(".closeButton");

  // to assign event listener to all close Buttons
  for (let j = 0; j < usedCarsF.length; j++) {
    closeButtonList[j].addEventListener("click", (e) => {
      moreInfoCardsList[j].style.display = "none";
    });
  }

  // for error message when no cars match
  if (usedCarsF.length == 0) {
    carCardsContainer.style.display = "flex";
    carCardsContainer.style.width = "100%";
    carCardsContainer.style.alignItems = "center";
    carCardsContainer.style.justifyContent = "center";
    carCardsContainer.style.textAlign = "center";
    carCardsContainer.insertAdjacentHTML(
      "beforeend",
      "<p id='error'>No cars match your search. <br />Please try again.</p>"
    );
  }

  // to put back original styling after a no match search
  if (usedCarsF.length >= 1) {
    carCardsContainer.style.display = "grid";
    carCardsContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
  }

  console.log("cards displayed");
}

function clearCards() {
  carCardsContainer.innerHTML = "";
  console.log("cards cleared");
}

// diplsay cards on initial pageload
displayCards();

addEventListener("input", (e) => {
  // string to number in js: https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l
  let selectMinYear = Number(document.getElementById("minYear").value);
  let selectMaxYear = Number(document.getElementById("maxYear").value);
  let selectMileage = Number(document.getElementById("maxMileage").value);
  let selectMake = document.querySelectorAll(".make");
  let selectColor = document.querySelectorAll(".color");
  // filter method: https://www.w3schools.com/jsref/jsref_filter.asp
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  usedCarsF = usedCars.filter((car, i, carArray) => {
    // for filtering by year and Mileage
    if (
      car.year >= selectMinYear &&
      car.year <= selectMaxYear &&
      car.mileage < selectMileage
    ) {
      // for filtering by Make
      for (let j = 0; j < selectMake.length; j++) {
        if (selectMake[j].checked) {
          if (selectMake[j].value === car.make) {
            // for filtering by color
            for (let k = 0; k < selectColor.length; k++) {
              if (
                selectColor[k].checked &&
                selectColor[k].value === car.color
              ) {
                return true;
              }
            }
          }
        }
      }
    } else {
      return false;
    }
  });
  console.log(usedCarsF);
  clearCards();
  displayCards();
});

// const checkMakeB = document.querySelector("#checkAllMake");
// const uncheckMakeB = document.querySelector("#uncheckAllMake");
// const checkColorB = document.querySelector("#checkAllColor");
// const uncheckColorB = document.querySelector("#uncheckAllColor");

// checkMakeB.addEventListener("click", (e) => {
//   for (let k = 0; k < selectMake.length; k++) {
//     selectMake[k].checked == true;
//   }
// });

// uncheckMakeB.addEventListener("click", (e) => {
//   for (let k = 0; k < selectMake.length; k++) {
//     selectMake[k].checked == false;
//   }
// });

// checkColorB.addEventListener("click", (e) => {
//   for (let k = 0; k < selectColor.length; k++) {
//     selectColor[k].checked == true;
//   }
// });

// uncheckColorB.addEventListener("click", (e) => {
//   for (let k = 0; k < selectColor.length; k++) {
//     selectColor[k].checked == false;
//   }
// });
