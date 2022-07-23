# Edge Supercharged

https://github.com/edge-js/edge-supercharged

Edge supercharged enables you to use your components as edge tags. It began by scanning all the templates stored inside the `./components` directory of your view root and make them available as tags.

::: tip 
For AdonisJS users : this package is already bundled by the `@adonisjs/view` package.
:::

## Usage

Install the package from npm registry as follows :
```
# npm
npm i edge-supercharged

# pnpm
pnpm add edge-supercharged

# yarn
yarn add edge-supercharged
```

And use it as follows :
```ts
import { Edge } from 'edge.js'
import { Supercharged } from 'edge-supercharged'

const edge = new Edge()
const supercharged = new Supercharged()

edge.use(supercharged.wire, {
  recurring: process.env.NODE_ENV === 'development'
})
```

During development, you must set the `recurring` option to true, so that Edge reapplies the plugin on each render call. This will allow `edge-supercharged` to re-discover the components from the filesystem.

## Creating components 

The components must live inside the `./components` directory relative to the views directory and then you can reference your components as tags.

Instead of using the component as follows :
```edge
@component('button', { type: 'submit' })
  <span> Submit form </span>
@end
```

You can use it as follows:
```edge
@!button({ type: 'submit' })
  <span> Submit form </span>
@end
```

You can reference the components inside the nested directories with a dot notation. For example, the file stored inside the `./components/form/input.edge` is referenced as follows:

```edge
@!form.input({
  type: 'text',
  placeholder: 'Enter username'
})
```

Following is a reference table to understand the transformations applied to the component path to compute the tag name.

| Template path | Tag name |
|---------------|-----------|
| form/input.edge | `@form.input` |
| tool_tip.edge | `@toolTip` |
| checkout_form/input.edge | `@checkoutForm.input` |

