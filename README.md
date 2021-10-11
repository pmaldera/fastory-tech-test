# Fastory Technical Test

## Quick launch

### Server
- `cd server`
- `npm install`
- `npm run dev`
- Server runs on [http://localhost:4000/](http://localhost:4000/) by default.

### App
- `cd app`
- `yarn install`
- `yarn start`
- App runs on [http://localhost:3000/](http://localhost:4000/) by default (with a proxy to [http://localhost:4000/](http://localhost:4000/)).

## CheckList
### Etape 1

#### Obligatoire
 - Création d'un back-end en Node permettant de récupérer les données de SWAPI ✔️ <br />
   - Implémentation d'un endpoint recherchant tout type de données sur la base de données. ✔️
   - L'API devra s'adapter aux besoins de la deuxième étape. ✔️


#### Optionnel
 - Système d'authentification qui doit vérifier ✔️
    - l'utilisateur: `Luke`
    - password: `DadSucks`
 - L'utilisation d'[HAPI](https://hapi.dev/) car les développeur de la rébellion l'apprécie. ✔️


### Etape 2
#### Obligatoire
 - Création d'un front-end en ReactJS permettant de rechercher facilement sur le back-end créé au préalable. ✔️ <br/>
   - Création d'un champ de recherche ✔️
   - Création d'un affichage par liste des résultats avec le nom ✔️
   - Création d'une fiche détaillant le résultat où sera présentée les informations de base ✔️

#### Optionnel
 - Faire des fiches ultra détaillées ✔️
   - Afficher des fiches differentes en fonction du type de donnée ✔️
 - Implémentation d'un router ✔️
   - Le router doit permettre d'accèder à n'importe quelle fiche ✔️
   - Il peut permettre d'accèder directement au résultat d'une recherche ✔️
 - Implémentation d'un système de filtre ✔️
   - Mettre en place un système de filtre par type de donnée (personnage, vaisseau, ...) ✔️
 - Mise en place d'un système d'authentification avec l'API ✔️
 - Utilisation de Redux ✔️
 - Utilisation du fonctionnel et de l'immutabilité ✔️
 - Un debounce pour la recherche ❌ (no time)
 - Mise en place de CSS modules ✔️

#### Bonus
Malgré les tensions entre l'Empire et le peuple Wookiee, il est étonnant de trouver dans leur base de données un moyen de traduire dans cette langue. ❌ (no time)


## Stacks
### Server
- [typescript](https://www.typescriptlang.org/) and types for all used packages.
- [hapi](https://hapi.dev/) and its plugins: logic, routes, auth, validation
- [node-fetch](https://github.com/node-fetch/node-fetch) to fetch the data from remote swapi API
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) passwords hashing


### App
- [typescript](https://www.typescriptlang.org/) and types for all used packages.
- [reach router](https://reach.tech/router/) smaller and lighter router than React Router.
- [redux](https://redux.js.org/) and [redux toolkit](https://redux-toolkit.js.org/introduction/getting-started) centralised state/store

