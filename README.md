# MotoViaggiatori.it

Gastby + Netlify CMS powered blog.

## 🧰 Requirements

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com)
- [Git LFS](https://git-lfs.github.com)
- [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

On MacOS with Homebrew:

```shell
brew install node git git-lfs
npm install -g gatsby-cli
npm install -g netlify-cli
```

You may need to update global and system git config:

```shell
git lfs install
git lfs install --system
```

Configure Netlify Large Media & Credentials Helper:

```shell
brew tap netlify/git-credential-netlify
brew install git-credential-netlify
netlify login
netlify lm:info
```

## 🚀 Quick start

Clone this repository, then:

```shell
cd motoviaggiatori/
npm install
gatsby develop
```

## 🛠️ Development

Open [http://localhost:8000/](http://localhost:8000/) in your favorite browser to see a live reloading preview of the website.

Head to [http://localhost:8000/___graphql](http://localhost:8000/___graphql) to open the GraphiQL data explorer.

## ⌨️ Edit content

Edit website content in the Netlify CMS UI on [http://localhost:8000/admin/](http://localhost:8000/admin/).

On first login you will have to provide the site's URL: `https://motoviaggiatori.it`.

The auth callback will redirect to the production website, copy the url and replace the production url with `http://localhost:8000/admin/` leaving everything after the `#` untouched.`

## 💫 Deploy

Open a merge request to trigger Netlify preview deploy.

Merging on `master` branch will trigger a production deploy.
