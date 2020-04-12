[![Netlify Status](https://api.netlify.com/api/v1/badges/553b8ffb-84e7-4144-b813-48767420b680/deploy-status)](https://app.netlify.com/sites/motoviaggiatori/deploys)

# MotoViaggiatori

[Gatsby](https://www.gatsbyjs.org/) powered blog. Content is stored as Markdown + Frontmatter files and continuously delivered to [Netlify CDN](https://www.netlify.com).

## Install

```sh
git clone git@github.com:destegabry/motoviaggiatori.git
cd motoviaggiatori
npm install
cp .env.sample .env
```

Edit `.env` file and add fill in all the variables with correct values.

## Develop

Run `npm run start` or `gatsby develop` then head to <http://localhost:8000>

To query the data you can use GraphQL syntax on <http://localhost:8000/___graphql>

## Build

Run `npm run build` or `gatsby build`. Use `gatsby serve` to test the production build.

## Deploy & Continuous Delivery

The website is automatically built and deployed to Netlify on each PR pushed on `master` branch.

## Netlify manual deploy

Install Netflify CLI:

```sh
npm install netlify-cli -g
```

Then build and deploy:

```sh
npm run build
npm run deploy
```
