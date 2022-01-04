


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
            });
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







// Create a function (getUserInput) to update the variable (userInput) based on user choice and input

// create fucntion to form fetch request with userInput variables.

// create a function to append fatched json data. (append to li that will reflect on DOM)

// create a function to re-set



// create init function and add event listners to it

recipeApp.init = function () {
    recipeApp.categoryOptions();
}

recipeApp.init();