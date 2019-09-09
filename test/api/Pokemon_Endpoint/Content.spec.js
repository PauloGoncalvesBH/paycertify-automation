const baseApiUrl = require("../constant").baseApiUrl;
const jsonFromPokemonVoltorb = require("./jsonFromPokemonVoltorb");
const jsonFromPokemon = require("./jsonFromPokemon");

const frisby = require("frisby");
const joi = frisby.Joi;

const pokemon = {
  id: 100,
  name: "voltorb"
};
const pokemonEndpoint = `${baseApiUrl}/pokemon`;
const specificPokemonEndpointWithId = `${pokemonEndpoint}/${pokemon.id}`;
const specificPokemonEndpointWithName = `${pokemonEndpoint}/${pokemon.name}`;

describe(`Validate content - Without passing id`, () => {
  it("Validate the json response from pokemon endpoint", () => {
    return frisby
      .get(pokemonEndpoint)
      .expect("status", 200)
      .expect("json", jsonFromPokemon);
  });

  it("Validate if the number of pokemons is equal count", () => {
    return frisby
      .get(pokemonEndpoint)
      .expect("status", 200)
      .then(response => {
        const count = response.json.count;
        return frisby
          .get(`${pokemonEndpoint}?limit=${count + 1}`)
          .expect("status", 200)
          .expect("jsonTypesStrict", {
            count: count,
            next: null,
            previous: null,
            results: joi.array().length(count)
          });
      });
  });
});

describe(`Validate list content of a specific pokemon`, () => {
  it("Validate the content using the pokemon name", () => {
    return frisby
      .get(specificPokemonEndpointWithName)
      .expect("status", 200)
      .expect("json", jsonFromPokemonVoltorb);
  });

  it("Validate the content using the pokemon id", () => {
    return frisby
      .get(specificPokemonEndpointWithId)
      .expect("status", 200)
      .expect("json", jsonFromPokemonVoltorb);
  });

  it("Validate name and url from 'abilities' list", () => {
    return frisby
      .get(specificPokemonEndpointWithId)
      .expect("status", 200)
      .then(response => {
        let abilityEndpoint = response.json.abilities[0].ability.url;
        let abilityName = response.json.abilities[0].ability.name;

        return frisby
          .get(abilityEndpoint)
          .expect("status", 200)
          .expect("json", {
            name: abilityName
          });
      });
  });

  it("Validate name and url from 'forms' list", () => {
    return frisby
      .get(specificPokemonEndpointWithId)
      .expect("status", 200)
      .then(response => {
        let formsEndpoint = response.json.forms[0].url;
        let formsName = response.json.forms[0].name;

        return frisby
          .get(formsEndpoint)
          .expect("status", 200)
          .expect("json", {
            name: formsName
          });
      });
  });

  it("Validate name and url from 'game_indices' list", () => {
    return frisby
      .get(specificPokemonEndpointWithId)
      .expect("status", 200)
      .then(response => {
        let gameIndicesEndpoint = response.json.game_indices[0].version.url;
        let gameIndicesName = response.json.game_indices[0].version.name;

        return frisby
          .get(gameIndicesEndpoint)
          .expect("status", 200)
          .expect("json", {
            name: gameIndicesName
          });
      });
  });

  it("Validate name and url from 'moves' list", () => {
    return frisby
      .get(specificPokemonEndpointWithId)
      .expect("status", 200)
      .then(response => {
        let movesEndpoint = response.json.moves[0].move.url;
        let movesName = response.json.moves[0].move.name;

        return frisby
          .get(movesEndpoint)
          .expect("status", 200)
          .expect("json", {
            name: movesName
          });
      });
  });

  it("Validate name and url from 'stats' list", () => {
    return frisby
      .get(specificPokemonEndpointWithId)
      .expect("status", 200)
      .then(response => {
        let statsEndpoint = response.json.stats[0].stat.url;
        let statsName = response.json.stats[0].stat.name;

        return frisby
          .get(statsEndpoint)
          .expect("status", 200)
          .expect("json", {
            name: statsName
          });
      });
  });

  it("Validate name and url from 'types' list", () => {
    return frisby
      .get(specificPokemonEndpointWithId)
      .expect("status", 200)
      .then(response => {
        let typesEndpoint = response.json.types[0].type.url;
        let typesName = response.json.types[0].type.name;

        return frisby
          .get(typesEndpoint)
          .expect("status", 200)
          .expect("json", {
            name: typesName
          });
      });
  });
});
