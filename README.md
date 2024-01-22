# Graasp App Sketchfab

[![GitHub Release](https://img.shields.io/github/release/graasp/graasp-app-sketchfab)]()
![Cypress CI](https://github.com/graasp/graasp-app-sketchfab/actions/workflows/cypress.yml/badge.svg?branch=main)
![typescript version](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-app-sketchfab/dev/typescript)
<a href="https://gitlocalize.com/repo/9260?utm_source=badge"> <img src="https://gitlocalize.com/repo/9260/whole_project/badge.svg" /> </a>

## Getting Started

Fork this repo.

## Environment Variables

To start developing locally, you should create a `.env.local` file in your root folder with the
following content:

```dotenv
REACT_APP_API_HOST=http://localhost:3000
REACT_APP_ENABLE_MOCK_API=true
REACT_APP_GRAASP_APP_KEY=<key>
```

## Installing Dependencies

Make sure you have `node` and `yarn` installed on your local machine otherwise go
[here](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x) and install them;
then run `yarn` from the project directory to install all dependencies.

## Starting the Server

Navigate to the cloned or forked project directory using the command line, type `yarn start` and
the project will automatically run on `localhost:3000`.
