# Edge Class

The Edge class exposes the whole API for rendering your templates. You can create a new instance of Edge as follows :

```ts
import { Edge } from 'edge.js';

const edge = new Edge()
```

A pre-configured instance of Edge is also exposed by the `edge.js` package. This instance come with all globals helpers already loaded. You can use it as follows :

```ts
import edge from 'edge.js'

edge.render('welcome')
```

## Edge Options
```ts
interface EdgeOptions {
  loader?: LoaderContract
  cache?: boolean
}
```

## use
- **Type**: `(pluginFn: (edge: this, firstRun: boolean, options: T) => void,
options?: T) => void`

Register a plugin. Plugin functions are called once just before an attempt to render a view is made.

```ts
import edge from 'edge.js'
import edgeIconify from 'edge-iconify'

edge.use(edgeIconify, pluginOptions)
```

## mount
- **Type**: `(diskName: string, dirPath?: string) => Edge`

Mount named directory to use views. Later you can reference the views from a named disk as follows.

```ts
edge.mount('admin', join(__dirname, 'admin'))
edge.render('admin::filename')
```

You can also not specify a disk name to define this volume as the default one :

```ts
edge.mount(join(__dirname, 'views'))
edge.render('filename')
```

## unmount
- **Type**: `(diskName: string) => Edge`

Unmount a named disk. For unmounting the default disk, use `default` as `diskName`.

```ts
edge.unmount('admin')
```

## global
- **Type**: `(name: string, value: any) => Edge`

Add a new global to the edge globals. Globals are available in all your templates.

```ts
edge.global('username', 'virk')
edge.global('time', () => new Date().getTime())
```

## registerTag

- **Type**: `(tag: TagContract) => Edge`

Register a new tag.

```ts
edge.registerTag('svg', {
  block: false,
  seekable: true,
  
  compile (parser, buffer, token) {
    const fileName = token.properties.jsArg.trim()
    buffer.writeRaw(fs.readFileSync(__dirname, 'assets', `${fileName}.svg`), 'utf-8')
  }
})
```

## registerTemplate

- **Type**: `(templatePath: string, contents: LoaderTemplate) => Edge`

Register an in-memory template.

```ts
edge.registerTemplate('button', {
  template: `
    <button class="{{ this.type || 'primary' }}">
      @!yield($slots.main())
    </button>
  `
})
```

Later you can use this template like this :

```edge
@component('button', type = 'primary')
  Get started
@endcomponent
```

## removeTemplate

- **Type**: `(templatePath: string) => Edge`

Remove the template registered using the "registerTemplate" method.

## getRenderer

Returns a new instance of EdgeRenderer. The instance can be used to define [locals](../docs//guide/data-flow.md#locals).

## render

- **Type**: `(templatePath: string, state?: any) => Promise<string>`

Render a template with optional state

```ts
const html = await edge.render('welcome', { username: 'julien' })
```

## renderSync

- **Type**: `(templatePath: string, state?: any) => string`

Render a template synchronously with optional state.

```ts
const html = edge.renderSync('welcome', { username: 'julien' })
```

## renderRaw

- **Type**: `(contents: string, state?: any, templatePath?: string) => Promise<string>`

Render a raw string with the given state.

```ts
const html = await edge.renderRaw(
  `<p> Hello {{ username }} </p>`,
  { username: 'virk' }
)
```

## renderRawSync

- **Type**: `(contents: string, state?: any, templatePath?: string) => string`

Render a raw string synchronously with the given state.

```ts
const html = edge.renderRawSync(
  `<p> Hello {{ username }} </p>`,
  { username: 'virk' }
)
```

## share

- **Type**: `(data: any) => EdgeRenderer`

Share [locals](../docs/guide/data-flow.md#locals) with the current view context.

```js
const view = edge.getRenderer()

// local state for the current render
view.share({ foo: 'bar' })

view.render('welcome')
```
