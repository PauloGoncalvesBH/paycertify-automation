const baseApiUrl = require("../constant").baseApiUrl;

const frisby = require("frisby");
const joi = frisby.Joi;

const pokemonEndpoint = `${baseApiUrl}/pokemon`;
const pokemonId = 100;
const specificPokemonEndpoint = `${pokemonEndpoint}/${pokemonId}`;

describe(`Validate contract test - Without passing id`, () => {
  it("Validate JSON", () => {
    return frisby
      .get(pokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", {
        count: joi.number().required(),
        next: joi.string().required(),
        previous: joi.allow(null, true, false).required(),
        results: joi.array().required()
      });
  });

  it("Validate JSON.Results", () => {
    return frisby
      .get(pokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", "results.*", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });
});

describe(`Contract test of a specific pokemon`, () => {
  it("Validate JSON ", () => {
    return frisby
      .get(specificPokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", {
        id: joi.number().required(),
        name: joi.string().required(),
        base_experience: joi.number().required(),
        height: joi.number().required(),
        is_default: joi.boolean().required(),
        order: joi.number().required(),
        weight: joi.number().required(),
        abilities: joi.array().required(),
        forms: joi.array().required(),
        game_indices: joi.array().required(),
        held_items: joi.array().required(),
        location_area_encounters: joi.string().required(),
        moves: joi.array().required(),
        sprites: joi.object().required(),
        species: joi.object().required(),
        stats: joi.array().required(),
        types: joi.array().required()
      });
  });

  it("Validate JSON.abilities", () => {
    return frisby
      .get(specificPokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", "abilities.*", {
        is_hidden: joi.boolean().required(),
        slot: joi.number().required(),
        ability: joi.object().required()
      })
      .expect("jsonTypesStrict", "abilities[*].ability", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });

  it("Validate JSON.forms", () => {
    return frisby
      .get(specificPokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", "forms.*", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });

  it("Validate JSON.game_indices", () => {
    return frisby
      .get(specificPokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", "game_indices.*", {
        game_index: joi.number().required(),
        version: joi.object().required()
      })
      .expect("jsonTypesStrict", "game_indices[*].version", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });

  it("Validate JSON.moves", () => {
    return frisby
      .get(specificPokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", "moves.*", {
        move: joi.object().required(),
        version_group_details: joi.array().required()
      })
      .expect("jsonTypesStrict", "moves[*].move", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      })
      .expect("jsonTypesStrict", "moves[*].version_group_details.*", {
        level_learned_at: joi.number().required(),
        version_group: joi.object().required(),
        move_learn_method: joi.object().required()
      })
      .expect("jsonTypesStrict", "moves[*].version_group_details[*].version_group", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      })
      .expect("jsonTypesStrict", "moves[*].version_group_details[*].move_learn_method", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });

  it("Validate JSON.stats", () => {
    return frisby
      .get(specificPokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", "stats.*", {
        base_stat: joi.number().required(),
        effort: joi.number().required(),
        stat: joi.object().required()
      })
      .expect("jsonTypesStrict", "stats[*].stat", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });

  it("Validate JSON.types", () => {
    return frisby
      .get(specificPokemonEndpoint)
      .expect("status", 200)
      .expect("jsonTypesStrict", "types.*", {
        slot: joi.number().required(),
        type: joi.object().required()
      })
      .expect("jsonTypesStrict", "types[*].type", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });
});
