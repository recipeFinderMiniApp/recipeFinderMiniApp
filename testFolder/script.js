const catagoryNameArray = [];
const ingredientNameArray = [];
const areaNameArray = [];

fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((response) => {
        return response.json();
    })
    .then((jsonResult) => {
        for (i = 0; i < jsonResult.meals.length; i++) {
            catagoryNameArray[i] = jsonResult.meals[i].strCategory;
        }
    });

fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    .then((response) => {
        return response.json();
    })
    .then((jsonResult) => {
        for (i = 0; i < jsonResult.meals.length; i++) {
            ingredientNameArray[i] = jsonResult.meals[i].strIngredient;
        }
    });

fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then((response) => {
        return response.json();
    })
    .then((jsonResult) => {
        for (i = 0; i < jsonResult.meals.length; i++) {
            areaNameArray[i] = jsonResult.meals[i].strArea;
        }
    });

fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
    .then((response) => {
        return response.json();
    })
    .then((jsonResult) => {
        console.log(jsonResult);
    });