const frisby = require("frisby");

const pokemonEndpoint = `https://pokeapi.co/api/v2/pokemon`;

describe("Pokeapi security test using 'github.com/shieldfy/API-Security-Checklist'", () => {
  describe("Section 'Input'", () => {
    describe("Validate status '405 Method Not Allowed' when using not supported method", () => {
      it("Method POST", () => {
        return frisby.post(pokemonEndpoint, { foo: "bar" }).expect("status", 405);
      });

      it("Method PUT", () => {
        return frisby.put(`${pokemonEndpoint}/1`, { foo: "bar" }).expect("status", 405);
      });

      it("Method DEL", () => {
        return frisby.del(pokemonEndpoint).expect("status", 405);
      });

      it("Method FETCH - Passing POST", () => {
        return frisby
          .fetch(pokemonEndpoint, {
            method: "POST",
            body: JSON.stringify({
              foo: "bar"
            })
          })
          .expect("status", 405);
      });

      it("Method FETCH - Passing PUT", () => {
        return frisby
          .fetch(`${pokemonEndpoint}/1`, {
            method: "POST",
            body: JSON.stringify({
              foo: "bar"
            })
          })
          .expect("status", 405);
      });

      it("Method FETCH - Passing DEL", () => {
        return frisby
          .fetch(pokemonEndpoint, {
            method: "DEL"
          })
          .expect("status", 405);
      });
    });

    describe("Validate status '406 Not Acceptable' when sending a unsupported content-type", () => {
      it("Send content-type XML", () => {
        return frisby
          .setup({
            request: {
              headers: {
                "Content-Type": "application/xml"
              }
            }
          })
          .get(pokemonEndpoint)
          .expect("status", 406);
      });
    });
  });

  describe("Section 'Output'", () => {
    it("Send 'X-Content-Type-Options: nosniff' header", () => {
      return frisby.get(pokemonEndpoint).expect("header", "X-Content-Type-Options", "nosniff");
    });

    it("Send 'X-Frame-Options: deny' header", () => {
      return frisby.get(pokemonEndpoint).expect("header", "X-Frame-Options", "deny");
    });

    it("Send 'Content-Security-Policy: default-src 'none'' header", () => {
      return frisby.get(pokemonEndpoint).expect("header", "Content-Security-Policy", "default-src 'none'");
    });

    describe("Remove fingerprinting headers", () => {
      it("Validate don't have 'server' header", () => {
        return frisby.get(pokemonEndpoint).expectNot("header", "server");
      });
      it("Validate don't have 'x-powered-by' header", () => {
        return frisby.get(pokemonEndpoint).expectNot("header", "x-powered-by");
      });

      it("Validate don't have 'x-cloud-trace-context' header", () => {
        return frisby.get(pokemonEndpoint).expectNot("header", "x-cloud-trace-context");
      });

      it("Validate don't have 'x-served-by' header", () => {
        return frisby.get(pokemonEndpoint).expectNot("header", "x-served-by");
      });

      it("Validate don't have 'x-cache' header", () => {
        return frisby.get(pokemonEndpoint).expectNot("header", "x-cache");
      });

      it("Validate don't have 'x-cache-hits' header", () => {
        return frisby.get(pokemonEndpoint).expectNot("header", "x-cache-hits");
      });

      it("Validate don't have 'x-timer' header", () => {
        return frisby.get(pokemonEndpoint).expectNot("header", "x-timer");
      });
    });

    it("Force content-type for your response", () => {
      return frisby.get(pokemonEndpoint).expect("header", "content-type", "application/json; charset=utf-8");
    });

    describe("Return the proper status code according to the operation completed", () => {
      it("Validate status equal '200 OK'", () => {
        return frisby.get(pokemonEndpoint).expect("status", 200);
      });

      it("Validate status equal '400 Bad Request'", () => {
        return frisby.get(`${pokemonEndpoint}/1988887`).expect("status", 400);
      });

      it("Validate status equal '404 Not Found'", () => {
        return frisby.get(`${pokemonEndpoint}inexistentEndpoint`).expect("status", 404);
      });
    });
  });
});
