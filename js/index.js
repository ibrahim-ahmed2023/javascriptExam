let rowData = document.getElementById("row");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;

// appear mainLoading when document loading
$(document).ready(() => {
    searchByName("").then(() => {
        $(".mainLoading").fadeOut(500)
    })
})

// open side nav
function openSideNav() {
    $(".side-nav").animate({left: 0}, 500);
    $(".openAndClose").removeClass("fa-bars");
    $(".openAndClose").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

// close side nav
function closeSideNav() {
    let navWidth = $(".side-nav .nav-items").outerWidth();
    $(".side-nav").animate({left: -navWidth}, 500);
    $(".openAndClose").addClass("fa-bars");
    $(".openAndClose").removeClass("fa-x");
    $(".links li").animate({top: 300}, 500);
}

// before any thing i need side nav closed
closeSideNav();
// side nav events
$(".openAndClose").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeSideNav();
    } 
    else {
        openSideNav();
    }
})

// display meals 
function displayMeals(mealArray) {
    let displayMealContainer = "";
    for (let i = 0; i < mealArray.length; i++) {
        displayMealContainer += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${mealArray[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${mealArray[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${mealArray[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
        // console.log(displayMealContainer);
    }
    rowData.innerHTML = displayMealContainer;
}

// get category from api
async function getCategories() {
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    searchContainer.innerHTML = "";
    let categoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    // console.log(categoryResponse);
    categoryResponse = await categoryResponse.json();
    // console.log(categoryResponse);
    displayCategories(categoryResponse.categories);
    $(".innerLoading").fadeOut(300);

}

// display 20 meals from category
function displayCategories(mealArray) {
    let displayMealByCategory = "";
    for (let i = 0; i < mealArray.length; i++) {
        displayMealByCategory += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${mealArray[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${mealArray[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${mealArray[i].strCategory}</h3>
                        <p>${mealArray[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = displayMealByCategory;
}

// get areas from api
async function getArea() {
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    searchContainer.innerHTML = "";
    let areaRespone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    // console.log(areaRespone);
    areaRespone = await areaRespone.json();
    // console.log(areaRespone)
    displayArea(areaRespone.meals);
    $(".innerLoading").fadeOut(300);

}

// display areas
function displayArea(mealArray) {
    let displayMealByArea = "";
    for (let i = 0; i < mealArray.length; i++) {
        displayMealByArea += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${mealArray[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${mealArray[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = displayMealByArea;
}


// get ingrediants from api
async function getIngredients() {
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    searchContainer.innerHTML = "";
    let ingredientsRespone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    // console.log(ingredientsRespone);
    ingredientsRespone = await ingredientsRespone.json();
    // console.log(ingredientsRespone);
    displayIngredients(ingredientsRespone.meals.slice(0, 20));
    $(".innerLoading").fadeOut(300);
}

// display ingrediants
function displayIngredients(mealArray) {
    let displayMealByIngrediants = "";
    for (let i = 0; i < mealArray.length; i++) {
        displayMealByIngrediants += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${mealArray[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${mealArray[i].strIngredient}</h3>
                        <p>${mealArray[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>   `
    }

    rowData.innerHTML = displayMealByIngrediants;
}


async function getCategoryMeals(category) {
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    let getCategoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    // console.log(getCategoryResponse);
    getCategoryResponse = await getCategoryResponse.json();
    // console.log(getCategoryResponse);
    displayMeals(getCategoryResponse.meals.slice(0, 20));
    $(".innerLoading").fadeOut(300);

}
$('#getCategories').click(()=>{
    getCategories(); closeSideNav();
})

async function getAreaMeals(area) {
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    let getAreaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    // console.log(getAreaResponse);
    getAreaResponse = await getAreaResponse.json();
    // console.log(getAreaResponse);
    displayMeals(getAreaResponse.meals.slice(0, 20));
    $(".innerLoading").fadeOut(300);

}
$('#getArea').click(()=>{
    getArea(); closeSideNav();
})


async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    let getIngredientsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    // console.log(getIngredientsResponse);
    getIngredientsResponse = await getIngredientsResponse.json();
    // console.log(getIngredientsResponse);
    displayMeals(getIngredientsResponse.meals.slice(0, 20));
    $(".innerLoading").fadeOut(300);

}
$('#getIngredients').click(()=>{
    getIngredients(); closeSideNav();
})
async function getMealDetails(mealID) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    searchContainer.innerHTML = "";
    let getMealDetailsrespone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    // console.log(getMealDetailsrespone);
    getMealDetailsrespone = await getMealDetailsrespone.json();
    // console.log(getMealDetailsrespone);
    displayMealDetails(getMealDetailsrespone.meals[0]);
    $(".innerLoading").fadeOut(300);

}


function displayMealDetails(meal) { 
    searchContainer.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let details = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = details;
}


function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 g-4">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-white text-black" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-white text-black" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = "";
}

async function searchByName(term) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    let searchByNameresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    // console.log(searchByNameresponse);
    searchByNameresponse = await searchByNameresponse.json();
    // console.log(searchByNameresponse);
    searchByNameresponse.meals ? displayMeals(searchByNameresponse.meals) : displayMeals([]);
    $(".innerLoading").fadeOut(300);

}

async function searchByFLetter(term) {
    closeSideNav();
    rowData.innerHTML = "";
    $(".innerLoading").fadeIn(300);
    term == "" ? term = "a" : "";
    let seachByLetterResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    // console.log(seachByLetterResponse);
    seachByLetterResponse = await seachByLetterResponse.json()
    // console.log(seachByLetterResponse);
    seachByLetterResponse.meals ? displayMeals(seachByLetterResponse.meals) : displayMeals([])
    $(".innerLoading").fadeOut(300)

}

$('#showSearchInputs').click(()=>{
    showSearchInputs(); closeSideNav();
})


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Invalid Name
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn");
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInput = true;
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInput = true;
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInput = true;
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInput = true;
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInput = true;
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInput = true;
    })
}



function inputsValidation() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.replace('btn-outline-danger','btn-outline-info')
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

$('#showContacts').click(()=>{
    showContacts(); closeSideNav();
})