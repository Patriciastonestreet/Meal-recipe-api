const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const foodDetailsContent = document.querySelector(".food-details-content");
const closeButton = document.getElementById("recipe-close-btn");

//even listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
closeButton.addEventListener("click", () => {
  foodDetailsContent.parentElement.classList.remove("showRecipe");
});

//get meal list

function getMealList() {
  let searchInput = document.getElementById("search-input").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                <div class = "meal-item" data-id="${meal.idMeal}">
                <div class = "recipe-img">
                <img src = "${meal.strMealThumb}" alt="food">
            </div>
            <div class = "food-name">
            <h3>${meal.strMeal}</h3>
            <a href = "#" class = "recipe-btn">Get Recipe</a>
        </div>
    </div>


        `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, We didn't find any meal";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

//get recipe
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

//modal

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruction">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipe-img">
        <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
        <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    `;

  foodDetailsContent.innerHTML = html;
  foodDetailsContent.parentElement.classList.add("showRecipe");
}
