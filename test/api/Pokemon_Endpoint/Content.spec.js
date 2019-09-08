const baseApiUrl = require("../constant").baseApiUrl;

const frisby = require("frisby");

const pokemonId = 100;
const pokemonEndpoint = `${baseApiUrl}/pokemon/${pokemonId}`;

describe(`Validate list content`, () => {
  it("Validate name and url from 'abilities' list", () => {
    return frisby
      .get(pokemonEndpoint)
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
      .get(pokemonEndpoint)
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
      .get(pokemonEndpoint)
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
      .get(pokemonEndpoint)
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
      .get(pokemonEndpoint)
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
      .get(pokemonEndpoint)
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
