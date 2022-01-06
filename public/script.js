window.onload = (event) => {
  // constants
  const recipes = document.querySelector("#recipes");
  const loader = document.querySelector("#loader");
  const searcher = document.querySelector("#searcher");
  const goToRecipe = document.querySelectorAll(".go-to-recipe");
  const adder = document.querySelector("#adder");
  // functions

  // add recipe cards to the page
  function addRecipes(recipeData) {
    // recipes.innerHTML = "";
    recipes.innerText = "";
    recipeData.forEach((recipe) => {
      if (!recipe) return;

      let innerDiv = document.createElement("div");
      innerDiv.setAttribute("class", "card recipe-card col-md-4 col-lg-3 w-20");
      innerDiv.innerHTML = `<a href="/${recipe._id}">
        <img class="card-img-top" src="${recipe.image}" alt="Card image cap" id="${recipe._id}" data-id="${recipe._id}"></a>
        <div class="card-body">
        <h5 class="card-title">'${recipe.title}'</h5>
        <p class="card-text recipe-text">'${recipe.description}'</p></a>
        <a href="/${recipe._id}"><button type="button" class="btn btn-info align-self-end go-to-recipe">Go To Recipe</button></a>
        </div>`;
      recipes.appendChild(innerDiv);
    });
  }

  function showRecipe(recipe) {
    let steps = recipe.steps;
    recipes.innerHTML = `
      <div class='card w-80'>
      <h3 class='card-title'>${recipe.title}</h3>
      <img class="card-img-top" src="${recipe.image}" alt="Card image cap">
      <h4>Ingredients</h4>
      <p>${recipe.ingredients}</p>
      <h4>Steps</h4>
      <ol>
        <li>${steps}</li>
      </ol>
      </div>
      `;
  }

  // event listeners

  // load index of all recipes
  loader.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/recipes/all_recipes")
      .then((response) => response.json())
      .then((data) => {
        addRecipes(data);
        console.log("recipes loaded");
      });
  });

  // load individual recipe data
  recipes.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.dataset.id;
    console.log(id);
    recipes.innerText = "";
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        showRecipe(data);
        console.log(data);
      });
  });

  // open adder modal
  adder.addEventListener("click", (e) => {
    e.preventDefault();
    $("#searchModal").modal("show");
  });

  goToRecipe.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e);
    })
  );
};
