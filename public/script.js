document.addEventListener("DOMContentLoaded", function () {
  // constants
  const recipes = document.querySelector("#recipes");
  const loader = document.querySelector("#loader");
  const searcher = document.querySelector("#searcher");
  const adder = document.querySelector("#adder");
  const creater = document.querySelector("#create-recipe-button");
  const loginer = document.querySelector("#login-button");
  const registerer = document.querySelector("#open-register-modal");
  const closeAddModal = document.querySelector("#close-add-modal");
  const closeEditModal = document.querySelector("#close-edit-modal");
  const closeSearchModal = document.querySelector("#close-search-modal");
  const submitSearch = document.querySelector("#search-recipe-button");
  let editter;

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
        "card recipe-card col-md-4 col-lg-3 col-xl-2 w-20"
      );
      innerDiv.setAttribute("data-id", `${recipe._id}`);
      innerDiv.setAttribute("id", "go-to-recipe-link");
      let goToRecipeButton = document.createElement("button");
      goToRecipeButton.setAttribute("type", "button");
      goToRecipeButton.setAttribute("class", "btn btn-info float-bottom mb-2");
      goToRecipeButton.setAttribute("data-id", `${recipe._id}`);
      goToRecipeButton.setAttribute("id", "go-to-recipe");
      goToRecipeButton.innerText = "Go To Recipe";
      // goToRecipeButton.innerHTML = `<button type="button" class="btn btn-info float-bottom" data-id="${recipe._id}" id="go-to-recipe-link">Go To Recipe</button>`;
      // <a href="/${recipe._id}">
      // </a>
      innerDiv.innerHTML = `
        <img class="card-img-top mt-2" src="${recipe.image}" alt="Card image cap" id="go-to-recipe" data-id="${recipe._id}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
        <h5 class="card-title">'${recipe.title}'</h5>
        <p class="card-text recipe-text">'${recipe.description}'</p>

        <a href="/${recipe._id}">

        </div>`;
      innerDiv.appendChild(goToRecipeButton);
      recipes.appendChild(innerDiv);

      goToRecipeButton.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.target.dataset.id;
        recipes.innerText = "";
        fetch(`/recipes/${id}`)
          .then((response) => response.json())
          .then((data) => {
            showRecipe(data);
          })
          .catch((error) => console.log(error));
      });
      document.querySelector("#go-to-recipe").addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.target.dataset.id;
        recipes.innerText = "";
        fetch(`/recipes/${id}`)
          .then((response) => response.json())
          .then((data) => {
            showRecipe(data);
          })
          .catch((error) => console.log(error));
      });
    });
  }

  // display one recipe
  function showRecipe(recipe) {
    let steps = recipe.steps;
    let ingredients = recipe.ingredients;

    // set innerHTML of div.recipe to that of parsed json
    recipes.innerHTML = `
      <div class='card'>
      <h3 class='card-title'>${recipe.title}</h3>
      <img src="${recipe.image}" style="width: 90%" alt="Card image cap">
      <h4>Ingredients</h4>
      <ul id='ingredients-list'></ul>
      <h4>Steps</h4>
      <ol id='steps-list'></ol>
      <h4>Tags</h4>
      <p>${recipe.tags}<p>
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
      document.getElementById("titleEdit").value = recipe.title;
      document.getElementById("descriptionEdit").value = recipe.description;
      document.getElementById("ingredientsEdit").value = recipe.ingredients;
      document.getElementById("stepsEdit").value = recipe.steps;
      document.getElementById("imageEdit").value = recipe.image;
      document.getElementById("tagsEdit").value = recipe.tags;
    });

    // submit recipe edit
    document
      .getElementById("submit-edit-button")
      .setAttribute("data-id", `${recipe._id}?_method=PUT`);
    document
      .getElementById("submit-edit-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        console.log("submiter clicked");
        const edittedRecipe = {
          title: document.getElementById("titleEdit").value,
          description: document.getElementById("descriptionEdit").value,
          ingredients: document
            .getElementById("ingredientsEdit")
            .value.split(/[.,]/g),
          steps: document.getElementById("stepsEdit").value.split(/[.,]/g),
          image: document.getElementById("imageEdit").value,
          tags: document.getElementById("tagsEdit").value,
        };

        console.log(edittedRecipe);

        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(edittedRecipe),
        };

        fetch(`/recipes/${e.target.dataset.id}`, options)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.status);
            }
            (response) => response.json();
          })
          .then((edit) => {
            console.log(edit);
          })
          .catch((err) => {
            console.log(err);
          });

        $("#editModal").modal("hide");
        fetchRecipes();
      });

    // delete recipe and redirect to /all_recipes
    deleter.addEventListener("click", (e) => {
      // e.preventDefault();
      fetch(`/recipes/${e.target.dataset.id}`, {
        method: "DELETE",
      })
        .then((data) => {
          fetchRecipes();
          $("#modal-edit").modal("close");
        })
        .catch((error) => console.log(error));
    });
  }

  // fetch recipes
  function fetchRecipes() {
    fetch("/recipes/all_recipes")
      .then((response) => response.json())
      .then((data) => {
        addRecipes(data);
        console.log("recipes loaded");
      })
      .catch((error) => console.log(error));
  }

  // convert string blob to array of strings on , or .
  function arrayify(str) {
    return (arr = str.split(/[.,]/g));
  }

  // event listeners

  // load index of all recipes
  loader.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("/recipes/all_recipes")
      .then((response) => response.json())
      .then((data) => {
        addRecipes(data);
        console.log("recipes loaded");
      })
      .catch((error) => console.log(error));
  });

  // open adder modal
  adder.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("add modal opened");
    $("#addModal").modal("show");
  });

  // create new recipe
  creater.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("creater clicked");

    const newRecipe = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      ingredients: document.getElementById("ingredients").value.split(/[.,]/g),
      steps: document.getElementById("steps").value.split(/[.,]/g),
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

    fetch("/recipes/", options)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        }
        (response) => response.json();
      })
      .then((newRecipe) => {
        console.log(`new recipe created: `, newRecipe.title);
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

  // open search modal
  searcher.addEventListener("click", (e) => {
    e.preventDefault();
    $("#searchModal").modal("show");
  });

  // open login modal
  loginer.addEventListener("click", (e) => {
    e.preventDefault();
    $("#login-modal").modal("show");
  });

  // open login modal
  registerer.addEventListener("click", (e) => {
    e.preventDefault();
    $("#login-modal").modal("hide");
    $("#create-account-modal").modal("show");
  });

  // submit search
  submitSearch.addEventListener("click", (e) => {
    e.preventDefault();
    let criteria =
      e.target.parentNode.previousSibling.previousSibling.children[1].value;
    console.log(criteria);
    fetch(`recipes/search=${criteria}`)
      .then((response) => response.json())
      .then((data) => {
        addRecipes(data);
        console.log(data);
        console.log("recipes loaded");
      })
      .catch((error) => console.log(error));
  });

  closeSearchModal.addEventListener("click", (e) => {
    e.preventDefault();
    $("#searchModal").modal("hide");
  });
});
