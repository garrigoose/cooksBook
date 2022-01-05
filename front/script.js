// constants
const recipes = document.querySelector("#recipes");
const loader = document.querySelector("#loader");
const searcher = document.querySelector("#searcher");
const goToRecipe = document.querySelectorAll(".go-to-recipe");
const recipeCard = document.querySelectorAll(".recipe-card");

// functions

// add recipe cards to the page
function addRecipes(recipeData) {
  // recipes.innerHTML = "";
  recipeData.forEach((recipe) => {
    if (!recipe) return;
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "card recipe-card col-lg-3 w-20");
    innerDiv.innerHTML = `<a href="/${recipe._id}">
    <img class="card-img-top" src="${recipe.image}" alt="Card image cap" id="${recipe._id}" data-id="${recipe._id}"></a>
    <div class="card-body">
    <h5 class="card-title">'${recipe.title}'</h5>
    <p class="card-text">'${recipe.description}'</a>
    <a href="/${recipe._id}"><button type="button" class="btn btn-info align-self-end go-to-recipe">Go To Recipe</button></a>
    </div>`;
    recipes.appendChild(innerDiv);
    console.log(recipe._id);
  });
}

// event listeners

loader.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/recipes/all_recipes")
    .then((response) => response.json())
    .then((data) => {
      addRecipes(data);
      console.log(data);
    });
});

searcher.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("something's happening");
  recipes.innerHTML = "<p>insert modal here</p>";
});

goToRecipe.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
  })
);

recipeCard.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("card clicked");
});
