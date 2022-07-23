# Writing plugins

Edge has a simple but powerful plugin system that allows you. 

When you create a plugin, you can inline it in your codebase. There is no need to create a new package for it. When you find that a plugin has been useful in your projects, consider sharing it to help others in the ecosystem.

## Plugins Config

Plugin registration is done through the `edge.use` function which accepts the method of your plugin and its options:

```ts
import edge from 'edge.js'

edge.use(myPlugin, { someOption: true })
```

Your plugin function will be called with the the following parameters : 

```ts
(edge: Edge, firstRun: boolean, options: Record<string, any>)
```

- `edge` is the instance of [Edge](../../reference/edge.md) that is being used to render the view.
- `firstRun` is a boolean indicating if this is the first time the plugin method is being called.
- `options` is a record of options that were passed to the plugin through the `edge.use` method.

Note that plugin functions are called once just before an attempt to render a view is made.

::: tip
If you want your plugin method to be executed constantly before rendering a view, you can use the `recurring` option : 

```js{4}
import edge from 'edge.js'

edge.use(myPlugin, {
  recurring: true,
  someOption: true
})
```

This way, your method will be executed constantly, and `firstRun` will allow you to determine if this is the first time your method is invoked. This can be useful for registering globals only once, for example.
:::

## Simple example

Below we will see how to write a small plugin that exports some globals and tags. 

```ts
import edge from 'edge.js'
import type { EdgeContract } from 'edge.js'

function uiKitPlugin(
  edge: EdgeContract, 
  firstRun: boolean, 
  options: {
    withGlobals: boolean
  }
) {
  /**
   * Here we just register some globals based on 
   * the options passed to the plugin.
   */
  if (options.withGlobals) {
    edge.global('time', () => new Date().getTime())
    edge.global('sayHello', (username: string, age: number) => {
      return `Hello ${username}, you are ${age} years old`
    })
  }


  /**
   * Here we register a custom tags.
   */
  edge.registerTag({
    block: false,
    seekable: false,
    tagName: 'bonjour',

    compile(parser, buffer, token) {
      buffer.outputRaw('Bonjour');
    },
  });
}

/**
 * Register the plugin
 */
edge.use(uiKitPlugin, { withGlobals: true })
```

::: tip
For more complex custom tag creations, please consult the [documentation on this subject](./custom-tags.md).
:::
