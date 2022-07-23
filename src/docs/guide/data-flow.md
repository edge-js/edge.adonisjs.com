# Data Flow

Edge exposes different APIs for sharing the data with the templates. Each API changes the scope at which the data is available inside the templates.

## Template state

Template state is represented as an object that you can pass while rendering the view. For example:

```ts
const state = {
  user: { id: 1, username: 'virk' },
}

await edge.render('user', state)
```

The template state is available to the rendered template, its partials, and the layout it uses. In other words, the template state is not shared with the components.

## Globals

Globals are available to all the templates, including the components. You will usually use them to share helpers or application-wide metadata.

You can register a global using the `edge.global` method. For example, you can write the following code :

```ts
edge.global('nl2br', function (text) {
  return text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2')
})

edge.global('menu', [
  {
    url: '/',
    text: 'Home',
  },
  {
    url: '/about',
    text: 'About',
  },
  {
    url: '/contact',
    text: 'Contact',
  },
])
```

And use it in a template like this :

```edge
<p> {{{ nl2br(post.description) }}} </p>

@each(item in menu)
  <a href="{{ item.url }}"> {{ item.text }} </a>
@end
```

## Locals

Locals are like globals for a given instance of the [View renderer](./rendering.md#view-renderer-instances). You can share locals by using the `viewRenderer.share` method.

```ts
const renderer = edge.getRenderer()
renderer.share({ foo: 'bar' })

await renderer.render('home')
```

## Inline variables

Finally, you can also define inline variables within the template files using the `@set` tag.

```edge
@set('title', 'Edge - A template engine for Node.js')

<title> {{ title }} </title>
```

The inline variables have the same scope as you define a variable in JavaScript. For example: If the variable is defined inside the each block, you cannot access it outside the each block.

```edge
@each(item in cart)
  @set('price', item.quantity * item.unitPrice)
  {{ price }}
@end

{{ price }} {{-- undefined --}}
```
