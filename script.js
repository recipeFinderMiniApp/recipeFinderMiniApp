


// Create an app object for namespace 
recipeApp = {};


// save relevant API information
recipeApp.apiListUrl = "https://www.themealdb.com/api/json/v1/1/list.php"
recipeApp.apiSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php"


// make a list of options to choose from different categories
// get the list from the api
recipeApp.categoryOptions = () => {
    const listUrl = new URL(recipeApp.apiListUrl);
    listUrl.search = new URLSearchParams({
        c: "list"
    });

    fetch(listUrl)
        .then((response) => {
            return response.json();
        })
        .then((jsonResult) => {
            recipeApp.displayOptions(jsonResult.meals)
        });
};

// display results from the api to the page
recipeApp.displayOptions = (event) => {
    const categories = document.querySelector('#categories');

    event.forEach((optionItem) => {
        const optionElement = document.createElement('option');
        optionElement.innerText = optionItem.strCategory;

        categories.append(optionElement);
    });

    recipeApp.getCategories();
};


// add event listners to each option in the drop down menu and random dish choice button
// when the button is clicked, search the api for the selected category
recipeApp.getCategories = () => {
    const categoryButton = document.querySelector('#categoryButton');

    categoryButton.addEventListener('click', function (event) {
        event.preventDefault();

        const select = document.querySelector('#categories');
        const categoryValue = select.options[select.selectedIndex].value;

        const searchUrl = new URL(recipeApp.apiSearchUrl);
        searchUrl.search = new URLSearchParams({
            s: `${categoryValue}`
        });

        fetch(searchUrl)
            .then((response) => {
                return response.json();
            })
            .then((jsonResult) => {
                recipeApp.displayCategories(jsonResult.meals);
            })

            // ---------------------------------------------------------------------------

            .then(() => {
                recipeApp.categoryRecipe();
            })
    });
}

// return the information from the api and display a list of meals to choose from onto the page
recipeApp.displayCategories = (event) => {
    const options = document.querySelector('.dishOptions');
    options.innerHTML = "";

    // if there are no recipes available for the specific category, let the user know 
    if (event == undefined) {
        options.innerHTML = 'No recipes available at the moment'
    };

    event.forEach((listItem) => {
        const liElement = document.createElement('li');
        liElement.innerHTML = `<a>${listItem.strMeal}</a>`

        options.append(liElement);
    });
};




// Create a function to update the variable (userInput) based on user choice and input when the user chooses a dish by name
recipeApp.userRecipe = () => {
    const dishButton = document.querySelector('#dishButton')

    dishButton.addEventListener('click', function (event) {
        event.preventDefault();

        const inputElement = document.querySelector(`input[type="text"]`)
        const userInput = inputElement.value
        console.log(userInput);

        const searchUrl = new URL(recipeApp.apiSearchUrl);
        searchUrl.search = new URLSearchParams({
            s: `${userInput}`
        });

        fetch(searchUrl)
            .then((response) => {
                return response.json();
            })
            .then((jsonResult) => {
                recipeApp.displayRecipe(jsonResult.meals);
            });
    })
}



// Create a function to update the user's input based on the user's choice when the user chooses a dish by selecting from the list returned from the category
recipeApp.categoryRecipe = () => {
    const aElement = document.querySelectorAll('a')
    // console.log(liElement);

    aElement.addEventListener('click', function (event) {
        event.preventDefault();
        

        const userInput = aElement.textContent;
        // console.log(userInput);

        const searchUrl = new URL(recipeApp.apiSearchUrl);
        searchUrl.search = new URLSearchParams({
            s: `${userInput}`
        });
        console.log(searchUrl);

        fetch(searchUrl)
            .then((response) => {
                return response.json();
            })
            .then((jsonResult) => {
                // console.log(jsonResult.meals);
                recipeApp.displayRecipe(jsonResult.meals);
            });

        const ulElement = document.querySelector('ul')
        ulElement.innerHTML = "";
    })
    
}


// not sure where to place this function to let it run on every li that is displayed
// recipeApp.categoryRecipe();



// create a function to append fetched json data. (append to li that will reflect on DOM)
recipeApp.displayRecipe = (event) => {

    const recipeResult = document.querySelector('#results')
    // const ingredientsList = document.querySelector('.ingredientsList')

    event.forEach((recipe) => {
        const divElement = document.createElement('div');
        divElement.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="">
            <p>${recipe.strInstructions}</p>`
            // <ul>
            //     <li>${recipe.ingredient}</li>
            // </ul>`
        recipeResult.append(divElement);
    })
}

// create a function to re-set



// create init function and add event listners to it

recipeApp.init = function () {
    recipeApp.categoryOptions();
    recipeApp.userRecipe();
    
}

recipeApp.init();