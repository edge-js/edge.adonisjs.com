::: v-pre
# Rendering

You can render views by calling the `edge.render` method. The method accepts the template path relative to the views directory and the data object to pass to the template. This method always returns a string value.

```ts
const html = await edge.render('welcome', { greeting: 'Hello' })
```

## Rendering modes
Edge exposes both the sync and the async API for rendering views. **We recommend using the async API**. In async mode, the I/O operations performed by Edge do not block the Node.js event loop.

In the following example:

- The user.edge file is read synchronously from the disk.
- Any internal references to load partials or components will be synchronous too.
- The template cannot use the `await` keyword. For example: `{{ await getUser() }}` will NOT work.

```ts
// ❌ awaiting the getUser call in the template with the
// following code will NOT work.

edge.renderSync('user', {
  getUser: async () => {},
})
```

Whereas the `edge.render` method is free from all the caveats of synchronous rendering : 

```ts
// ✅ awaiting the getUser call in the template with the 
// following code will work.

edge.renderSync('user', {
  getUser: async () => {},
})
```

## Disks

Edge allows you to specify **multiple root directories** for finding the templates. We call this concept a mounting disk. 

```ts
import { Edge } from 'edge.js'

const edge = new Edge()

edge.mount('mails', './mails')
edge.mount('app', './app')
```

You can render the views from the named disks by prefixing the disk name.

```ts
// renders mails/newsletter.edge
edge.render('mails::newsletter')

// renders app/homepage.edge
edge.render('app::homepage')
```

Similarly, you can prefix the disk name when including partials or components.

```edge
@include('app::header')

@component('app::button')
@end
```

## In-memory templates

Edge allows you to register in-memory templates without creating any file on the disk. You may find it helpful when you want to provide some templates as part of an npm package.

```ts
edge.registerTemplate('uikit/button', {
  template: `
    <button {{ $props.serializeExcept(['title']) }}>
      {{ title }}
    </button>
  `,
})
```
:::

You can render the template directly or use it as a component with the exact name given to the View.registerTemplate method.

```edge
@!component('uikit/button', {
  title: 'Signup',
  class: ['btn', 'btn-primary'],
  id: 'signup'
})
```

::: tip
The in-memory templates are given preference over the on-disk templates in case of a path conflict.
:::

## Rendering raw string

Edge also exposes the API to render raw string values directly as a template. However do note, that raw strings do not enjoy the benefits of template caching as there are not associated with a unique path.

```ts
const html = await edge.renderRaw(
  `<p> Hello {{ username }} </p>`,
  { username: 'virk' }
)
```

Use the `renderRawSync` method to render the raw string synchronously.

```ts
const html = edge.renderRawSync(
  `<p> Hello {{ username }} </p>`,
  { username: 'virk' }
)
```

## View renderer instances
Views in Edge are rendered using the [ViewRenderer](https://github.com/edge-js/edge/blob/develop/src/Renderer/index.ts) class. So every time you run the `edge.render` method, we create a new instance of the `ViewRenderer` class and then call the `render` method on it.

You can also get the renderer instance by calling the `edge.getRenderer()` method and use the `share` method to share data with the view.

```ts
const renderer = edge.getRenderer()

rendrerer.share({ url: '/', user: "julien" })
await renderer.render('home')
```

## Caching
Compiling a template to a JavaScript function is a time-consuming process, and hence it is recommended to cache the compiled templates in production.

You can control the template caching by passing a `cache` property when creating your Edge instance. So make sure to set the value to true when running your code in the production environment.

```ts
const edge = new Edge({ cache: true })
```

All of the templates are cached within the memory. Currently, we do not have any plans to support on-disk caching since the value provided for the efforts is too low.

The raw text does not take up too much space, and even keeping thousands of pre-compiled templates in memory should not be a problem.

