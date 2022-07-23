# Globals

Below is the list of globals that can be used in all your Edge templates.

::: warning
For using these globals, you need to use the pre-configured Edge instance that comes with the package, or manually add them to your instance.

See [Pre-configured instance](../docs/introduction/getting-started.md#pre-configured-instance) for more information.
:::

## inspect

The global helper to inspect a value or the entire state of the template. The helper method can pretty print the following JavaScript primitives.

```edge
{{
  inspect({
    a: 1,
    b: [3, 4, undefined, null],
    c: undefined,
    d: null,
    e: {
      regex: /^x/i,
      buf: Buffer.from('abc'),
      holes: holes
    },
    balance: BigInt(100),
    id: Symbol('1234'),
    scores: new Set([1, 2, 3]),
    classes: new Map([['english', '1st'], ['maths', '2nd']]),
    currentScores: new WeakSet([[1, 2, 3]]),
    currentClasses: new WeakMap([[['english', '1st'], ['maths', '2nd']]]),
    now: new Date()
  })
}}
```

Output

![](https://res.cloudinary.com/adonis-js/image/upload/q_auto,f_auto/v1617090065/v5/edge-inspect.png)

You can inspect the state of the entire view using the state variable.

```ts
inspect(state)
```

## truncate

The view helper truncates a given string value by the number of characters. For example:

```edge
{{
  truncate(
    'This is a very long sentence that i would like to be shortened',
    18
  )
}}

<!-- Output: This is a very long... -->
```

The `truncate` method doesn't chop the words in between and let them get completed. However, you can turn off this behavior by setting `completeWords` option to `false`.

```edge
{{
  truncate(
    'This is a very long sentence that i would like to be shortened',
    18,
    // highlight-start
    { completeWords: false }
    // highlight-end
  )
}}

// highlight-start
<!-- Output: This is a very lon... -->
// highlight-end
```

Also, you can define a custom suffix for the truncated string.

```edge
{{
  truncate(
    'This is a very long sentence that i would like to be shortened',
    18,
    { suffix: ' [Read more]' }
  )
}}

<!-- Output: This is a very long [Read more] -->
```

## excerpt

The view helper generates the excerpt from an HTML fragment. The return value removes the HTML tags and returns a plain string.

```edge
{{
  excerpt(
    '<p> Hello, this is a dummy <strong> post </strong> </p>',
    20
  )
}}

<!-- Output: Hello, this is a dummy... -->
```

The `excerpt` method doesn't chop the words in between and let them get completed. However, you can turn off this behavior by setting `completeWords` option to `false`.

```edge
{{
  excerpt(
    '<p> Hello, this is a dummy <strong> post </strong> </p>',
    20,
    // highlight-start
    { completeWords: false }
    // highlight-end
  )
}}

// highlight-start
<!-- Output: Hello, this is a du... -->
// highlight-end
```

Also, you can define a custom suffix for the truncated string.

```edge
{{
  excerpt(
    '<p> Hello, this is a dummy <strong> post </strong> </p>',
    20,
    { suffix: ' [Read more]' }
  )
}}

<!-- Output: Hello, this is a dummy [Read more] -->
```

## safe

The output of interpolation (the code inside the `curly braces`) is HTML escaped to avoid XSS attacks. However, at times you do want to render HTML without escaping and for that you can make use of three curly braces instead of two.

```edge
{{ '<p> I will be escaped </p>' }}
{{{ '<p> I will render as it is </p>' }}}
```

Another way to render HTML without escaping, is to make use of the `safe` method.

```edge
{{ safe('<p> I will render as it is </p>') }}
```

Using the `safe` method has no advantage over three curly braces. However, it becomes helpful, when you are creating your own global methods and want to render HTML from them without instructing the end user to use three curly braces.

```ts
View.global('input', (type: string, value: string) => {
  return View.GLOBALS.safe(`<input type="${type}" value="${value || ''}" />`)
})
```

And now you can use the `input` global inside the standard double curly braces.

```edge
{{ input('text', 'foo') }}
```

## stringify

The `stringify` method is very similar to the `JSON.stringify` but escaped certain HTML characters to prevent XSS attacks when passing data from the backend to the frontend script.

Consider the following example.

```edge
@set('userInput', "</script><script>alert('bad actor')</script>")

<script>
  console.log({{{ JSON.stringify(userInput) }}})
  console.log({{{ stringify(userInput) }}})
</script>
```

The `JSON.stringify` usage will execute the code as HTML, whereas the `stringify` method will not. Therefore, converting your back-end data structures to a JSON string using the `stringify` helper is recommended.

## camelCase
Convert a string to its `camelCase` version.

```edge
{{ camelCase('hello-world') }}

<!-- Output: helloWorld -->
```

---

## snakeCase
Convert a string to its `snake_case` version.

```edge
{{ snakeCase('helloWorld') }}

<!-- Output: hello_world -->
```

---

## dashCase
Convert a string to its `dash-case` version. Optionally, you can also capitalize the first letter of each segment.

```edge
{{ string.dashCase('helloWorld') }} <!-- hello-world -->

{{
  string.dashCase('helloWorld', { capitalize: true })
}} <!-- Hello-World -->
```

---

## pascalCase
Convert a string to its `PascalCase` version.

```edge
{{ pascalCase('helloWorld') }}

<!-- Output: HelloWorld -->
```

---

## capitalCase
Capitalize a string value.

```edge
{{ capitalCase('helloWorld') }}

<!-- Output: Hello World -->
```

---

## sentenceCase
Convert string to sentence case.

```edge
{{ sentenceCase('hello-world') }}

<!-- Output: Hello world -->
```

---

## dotCase
Convert string to its `dot.case` version.

```edge
{{ dotCase('hello-world') }}

<!-- Output: hello.world -->
```

---

## noCase
Remove all sorts of casing from a string.

```edge
{{ noCase('hello-world') }} <!-- hello world -->
{{ noCase('hello_world') }} <!-- hello world -->
{{ noCase('helloWorld') }} <!-- hello world -->
```

---

## titleCase
Convert a sentence to title case.

```edge
{{ titleCase('Here is a fox') }}

<!-- Output: Here Is a fox -->
```

---

## pluralize
Pluralize a word.

```edge
{{ pluralize('box') }} <!-- boxes -->
{{ pluralize('i') }} <!-- we -->
```

---

## toSentence
Join an array of words with a separator to form a sentence.

```edge
{{ 
  toSentence([
    'route',
    'middleware',
    'controller'
  ])
}}

<!-- route, middleware, and controller -->
```

You can also define the following options to customize the separators.

- `separator`: The value between two words except the last one.
- `pairSeparator`: The value between the first and the last word. Used, only when there are two words.
- `lastSeparator`: The value between the second last and the last word. Used, only when there are more than two words.

```edge
{{
  toSentence([
    'route',
    'middleware',
    'controller'
  ], {
    separator: '/ ',
    lastSeparator: '/or '
  })
}}

<!-- route/ middleware/or controller -->
```

---

## prettyBytes
Convert bytes value to a human readable string. Accepts and forwards all the options to the [bytes](https://www.npmjs.com/package/bytes) package.

```edge
{{ prettyBytes(1024) }} <!-- 1KB -->

{{
  prettyBytes(1024, { unitSeparator: ' ' })
}} <!-- 1 KB -->
```

---

## toBytes
Convert human readable string to bytes. This method is the opposite of the `prettyBytes` method.

```edge
{{ toBytes('1KB') }} <!-- 1024 -->
```

---

## prettyMs
Convert time represented in milliseconds to a human readable string.

```edge
{{ prettyMs(60000) }} <!-- 1min -->

{{ prettyMs(60000, { long: true }) }} <!-- 1 minute -->
```

---

## toMs
Convert human readable string to milliseconds. This method is the opposite of the `prettyMs` method.

```edge
{{ toMs('1min') }} <!-- 60000 -->
```

---

## ordinalize
Ordinalize a string or a number value.

```edge
{{ ordinalize(1) }} <!-- 1st -->
{{ ordinalize(99) }} <!-- 99th -->
```

---

## nl2br
Convert the newline charcaters with a `<br>` tag.

```ts
{{{ nl2br(post.content) }}}
```

When using the `nl2br` helper, you will have to use three curly braces to render the `<br>` tag a HTML instead of escaping it.

However, this will also render the HTML tags from the `post.content` variable. To overcome this situation, we recommend you to separately escape the user input before passing it to the `nl2br` method.

:::note
Following is the correct way of using the `nl2br` method. This ensures, the user input is always escaped.
:::

```ts
{{{ nl2br(e(post.content)) }}}
```

---

## e
Escape HTML inside a string value. The double curly braces already escape the value, so use this method only when you are not using the double curly braces.

```ts
{{{ e(post.content) }}}
```

---
