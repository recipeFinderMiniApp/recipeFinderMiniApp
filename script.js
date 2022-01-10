


// Create an app object for namespace 
recipeApp = {};


// save relevant API information
recipeApp.apiListUrl = "https://www.themealdb.com/api/json/v1/1/list.php"
recipeApp.apiSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php"
recipeApp.apiRandomSearchUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
recipeApp.apiSearchByCategory = "https://www.themealdb.com/api/json/v1/1/filter.php"


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
        
        const resultsClass = document.querySelector('#results')
        resultsClass.innerHTML = "";

        const select = document.querySelector('#categories');
        const categoryValue = select.options[select.selectedIndex].value;

        const searchUrl = new URL(recipeApp.apiSearchByCategory);
        searchUrl.search = new URLSearchParams({
            c: `${categoryValue}`
        });

        fetch(searchUrl)
            .then((response) => {
                return response.json();
            })
            .then((jsonResult) => {
                recipeApp.displayCategories(jsonResult.meals);
            })

            // ---------------------------------------------------------------------------

            .then((e) => {
                recipeApp.categoryRecipe(e);
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
        liElement.innerHTML = `${listItem.strMeal}`

        options.append(liElement);
    });
};



// Create a function to update the variable (userInput) based on user choice and input when the user chooses a dish by name
recipeApp.userRecipe = () => {
    const dishButton = document.querySelector('#dishButton')

    dishButton.addEventListener('click', function (event) {
        event.preventDefault();

        const ulElement = document.querySelector('ul')
        ulElement.innerHTML = "";

        const inputElement = document.querySelector(`input[type="text"]`)
        const userInput = inputElement.value

        // create an if statement to do nothing if the user hasn't inputted anything
        if (userInput) {

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
        };
    })
}



// Create a function to update the user's input based on the user's choice when the user chooses a dish by selecting from the list returned from the category
recipeApp.categoryRecipe = () => {
    const aElement = document.querySelectorAll('li')

    aElement.forEach((e) => {
        e.addEventListener('click', function (event) {
            event.preventDefault();

            const userInput = e.textContent;

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

            const ulElement = document.querySelector('ul')
            ulElement.innerHTML = "";
        })
    })



}


// create a function to fetch data for the random dish button
recipeApp.randomRecipe = () => {
    const randomButton = document.querySelector('#randomButton')

    randomButton.addEventListener('click', function (event) {
        event.preventDefault();

        fetch(recipeApp.apiRandomSearchUrl)
            .then((response) => {
                return response.json();
            })
            .then((jsonResult) => {
                recipeApp.displayRecipe(jsonResult.meals);

            });

        // create an if statement to do nothing if the user hasn't inputted anything

    })
}


// create a function to append fetched json data. (append to li that will reflect on DOM)
recipeApp.displayRecipe = (event) => {

    const recipeResult = document.querySelector('#results')
    event.forEach((recipe) => {
        const resultsClass = document.querySelector('#results')
        resultsClass.innerHTML = "";

        const divElement = document.createElement('div');
        divElement.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="">
            <p>${recipe.strInstructions}</p>`
        recipeResult.append(divElement);
    })
}


// create init function and add event listners to it
recipeApp.init = function () {
    recipeApp.categoryOptions();
    recipeApp.userRecipe();
    recipeApp.randomRecipe();
}


recipeApp.init();