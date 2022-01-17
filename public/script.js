document.addEventListener("DOMContentLoaded", function () {
  // constants
  const homeButtons = document.querySelectorAll(".home-button");
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
  const closeRegisterModal = document.querySelector("#close-register-modal");
  const closeLoginModal = document.querySelector("#close-login-modal");
  const submitSearch = document.querySelector("#search-recipe-button");
  const createUser = document.querySelector("#create-user-button");
  const loginUser = document.querySelector("#login-user-button");
  const logoutUser = document.querySelector("#logout-button");
  const welcomeDiv = document.querySelector("#welcome-message");

  $();

  // functions

  // add recipe cards to the page
  function addRecipes(recipeData) {
    document.querySelector("#intro-section").style.display = "none";
    recipes.innerText = "";
    recipeData.forEach((recipe) => {
      if (!recipe) return;

      let innerDiv = document.createElement("div");
      innerDiv.setAttribute(
        "class",
        "card recipe-card col-md-4 col-lg-3 col-xl-2 "
      );
      innerDiv.setAttribute("data-id", `${recipe._id}`);
      innerDiv.setAttribute("id", "go-to-recipe-link");
      let goToRecipeButton = document.createElement("button");
      goToRecipeButton.setAttribute("type", "button");
      goToRecipeButton.setAttribute("class", "btn btn-info float-bottom mb-2");
      goToRecipeButton.setAttribute("data-id", `${recipe._id}`);
      goToRecipeButton.setAttribute("id", "go-to-recipe");
      goToRecipeButton.innerText = "Go To Recipe";
      if (!recipe.image) return;
      innerDiv.innerHTML = `
        <img class="card-img-top mt-2" src="${recipe.image}" alt="Card image cap" id="go-to-recipe" data-id="${recipe._id}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
        <h5 class="card-title">${recipe.title}</h5>
        <p class="card-text m-1"><small>${recipe.description}</small></p>

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
    let tags = recipe.title.split(" ").concat(recipe.tags);

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
      <li id='tags-list' style='list-style-type: none'></li>
      <button type="button" class="btn btn-info" id="edit-button" data-id='${recipe._id}'>Edit</button>
      <button type="button" class="btn btn-danger" id="delete-button" data-id='${recipe._id}'>Delete</button>
      </div>
      `;

    // iterate through steps array and spit out ordered list items
    let stepsList = document.querySelector("#steps-list");
    steps.forEach((step) => {
      if (step.length > 1) {
        let listItem = document.createElement("li");
        listItem.innerText = step;
        stepsList.appendChild(listItem);
      }
    });

    // iterate through ingredients and spit out unordered list items
    let ingredientsList = document.querySelector("#ingredients-list");
    ingredients.forEach((ingredient) => {
      let listItem = document.createElement("li");
      listItem.innerText = ingredient;
      ingredientsList.appendChild(listItem);
    });

    // iterate through tags and spit out clickable list
    let tagsList = document.querySelector("#tags-list");
    tags.forEach((tag) => {
      let listItem = document.createElement("button");
      listItem.setAttribute("class", "button btn-primary btn btn-sm m-1 tag");
      listItem.setAttribute("id", tag);
      // listItem.setAttribute("onclick", "console.log('click')");
      // console.log(listItem);
      // let tagId = document.getElementById(tag);
      // console.log(tagId);
      // document.querySelector("#Potatoes").addEventListener("click", (e) => {
      // e.preventDefault();
      // console.log(e);
      //   let criteria =
      //     e.target.parentNode.previousSibling.previousSibling.children[1].value;
      //   // console.log(criteria);
      //   fetch(`recipes/search=${criteria}`)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       addRecipes(data);
      //       $("#searchModal").modal("hide");
      //       console.log("recipes loaded");
      //     })
      //     .catch((error) => console.log(error));
      // });

      // tags.forEach((tag) => {
      //   console.log(tag);
      //   if (tag !== null) {
      //     document.querySelector(tag).addEventListener("click", (e) => {
      //       e.preventDefault();
      //       console.log(e.target);
      //     });
      //   }
      // });

      listItem.innerText = tag;
      tagsList.appendChild(listItem);
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
          tags: document.getElementById("tagsEdit").value.split(/[.,]/g),
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
  function loadAllRecipes() {
    fetch("/recipes/all_recipes")
      .then((response) => response.json())
      .then((data) => {
        addRecipes(data);
        console.log("recipes loaded");
      })
      .catch((error) => console.log(error));
  }
  loader.addEventListener("click", (e) => {
    e.preventDefault();
    loadAllRecipes();
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

    const newRecipe = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      ingredients: document.getElementById("ingredients").value.split(/[.,]/g),
      steps: document.getElementById("steps").value.split(/[.,]/g),
      image: document.getElementById("image").value,
      tags: document.getElementById("tags").value.split(/[.,]/g),
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
        console.log(`new recipe created: `, newRecipe.title);
      })
      .then((newRecipe) => {})
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

  // open register modal
  registerer.addEventListener("click", (e) => {
    e.preventDefault();
    $("#login-modal").modal("hide");
    $("#create-account-modal").modal("show");
  });

  // close register modal
  closeRegisterModal.addEventListener("click", (e) => {
    e.preventDefault();
    $("#create-account-modal").modal("hide");
  });

  // close login modal
  closeLoginModal.addEventListener("click", (e) => {
    e.preventDefault();
    $("#login-modal").modal("hide");
  });

  // register new user
  createUser.addEventListener("click", (e) => {
    e.preventDefault();
    let username = e.target.parentNode.parentNode.children[0].children[1].value;
    let password = e.target.parentNode.parentNode.children[1].children[1].value;
    let verifyPassword =
      e.target.parentNode.parentNode.children[2].children[1].value;

    const newUser = {
      username: e.target.parentNode.parentNode.children[0].children[1].value,
      password: e.target.parentNode.parentNode.children[1].children[1].value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    if (password === verifyPassword) {
      fetch("/session/register", options)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.status);
          }
          (response) => response.json();
          $("#create-account-modal").modal("hide");
        })
        .then((newUser) => {})
        .catch((error) => console.log(error));
    } else {
      alert("Passwords must match");
    }
  });

  // login user
  loginUser.addEventListener("click", (e) => {
    e.preventDefault();

    const userToLogin = {
      username: e.target.parentNode.parentNode[0].value,
      password: e.target.parentNode.parentNode[1].value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    };

    fetch("/session/login", options)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
          console.log("error");
        }
        (response) => response.json();
        if (response) {
          $("#login-modal").modal("hide");
          $("#login-button").hide();
          $("#logout-button").removeClass("invisible");
          const helloMessage = document.createElement("p");
          helloMessage.innerText = `Hello ${userToLogin.username}`;
          document.querySelector("#welcome-div").appendChild(helloMessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (userToLogin.length > 0) {
      console.log(username);
    }
  });

  // logout user
  logoutUser.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("logout clicked");
    fetch("/session/logout").then(() => {
      console.log("logged out");
      $("#logout-button").addClass("invisible");
      $("#login-button").show();
    });
  });

  // submit search
  submitSearch.addEventListener("click", (e) => {
    e.preventDefault();
    let criteria =
      e.target.parentNode.previousSibling.previousSibling.children[1].value;
    fetch(`recipes/search=${criteria}`)
      .then((response) => response.json())
      .then((data) => {
        addRecipes(data);
        $("#searchModal").modal("hide");
        console.log("recipes loaded");
        document.querySelector("#welcome-div").innerHTML = "";
      })
      .catch((error) => console.log(error));
  });

  // close search modal
  closeSearchModal.addEventListener("click", (e) => {
    e.preventDefault();
    $("#searchModal").modal("hide");
  });
});
