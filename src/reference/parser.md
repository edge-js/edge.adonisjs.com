---
outline: deep
---

::: v-pre

# Parser

The parser purpose is to convert edge templates to a self invoked Javascript function.

The parser can be used in a standalone way as follows: 

```bash
npm i edge-parser
```

```ts
import { EdgeBuffer, Parser, Stack } from 'edge-parser'

const filename = 'eval.edge'
const statePropertyName = 'state'
const escapeCallPath = 'escape'
const outputVar = 'out'
const rethrowCallPath = 'reThrow'

const parser = new Parser({}, new Stack(), {
  statePropertyName,
  escapeCallPath,
})

const buffer = new EdgeBuffer(filename, { outputVar, rethrowCallPath })

parser
  .tokenize('Hello {{ username }}', { filename })
  .forEach((token) => parser.processToken(token, buffer))
```


- All the first set of `const` declarations are the config values that impacts the compiled output.
  - `filename` is required to ensure that exceptions stack traces point back to the correct filename.
  - `statePropertyName` is the variable name from which the values should be accessed. For example: `{{ username }}` will be compiled as `state.username`. Leave it to empty, if state is not nested inside an object.
  - `escapeCallPath` Reference to the `escape` method for escaping interpolation values. For example: `{{ username }}` will be compiled as `escape(state.username)`. The `escape` method should escape only strings and return the other data types as it is.
  - `outputVar` is the variable name that holds the output of the compiled template.
  - `rethrowCallPath` Reference to the `reThrow` method to raise the template exceptions with the current `$filename` and `$lineNumber`. Check the following compiled output to see how this function is called.


## API

::: warning
For some examples we will use the filename `eval.edge` and a random location, but remember that in a real use case you have to replace them with real values so that the stack traces lead to the exact location of the problem.
:::

### generateAST

- **Type**: `(jsArg: string, lexerLoc: LexerLoc, filename: string): any`

Parses a string as a Javascript expression. The output is a valid [Estree expression](https://github.com/estree/estree)

The following example returns a [BinaryExpression](https://astexplorer.net/#/gist/0b6250a81804270a026fe39e3bc33fb6/latest)

```ts
const loc = {
  start: { line: 1, col: 1 },
  end: { line: 1, col: 1 },
}
const filename = 'eval.edge'
parser.utils.generateAST('2 + 2', loc, filename)
```

### transformAst

- **Type**: `(astExpression: any, filename: string, parser: Parser): any`

Transform the acorn AST and make it compatible with Edge runtime. This method mutates the inner nodes of the original AST.

```ts
const loc = {
  start: { line: 1, col: 1 },
  end: { line: 1, col: 1 },
}
const filename = 'eval.edge'
parser.utils.transformAst(parser.utils.generateAST('2 + 2', loc, filename), filename)
```

### tokenize 

- **Type**: `(template: string, options: { filename: string; }): Token[]`

Returns an array of [lexer tokens](https://github.com/edge-js/lexer) for the given template. The method is a shortcut to self import the lexer module and then generating tokens.

```ts
const tokens = parser.tokenize('Hello {{ username }}', {
  filename: 'eval.edge',
})
```

**Output**

```json
[
  {
    "type": "raw",
    "line": 1,
    "value": "Hello "
  },
  {
    "type": "mustache",
    "filename": "eval.edge",
    "loc": {
      "start": {
        "line": 1,
        "col": 8
      },
      "end": {
        "line": 1,
        "col": 20
      }
    },
    "properties": {
      "jsArg": " username "
    }
  }
]
```

### stringify

- **Type** : `(astExpression: any) => string`

Convert edge or acorn expression back to a string. This is helpful, when you mutate some nodes inside the expression and now want a valid Javascript string out of it.

```ts
const expression = parser.utils.generateAST(
  '2 + 2',
  {
    start: { line: 1, col: 1 },
    end: { line: 1, col: 1 },
  },
  'eval.edge'
)
expression.left.value = 3
parser.utils.stringify(expression) // returns 3 + 2
```

### processToken

- **Type** : `(token: Token, buffer: EdgeBuffer): void`

You will often find yourself using this method as a tag author, when you want to recursively process all children of your tag

```ts
const byPass = {
  block: true,
  seekable: false,
  name: 'bypass',
  compile(parser, buffer, token) {
    token.children.forEach((child) => parser.processToken(child, buffer))
  },
}
```

and then use it as

```edge
@bypass
  Hello {{ username }}
@endbypass
```

## Supported Expressions

The following expressions are supported by the parser. Can you also access the list of supported expressions as

```js
import { expressions } from 'edge-parser'
```

### Identifier

The identifier are prefixed with `state.` In following statement `username` is the identifier

```edge
Hello {{ username }}
```

### Literal

A string literal

```edge
Hello {{ 'Guest' }}
```

### ArrayExpression

The `[1, 2, 3, 4]` is an array expression.

```edge
Evens are {{
  [1, 2, 3, 4].filter((num) => num % 2 === 0)
}}
```

### ObjectExpression

The `{ username: 'virk' }` is an Object expression

```edge
{{ toJSON({ username: 'virk' })  }}
```

### UnaryExpression

Following are examples of `UnaryExpression`.

```edge
{{ typeof(username) }}
{{ !!username }}
```

### BinaryExpression

Here `{{ 2 + 2 }}` is the binary expression

```edge
{{ 2 + 2 }} = 4
```

### LogicalExpression

Following is the example of `LogicalExpression`.

```edge
{{ username || admin.username }}
```

### MemberExpression

```edge
{{ username.toUpperCase() }}
```

### ConditionalExpression

```edge
{{ username ? username : 'Guest' }}
```

### CallExpression

```edge
{{ upper(username) }}
```

### SequenceExpression

Sequence is not supported in mustache blocks and instead used inside tags. For example:

Everything inside `()` is a sequence expression.

```edge
@component('button', text = 'Submit', type = 'Primary')
```

### TemplateLiteral

```edge
{{ Hello `${username}` }}
```

### ArrowFunctionExpression

```edge
{{
  users.map((user) => {
    return user.username
  })
}}
```

### AwaitExpression

```edge
{{ await foo() }}
```

### FunctionDeclaration

```edge
{{ function foo () {} }}
```

### BlockStatement

Here the `map` callback is the block statement

```edge
{{
  users.map(() => {})
}}
```

### ChainExpression

Support for optional chaining

```edge
{{ user?.username }}
```

### NewExpression

```edge
{{ new User() }}
```

### ReturnStatement
In the following example `return` keyword is a return statement

```ts
users.map((user) => {
  return user.username
})
```

### ThisExpression
Support for the this keyword

```edge
{{ this.state }}
```

### SpreadElement
Support for the spread element

```edge
{{ [...users] }}
```
