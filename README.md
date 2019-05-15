# MotoViaggiatori

[Gatsby](https://www.gatsbyjs.org/) powered blog. Content is stored as Markdown + Frontmatter files.

## Install

```sh
git clone git@gitlab.com:top-solution/motoviaggiatori.git
cd motoviaggiatori
npm install
cp .env.sample .env
```

Edit `.env` file and add fill in all the variables with correct values.

## Develop

Run `npm run start` or `gatsby develop` then head to <http://localhost:8000>

To query the data you can use GraphQL syntax on <http://localhost:8000/___graphql>

## Build

Run `npm run build` or `gatsby build`. Use `gatsby serve` to test the production build.

## Deploy

Built files are deployed to GitHub Pages running `npm run deploy`.

## Deploy & Continuous Delivery

The website is automatically built and deployed to GitHub Pages by [Travis CI](https://travis-ci.org) on each PR pushed on `master` branch.
