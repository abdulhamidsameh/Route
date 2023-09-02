let reqMeal = new XMLHttpRequest();
let reqCate = new XMLHttpRequest();
let jsData;
let meals;
let cateData;
let cate;
let mealsStr = "";
let cateStr = "";
reqMeal.open("get", "https://www.themealdb.com/api/json/v1/1/search.php?s");
reqCate.open("get", "https://www.themealdb.com/api/json/v1/1/categories.php");
reqMeal.send();
reqCate.send();
reqMeal.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    jsData = JSON.parse(this.responseText);
    meals = jsData.meals;
    displayMeals(meals);
  }
  document.querySelector(".home .row").innerHTML = mealsStr;
  $(".item .landing").click(function (e) {
    let targetMeal = e.currentTarget.childNodes[1].innerText;
    $(".side-bar").animate({ left: `-${navbarWidth}` });
    $(".home,.search,categories,.area,.contact").css("display", "none ");
    $(".meal").css("display", "block");

    displayMeal(targetMeal);
  });
};
reqCate.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    cateData = JSON.parse(this.responseText);
    cate = cateData.categories;
    for (let i = 0; i < cate.length; i++) {
      cateStr += ` 
      <div class="col-md-3" >
      <div class="item">
        <img src="${cate[i].strCategoryThumb}" alt="" class="w-100" />
        <div class="landing">
          <h5>${cate[i].strCategory}</h5>
          <p>${cate[i].strCategoryDescription.slice(0, 150)}</p>
        </div>
      </div>
    </div>`;
    }
  }
  document.querySelector(".categories .row").innerHTML = cateStr;
  $(".item .landing").click(function (e) {
    let targetCategories = e.currentTarget.childNodes[1].innerText;
    displayAllCategories(targetCategories);
  });
};
function displayMeals(meals) {
  for (let i = 0; i < meals.length; i++) {
    mealsStr += ` 
    <div class="col-md-3" >
    <div class="item">
      <img src="${meals[i].strMealThumb}" alt="" class="w-100" />
      <div class="landing">
        <p>${meals[i].strMeal}</p>
      </div>
    </div>
  </div>`;
  }
}

function displayAllCategories(targetCategories) {
  let req = new XMLHttpRequest();
  req.open(
    "get",
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${targetCategories}`
  );
  req.send();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      console.log(response);
      let meals = response.meals[0];
      displayMeals(meals);
      document.querySelector(".categories .row").innerHTML = mealsStr;
      $(".side-bar").animate({ left: `-${navbarWidth}` });
      $(".home,.search,.meal,.area,.ingredients,.contact").css(
        "display",
        "none "
      );
      $(".categories").css("display", "block");
      $(".item .landing").click(function (e) {
        let targetMeal = e.currentTarget.childNodes[1].innerText;
        console.log(targetMeal);
        $(".side-bar").animate({ left: `-${navbarWidth}` });
        $(".home,.search,.categories,.area").css("display", "none ");
        $(".meal").css("display", "block");
        displayMeal(targetMeal);
      });
    }
  };
}

let navbarWidth = $(".side-bar .navbar").innerWidth();
$(".side-bar").animate({ left: `-${navbarWidth}` });
let flag = true;
$("#close").click(() => {
  if (flag) {
    $(".side-bar").animate({ left: `-${navbarWidth}` }, 1000);
    flag = false;
    for (let i = 0; i < 5; i++) {
      $(".links a").eq(i).animate(
        {
          top: "100%",
        },
        500
      );
    }
  } else {
    $(".side-bar").animate({ left: 0 }, 1000);
    flag = true;
    for (let i = 0; i < 5; i++) {
      $(".links a")
        .eq(i)
        .animate(
          {
            top: i * 25,
          },
          (i + 5) * 200
        );
    }
  }
});
$("#searchName").keyup(function (e) {
  let searchStr = ``;
  for (let i = 0; i < meals.length; i++) {
    if (meals[i].strMeal.toUpperCase().includes(e.target.value.toUpperCase())) {
      if (e.target.value == "") {
      } else {
        searchStr += ` 
        <div class="col-md-3" >
        <div class="item">
          <img src="${meals[i].strMealThumb}" alt="" class="w-100" />
          <div class="landing">
            <p>${meals[i].strMeal}</p>
          </div>
        </div>
      </div>`;
      }
    }
  }

  document.querySelector(".search .row").innerHTML = searchStr;
  $(".item .landing").click(function (e) {
    let targetMeal = e.currentTarget.childNodes[1].innerText;
    $(".side-bar").animate({ left: `-${navbarWidth}` });
    $(".home,.search,.categories,.area,.ingredients,.contact").css(
      "display",
      "none "
    );
    $(".meal").css("display", "block");
    displayMeal(targetMeal);
  });
});
$("#searchLetter").keyup(function (e) {
  let searchStr = ``;
  for (let i = 0; i < meals.length; i++) {
    if (
      meals[i].strMeal.toUpperCase().charAt(0) == e.target.value.toUpperCase()
    ) {
      searchStr += ` 
      <div class="col-md-3" >
      <div class="item">
        <img src="${meals[i].strMealThumb}" alt="" class="w-100" />
        <div class="landing">
          <p>${meals[i].strMeal}</p>
        </div>
      </div>
    </div>`;
    }
  }

  document.querySelector(".search .row").innerHTML = searchStr;
  $(".item .landing").click(function (e) {
    let targetMeal = e.currentTarget.childNodes[1].innerText;
    console.log(targetMeal);
    $(".side-bar").animate({ left: `-${navbarWidth}` });
    $(".home,.search,.categories,.area,.ingredients,.contact").css(
      "display",
      "none "
    );
    $(".meal").css("display", "block");
    displayMeal(targetMeal);
  });
});
$("#search").click(function () {
  $(".side-bar").animate({ left: `-${navbarWidth}` });
  $(".home,.categories,.meal,.area,.contact").css("display", "none");
  $(".search").css("display", "block");
});
$("#category").click(function () {
  $(".side-bar").animate({ left: `-${navbarWidth}` });
  $(".home,.search,.meal,.area,.ingredients,.contact").css("display", "none ");
  $(".categories").css("display", "block");
});

$("#area").click(function () {
  $(".side-bar").animate({ left: `-${navbarWidth}` });
  $(".home,.search,.meal,.categories,.ingredients,.contact").css(
    "display",
    "none "
  );
  $(".area").css("display", "block");
  displayArea();
});

function displayMeal(targetMeal) {
  let req = new XMLHttpRequest();
  req.open(
    "get",
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${targetMeal}`
  );
  req.send();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      let meal = response.meals[0];
      let ingredients = ``;
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients += `<li class="alert alert-info m-2 p-1">${
            meal[`strMeasure${i}`]
          } ${meal[`strIngredient${i}`]}</li>`;
        }
      }
      let tags = meal.strTags?.split(",");
      if (!tags) tags = [];
      let tagsStr = "";
      for (let i = 0; i < tags.length; i++) {
        tagsStr += `
          <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
      }
      let str = `     <div class="col-md-4">
        <img src="${meal.strMealThumb}" class="w-100" alt="" />
        <p>${meal.strMeal}</p>
      </div>
      <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h4>Area:<span>${meal.strArea}</span></h4>
        <h4>Category :<span>${meal.strCategory}</span></h4>
        <p>Recipes :${ingredients}</p>
        <p>Tags:${tagsStr}</p>
        <a href="${meal.strSource}" target="_blank" style="text-decoration:none"><button class='btn btn-info'>Source</button></a>
        <a href="${meal.strYoutube}" target="_blank" style="text-decoration:none"><button class="btn btn-danger">Youtube</button></a>
      </div>`;

      document.querySelector(".meal .row").innerHTML = str;
    }
  };
}
function displayArea() {
  let req = new XMLHttpRequest();
  req.open("get", `https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  req.send();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      let areas = response.meals;
      let areaStr = "";
      for (let i = 0; i < areas.length; i++) {
        if (areas[i].strArea == "Unknown") {
        } else {
          areaStr += `<div class="col-md-3">
          <i class="fa-solid fa-house"></i>
          <h5>${areas[i].strArea}</h5>
          </div>`;
        }
      }
      document.querySelector(".area .row").innerHTML = areaStr;
      $(".area .col-md-3").click(function (e) {
        let targetArea = e.currentTarget.childNodes[3].innerText;
        displayAreaMeals(targetArea);
      });
    }
  };
}
function displayAreaMeals(targetArea) {
  let req = new XMLHttpRequest();
  req.open(
    "get",
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${targetArea}`
  );
  req.send();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      let meals = response.meals;
      let str = "";
      for (let i = 0; i < meals.length; i++) {
        str += ` 
        <div class="col-md-3" >
        <div class="item">
          <img src="${meals[i].strMealThumb}" alt="" class="w-100" />
          <div class="landing">
            <p>${meals[i].strMeal}</p>
          </div>
        </div>
      </div>`;
      }
      $(".meal,.search,.categories,.home,.ingredients").css("display", "none ");
      $(".area").css("display", "block");
      document.querySelector(".area .row").innerHTML = str;
      $(".item .landing").click(function (e) {
        let targetMeal = e.currentTarget.childNodes[1].innerText;
        console.log(targetMeal);
        $(".side-bar").animate({ left: `-${navbarWidth}` });
        $(".home,.search,.categories,.area,.ingredients,.contact").css(
          "display",
          "none "
        );
        $(".meal").css("display", "block");
        displayMeal(targetMeal);
      });
    }
  };
}
$("#ingredients").click(function () {
  $(".side-bar").animate({ left: `-${navbarWidth}` });
  $(".home,.search,.meal,.area,.categories,.contact").css("display", "none ");
  $(".ingredients").css("display", "block");
  displayIngredients();
});
function displayIngredients() {
  let req = new XMLHttpRequest();
  req.open("get", `https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  req.send();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      let ingredient = response.meals;
      let str = "";
      for (let i = 0; i < 20; i++) {
        str += `<div class="col-md-3">
        <i class="fa-solid fa-drumstick-bite"></i>
        <h5>${ingredient[i].strIngredient}</h5>
        <p>${ingredient[i].strDescription.slice(0, 50)}</p>
      </div>`;
      }
      document.querySelector(".ingredients .row").innerHTML = str;
      $(".ingredients .col-md-3").click(function (e) {
        let targetIngredients = e.currentTarget.childNodes[3].innerText;
        showIngredient(targetIngredients);
      });
    }
  };
}
function showIngredient(targetIngredients) {
  let req = new XMLHttpRequest();
  req.open(
    "get",
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${targetIngredients}
  `
  );
  req.send();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      let meals = response.meals;
      let str = "";
      for (let i = 0; i < meals.length; i++) {
        str += ` 
        <div class="col-md-3" >
        <div class="item">
          <img src="${meals[i].strMealThumb}" alt="" class="w-100" />
          <div class="landing">
            <p>${meals[i].strMeal}</p>
          </div>
        </div>
      </div>`;
      }
      document.querySelector(".ingredients .row").innerHTML = str;
      $(".item .landing").click(function (e) {
        let targetMeal = e.currentTarget.childNodes[1].innerText;
        console.log(targetMeal);
        $(".side-bar").animate({ left: `-${navbarWidth}` });
        $(".home,.search,.categories,.area,.ingredients,.contact").css(
          "display",
          "none "
        );
        $(".meal").css("display", "block");
        displayMeal(targetMeal);
      });
    }
  };
}

$("#contact").click(function () {
  $(".side-bar").animate({ left: `-${navbarWidth}` });
  $(".home,.search,.categories,.area,.ingredients,.meal").css(
    "display",
    "none "
  );
  $(".contact").css("display", "block");
  document.querySelector("button").disabled = true;
});
let userName = "";
$("#name").keyup(function (e) {
  userName = e.target.value;
  if (validateName(userName)) {
    $(".name").css("display", "none");
  } else {
    $(".name").css("display", "block");
  }
});
function validateName() {
  let regex = /^[a-zA-Z ]+$/;
  return regex.test(userName);
}
let userEmail = "";
$("#email").keyup(function (e) {
  userEmail = e.target.value;
  if (validateEmail(userEmail)) {
    $(".email").css("display", "none");
  } else {
    $(".email").css("display", "block");
  }
});
function validateEmail() {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(userEmail);
}

let userPhone = "";
$("#phone").keyup(function (e) {
  userPhone = e.target.value;
  if (validatePhone(userPhone)) {
    $(".phone").css("display", "none");
  } else {
    $(".phone").css("display", "block");
  }
});
function validatePhone() {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(userPhone);
}

let userAge;
$("#age").keyup(function (e) {
  userAge = e.target.value;
  if (validateAge(userAge)) {
    $(".age").css("display", "none");
  } else {
    $(".age").css("display", "block");
  }
});
function validateAge() {
  let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  return regex.test(userAge);
}

let userPass;
$("#pass").keyup(function (e) {
  userPass = e.target.value;
  if (validatePass(userPass)) {
    $(".pass").css("display", "none");
  } else {
    $(".pass").css("display", "block");
  }
});
function validatePass() {
  let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  return regex.test(userPass);
}

$("#repass").keyup(function (e) {
  let userRepass = e.target.value;
  if (userRepass === userPass) {
    $(".repass").css("display", "none");
  } else {
    $(".repass").css("display", "block");
  }
});
function validateButton() {
  if (
    validateAge(userAge) &&
    validateEmail(userEmail) &&
    validateName(userName) &&
    validatePass(userPass) &&
    validatePhone(userPhone)
  ) {
    document.querySelector("button").removeAttribute("disabled");
  } else {
    document.querySelector("button").disabled = true;
  }
}
$("input").keyup(function () {
  validateButton();
});
