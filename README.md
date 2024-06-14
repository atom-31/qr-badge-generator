# qr-app

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)
- [Tailwind CSS](https://tailwindcss.com/docs/guides/emberjs)

## Installation

- `git clone <repository-url>` this repository
- `cd qr-app`
- `npm install`
  
## Install Tailwind
- `npm install -D tailwindcss postcss autoprefixer`
# or
- `yarn add -D tailwindcss postcss autoprefixer`
  
## Generate Tailwind Configuration Files:
- `npx tailwindcss init -p`

## Configure Tailwind CSS:
Open tailwind.config.js and configure it to purge unused styles in production:
- ```
  module.exports = {
  purge: ['./app/**/*.hbs', './app/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

## Running / Development

- `npm run start`
- Visit your app at [http://localhost:4200](http://localhost:4200).


