

const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input")

const searchResult = document.getElementById("result");

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

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

    
}


