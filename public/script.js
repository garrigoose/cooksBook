document.addEventListener("DOMContentLoaded", function () {
  // constants
  const recipes = document.querySelector("#recipes");
  const loader = document.querySelector("#loader");
  const searcher = document.querySelector("#searcher");
  const adder = document.querySelector("#adder");
  const creater = document.querySelector("#create-recipe-button");
  const closeAddModal = document.querySelector("#close-add-modal");

  // functions

  // add recipe cards to the page
  function addRecipes(recipeData) {
    // recipes.innerHTML = "";
    recipes.innerText = "";
    recipeData.forEach((recipe) => {
      if (!recipe) return;

      let innerDiv = document.createElement("div");
      innerDiv.setAttribute(
        "class",
        "card recipe-card col-md-4 col-lg-3 w-20 "
      );
      innerDiv.innerHTML = `<a href="/${recipe._id}">
        <img class="card-img-top" src="${recipe.image}" alt="Card image cap" id="${recipe._id}" data-id="${recipe._id}"></a>
        <div class="card-body">
        <h5 class="card-title">'${recipe.title}'</h5>
        <p class="card-text recipe-text">'${recipe.description}'</p>
        <a href="/${recipe._id}">
        <button onclick-="/${recipe._id}" type="button" class="btn btn-info align-self-end">Go To Recipe</button></a>
        </div>`;
      recipes.appendChild(innerDiv);
    });
  }

  // display one recipe
  function showRecipe(recipe) {
    let steps = recipe.steps;
    let ingredients = recipe.ingredients;

    recipes.innerHTML = `
      <div class='card w-80'>
      <h3 class='card-title'>${recipe.title}</h3>
      <img src="${recipe.image}" style="width: 80%" alt="Card image cap">
      <h4>Ingredients</h4>
      <ul id='ingredients-list'></ul>
      <h4>Steps</h4>
      <ol id='steps-list'></ol>
      <button type="button" class="btn btn-info" id="edit-button">Edit</button>
      </div>
      `;
    let stepsList = document.querySelector("#steps-list");
    steps.forEach((step) => {
      let listItem = document.createElement("li");
      listItem.innerText = step;
      stepsList.appendChild(listItem);
    });

    let ingredientsList = document.querySelector("#ingredients-list");
    ingredients.forEach((ingredient) => {
      let listItem = document.createElement("li");
      listItem.innerText = ingredient;
      ingredientsList.appendChild(listItem);
    });
  }

  // fetch recipes
  function fetchRecipes() {
    fetch("http://localhost:3000/recipes/all_recipes")
      .then((response) => response.json())
      .then((data) => {
        addRecipes(data);
        console.log("recipes loaded");
      });
  }

  // convert array to list
  function arrayToList(arr) {
    arr.forEach((el) => {
      console.log(`<li>${el}</li>`);
      return `<li>${el}</li>`;
    });
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
    console.log("add modal opened");
    $("#searchModal").modal("show");
  });

  // create new recipe
  creater.addEventListener("click", (e) => {
    console.log("creater clicked");

    const newRecipe = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      ingredients: document.getElementById("ingredients").value,
      steps: document.getElementById("steps").value,
      image: document.getElementById("image").value,
      tags: document.getElementById("tags").value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    };

    fetch("http://localhost:3000/recipes/", options)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        }
        (response) => response.json();
      })
      .then((newRecipe) => {
        console.log(newRecipe);
      })
      .catch((err) => {
        console.log(err);
      });

    $("#searchModal").modal("hide");
    fetchRecipes();
  });

  // close new recipe modal
  closeAddModal.addEventListener("click", (e) => {
    e.preventDefault();
    $("#searchModal").modal("hide");
  });
});
