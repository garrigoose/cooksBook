document.addEventListener("DOMContentLoaded", function () {
  // constants
  const recipes = document.querySelector("#recipes");
  const loader = document.querySelector("#loader");
  const searcher = document.querySelector("#searcher");
  const adder = document.querySelector("#adder");
  const creater = document.querySelector("#create-recipe-button");
  const closeAddModal = document.querySelector("#close-add-modal");
  const closeEditModal = document.querySelector("#close-edit-modal");
  let editter;

  // functions

  // add recipe cards to the page
  function addRecipes(recipeData) {
    // recipes.innerHTML = "";
    recipes.innerText = "";
    recipeData.forEach((recipe) => {
      if (!recipe) return;

      let innerDiv = document.createElement("div");
      innerDiv.setAttribute("class", "card recipe-card col-md-4 col-lg-3 w-20");
      innerDiv.setAttribute("data-id", "${recipe._id}");
      innerDiv.innerHTML = `
        <a href="/${recipe._id}">
        <img class="card-img-top" src="${recipe.image}" alt="Card image cap" id="${recipe._id}" data-id="${recipe._id}" style="height: 200px; object-fit: cover;">
        </a>

        <div class="card-body">
        <h5 class="card-title">'${recipe.title}'</h5>
        <p class="card-text recipe-text">'${recipe.description}'</p>

        <a href="/${recipe._id}">
        <button type="button" class="btn btn-info float-bottom" data-id="${recipe._id}">Go To Recipe</button>
        </a>

        </div>`;
      recipes.appendChild(innerDiv);
    });
  }

  // display one recipe
  function showRecipe(recipe) {
    let steps = recipe.steps;
    let ingredients = recipe.ingredients;

    // set innerHTML of div.recipe to that of parsed json
    recipes.innerHTML = `
      <div class='card w-80'>
      <h3 class='card-title'>${recipe.title}</h3>
      <img src="${recipe.image}" style="width: 80%" alt="Card image cap">
      <h4>Ingredients</h4>
      <ul id='ingredients-list'></ul>
      <h4>Steps</h4>
      <ol id='steps-list'></ol>
      <button type="button" class="btn btn-info" id="edit-button" data-id='${recipe._id}'>Edit</button>
      <button type="button" class="btn btn-danger" id="delete-button" data-id='${recipe._id}'>Delete</button>
      </div>
      `;

    // iterate through steps array and spit out ordered list items
    let stepsList = document.querySelector("#steps-list");
    steps.forEach((step) => {
      let listItem = document.createElement("li");
      listItem.innerText = step;
      stepsList.appendChild(listItem);
    });

    // iterate through ingredients and spit out unordered list items
    let ingredientsList = document.querySelector("#ingredients-list");
    ingredients.forEach((ingredient) => {
      let listItem = document.createElement("li");
      listItem.innerText = ingredient;
      ingredientsList.appendChild(listItem);
    });

    // initialize edit and delete button event listeners
    editter = document.querySelector("#edit-button");
    deleter = document.querySelector("#delete-button");

    // open edit modal
    editter.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(recipe);
      $("#editModal").modal("show");
      document
        .querySelector("#edit-form")
        .setAttribute("action", `/recipes/${recipe._id}?_method=PUT`);
      document.getElementById("titleEdit").value = recipe.title;
      document.getElementById("descriptionEdit").value = recipe.description;
      document.getElementById("ingredientsEdit").value = recipe.ingredients;
      document.getElementById("stepsEdit").value = recipe.steps;
      document.getElementById("imageEdit").value = recipe.image;
      document.getElementById("tagsEdit").value = recipe.tags;
    });

    // delete recipe and redirect to /all_recipes
    deleter.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/recipes/${e.target.dataset.id}`, {
        method: "DELETE",
      }).then((data) => {
        fetchRecipes();
        $("#modal-edit").modal("close");
      });
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
    recipes.innerText = "";
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        showRecipe(data);
      });
  });

  // open adder modal
  adder.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("add modal opened");
    $("#addModal").modal("show");
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

    $("#addModal").modal("hide");
    fetchRecipes();
  });

  // close new recipe modal
  closeAddModal.addEventListener("click", (e) => {
    e.preventDefault();
    $("#addModal").modal("hide");
  });

  // close edit recipe modal
  closeEditModal.addEventListener("click", (e) => {
    e.preventDefault();
    $("#editModal").modal("hide");
  });
});
