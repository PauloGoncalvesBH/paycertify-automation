const Helper = require("protractor-helper");

const Pokedex = require("../page_objects/pokedex.po.js");

/**
 *  Not totally implemented, need some adjusts to run correctly.
 *  The 'pokemon.com/us/pokedex' page isn't e2e test friendly.
 */
xdescribe("Validate basic and advanced search", () => {
  beforeEach(() => {
    browser.driver.manage().deleteAllCookies();
    Pokedex.visit();
  });

  describe("Validate basic search", () => {
    const pokemon = {
      name: "voltorb",
      number: 100,
      ability: "Electric"
    };

    it("Basic search using name", () => {
      Pokedex.searchPokemonByNameOrNumber(pokemon.name);

      const pokemonPositionOnResult = 1;
      Pokedex.validatePokemonInfoOnPosition(pokemon, pokemonPositionOnResult);
      expect(Pokedex.pokemonCard.count()).toBe(1);
    });

    it("Basic search using number", () => {
      Pokedex.searchPokemonByNameOrNumber(pokemon.number);

      const pokemonPositionOnResult = 1;
      Pokedex.validatePokemonInfoOnPosition(pokemon, pokemonPositionOnResult);
      expect(Pokedex.pokemonCard.count()).toBe(1);
    });

    it("Basic search without number and name", () => {
      Pokedex.searchPokemonByNameOrNumber();

      expect(Pokedex.pokemonCard.count()).toBe(12);
    });
  });

  describe("Validate advanced search", () => {
    it("Advanced search with no pokemon matched", () => {
      Helper.click(Pokedex.bugType);
      Helper.click(Pokedex.dragonWeakness);
      Helper.click(Pokedex.searchButton);

      Helper.waitForElementVisibility(Pokedex.msgNoPokemonMatchedYourSearch);
      expect(Pokedex.pokemonCard.count()).toBeUndefined();
    });

    it("Advanced search with bug type only", () => {
      Helper.click(Pokedex.bugType);
      Helper.click(Pokedex.searchButton);

      expect(Pokedex.pokemonCard.count()).toBe(12);
      const bugAbility = element(by.cssContainingText(".abilities", "bug"));
      expect(Pokedex.pokemonCard).toContain(bugAbility);
    });
  });
});
