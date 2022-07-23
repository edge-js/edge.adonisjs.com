# Getting started

## Installation

Install the package from the NPM registry : 

```sh
# npm
npm i edge.js

# pnpm
pnpm add edge.js

# yarn
yarn add edge.js
```

## Usage example

```ts
import { join } from "node:path"
import { Edge } from 'edge.js'

/**
 * Creating the Edge renderer instance
 */
const edge = new Edge()

/**
 * Mount a directory that contains templates. 
 * From now, Edge will pick up the files from the given directory.
 */
edge.mount(join(__dirname, './views'))

/**
 * Ask Edge to generate the HTML for the template `welcome.edge`
 * in the directory `./views`
 */
const html = await edge.render('welcome', {
  greeting: 'Hello world !',
})
```

Next, create the `views/welcome.edge` file with the following content :

```edge
<p> {{ greeting }} </p>
```

## Pre-configured instance
A pre-configured instance of Edge with all [globals helpers](../../reference/globals.md) already loaded is exported by the package. To use it, do the following:

```ts
import { join } from "node:path"
import edge from 'edge.js'

edge.mount(join(__dirname, './views'))
const html = await edge.render('welcome', {
  greeting: 'Hello world !',
})
```
Now you will be able to use all globals helpers.

If you prefer to use your own instance of Edge, you can do the following for loading globals:

```ts
import { Edge, GLOBALS } from 'edge.js'

const edge = new Edge()
Object.keys(GLOBALS).forEach((key) => edge.global(key, GLOBALS[key]))
```

## AdonisJS Installation
For usage with AdonisJS please consult the [AdonisJS documentation](https://adonisjs.com/docs/edge).

## Editor Extensions
The following extensions will allow you to have syntax highlighting and possibly other cool features : 

- [VSCode](https://marketplace.visualstudio.com/items?itemName=jripouteau.adonis-vscode-extension&ssr=false)
- [Sublime Text](https://github.com/edge-js/edge-sublime)
- [Atom](https://github.com/edge-js/edge-atom-syntax)
- [Vim](https://github.com/watzon/vim-edge-template)
