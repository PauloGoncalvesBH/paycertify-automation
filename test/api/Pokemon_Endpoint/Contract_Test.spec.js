const baseApiUrl = require("../constant").baseApiUrl;

const frisby = require("frisby");
const joi = frisby.Joi;

const endpoint = "pokemon";
const apiUrl = `${baseApiUrl}/${endpoint}`;

const pokemonId = 100;

describe(`Contract test`, () => {
  it("Validate section Pokemon ", () => {
    return frisby
      .get(`${apiUrl}/${pokemonId}`)
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

  it("Validate section Pokemon.abilities", () => {
    return frisby
      .get(`${apiUrl}/${pokemonId}`)
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

  it("Validate section Pokemon.forms", () => {
    return frisby
      .get(`${apiUrl}/${pokemonId}`)
      .expect("status", 200)
      .expect("jsonTypesStrict", "forms.*", {
        name: joi.string().required(),
        url: joi
          .string()
          .uri()
          .required()
      });
  });

  it("Validate section Pokemon.game_indices", () => {
    return frisby
      .get(`${apiUrl}/${pokemonId}`)
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

  it("Validate section Pokemon.moves", () => {
    return frisby
      .get(`${apiUrl}/${pokemonId}`)
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

  it("Validate section Pokemon.stats", () => {
    return frisby
      .get(`${apiUrl}/${pokemonId}`)
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

  it("Validate section Pokemon.types", () => {
    return frisby
      .get(`${apiUrl}/${pokemonId}`)
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
