// constants
const recipes = document.querySelector("#recipes-container");
const loader = document.querySelector("#loader");
const searcher = document.querySelector("#searcher");

// functions

// add recipe cards to the page
function addRecipes(recipeData) {
  // recipes.innerHTML = "";
  recipeData.forEach((recipe) => {
    if (!recipe) return;
    let innerDiv = document.createElement("div");
    innerDiv.innerHTML = `<div class="card w-25">
    <img class="card-img-top" src="${recipe.image}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">'${recipe.title}'</h5>
    <p class="card-text">'${recipe.description}'</a>
    </div>
    </div>`;
    recipes.appendChild(innerDiv);
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
  console.log("something's happeneing");
  // let newDiv = `<div class="card w-25">
  //       <img class="card-img-top" src="https://picsum.photos/300/200
  //       " alt="Card image cap">
  //       <div class="card-body">
  //       <h5 class="card-title">'card title'</h5>
  //       <p class="card-text">'card text'</a>
  //       </div>
  //       </div>`;
  // $(".recipes").append(newDiv);
});
