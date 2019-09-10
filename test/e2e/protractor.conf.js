const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

module.exports.config = {
  baseUrl: "https://www.pokemon.com/us/pokedex/",
  directConnect: true,
  specs: ["spec/*.spec.js"],
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: ["--headless"]
    }
  },
  onPrepare: () => {
    browser.waitForAngularEnabled(false);
    jasmine.getEnv().addReporter(
      new SpecReporter({
        suite: {
          displayNumber: true
        },
        spec: {
          displayFailed: true,
          displayPending: true,
          displayDuration: true,
          displayStackTrace: true
        },
        summary: {
          displayFailed: true
        }
      })
    );
  },
  jasmineNodeOpts: {
    random: true,
    print: function() {}
  }
};
