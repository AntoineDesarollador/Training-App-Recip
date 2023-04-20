

const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const searchContainer = document.querySelector(".search-box");

const searchResult = document.getElementById("result");

const UrlApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchMeal();
    }
})


function searchMeal() {
    const userInput = searchInput.value.trim();

    if(!userInput){
        searchResult.innerHTML = "<p> Votre recherche n'est pas valide</p>";
        return;
    };

    fetch(UrlApi + userInput).then((response) => response.json()).then((data) => {
        const meal = data.meal[0];

        if(!meal){
            searchResult.innerHTML = "<p> Il n'y a pas de resultats conforment a votre recherche</p>";
            return; 
        }

        const ingredients = getIngredients(meal);

        const recipeHtml = `
        <div class="details">
            <h2>${meal.strMeal}</h2>
            <h4>${meal.strArea}</h4>
        </div>
        <img src=${meal.strMealThumb} alt=${meal.strMeal} />
        <div id="ingre-container">
            <h3>Ingredients:</h3>
            <ul>${ingredients}</ul>
        </div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${meal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
    `;
    resultContainer.innerHTML = recipeHtml;

    const hide = document.getElementById("hide-recipe");
    hide.addEventListener("click", hideRecipe);

    const show = document.getElementById("show-recipe");
    show.addEventListener("click", showRecipe);

    searchContainer.style.opacity = '0';
    searchContainer.style.display = 'none';

    })

    .catch(() => {
        searchContainer.style.opacity = '1';
        searchContainer.style.display = 'grid';
        resultContainer.innerHTML = `<h3> Error fetching data! </h3>`;
    });

    function getIngredients(meal) {
        let ingreHtml = "";
        // There can be maximum of 20 ingredients
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasure${i}`];
                ingreHtml += `<li>${measure} ${ingredient}</li>`;
            }
            // If ingredient doesn't exist, exit loop
            else {
                break;
            }
        }
        return ingreHtml;
    }

    function hideRecipe(){

        const recipe = document.getElementById("recipe");
        recipe.style.display = "none";

    }

    function showRecipe(){
        const recipe = document.getElementById("recipe");
        recipe.style.display = "block";
    }

}


