# PayCertify Automation

[![API library: FrisbyJs](https://img.shields.io/badge/API%20library-FrisbyJs-blue)](https://www.npmjs.com/package/frisby)
[![Audit library: lighthouse-ci](https://img.shields.io/badge/Audit%20library-lighthouse--ci-blue)](https://www.npmjs.com/package/lighthouse-ci)
[![Runner: jest](https://img.shields.io/badge/runner-jest-yellow)](https://www.npmjs.com/package/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://www.npmjs.com/package/prettier)

Automation to QA Engineer position

---

## Test

The following types of tests was implemented:
* **API** - Validating all test scenarios from the endpoint `https://pokeapi.co/api/v2/pokemon`.
* **Security** - Validating if the endpoint `https://pokeapi.co/api/v2/pokemon` agrees the most important security countermeasures to design, test and release an API. [See [API-Security-Checklist](https://github.com/shieldfy/API-Security-Checklist)]
* **Audit** - Validating if the web page `pokemon.com/us/pokedex/` follow development's best practices. The [lighthouse](https://www.npmjs.com/package/lighthouse) uses modern performance metrics and insights.
  * Analyze **`performance`, `acessibility`, `best-practices`, `seo`** and **`pwa`** score.
 
> 45 tests have been created so far

## Build
[![Build Status](https://semaphoreci.com/api/v1/paulogoncalvesbh/paycertify-automation/branches/master/shields_badge.svg)](https://semaphoreci.com/paulogoncalvesbh/paycertify-automation)

Build was configured on [semaphore](https://semaphoreci.com/paulogoncalvesbh/paycertify-automation) and runs all tests in parallel on every commit and in all branches.

## Executing

### Prerequisites

- [Git](https://git-scm.com/download/) and [Node.js](https://nodejs.org/en/download/) installeds.

### Installing dependencies and running tests

All the commands below are done in the _command prompt_.

**1** - Make a clone of the repository and access the directory created by the clone:

```sh
git clone https://github.com/PauloGoncalvesBH/paycertify-automation.git && cd paycertify-automation
```

**2** - Install the project dependencies:

```sh
npm install --production
```

**3** - And finally, enter the following command to run the tests:

```sh
npm test
```