const Helper = require("protractor-helper");

class Pokedex {
  constructor() {
    this.searchInput = $("#searchInput");
    this.searchButton = $("#search");
    this.pokemonCard = $$(".results").$$(".animating");
    this.msgNoPokemonMatchedYourSearch = element(
      by.cssContainingText(".alert.alert-error", "No Pokémon Matched Your Search!")
    );
    this.bugType = element.all(by.cssContainingText("[data-type='type']", "T")).get(0);
    this.dragonWeakness = element.all(by.cssContainingText("[data-type='weakness']", "W")).get(2);
  }

  visit() {
    browser.get("");
  }

  searchPokemonByNameOrNumber(dataSearch = "") {
    Helper.clearFieldAndFillItWithText(this.searchInput, dataSearch);
    Helper.click(this.searchButton);
  }

  validatePokemonInfoOnPosition({ name, number, ability }, pokemonPositionOnResult) {
    const pokemonPositionOnArray = pokemonPositionOnResult--;
    const pokemonName = element.all(by.cssContainingText(".pokemon-info", name)).get(pokemonPositionOnArray);
    const pokemonNumber = element.all(by.cssContainingText(".pokemon-info", number)).get(pokemonPositionOnArray);
    const pokemonAbility = element.all(by.cssContainingText(".pokemon-info", ability)).get(pokemonPositionOnArray);
    const pokemonImage = $$(`src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${number}.png"`).get(
      pokemonPositionOnArray
    );
    Helper.waitForElementVisibility(pokemonName);
    Helper.waitForElementVisibility(pokemonNumber);
    Helper.waitForElementVisibility(pokemonAbility);
    Helper.waitForElementVisibility(pokemonImage);
  }
}

module.exports = new Pokedex();
