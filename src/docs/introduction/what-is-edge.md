# What is Edge ?

Edge is a logical and batteries included template engine for Node.js. It can render any text-based format, whether is HTML, Markdown or plain text files.

Edge was originally developed for the AdonisJS framework as an alternative to other template engines in an attempt to solve some pain points we had with them.

Below we will compare Edge with other template engines to see what differences there may be.

## Edge vs. Pug
Unlike Pug, we don't re-invent the way you write the HTML. Edge is not even tied to HTML in the first place, and it can render any text-based files.

Pug :
```pug
h1= title
p Written with love by #{author}
p This will be safe: #{theGreat}
```

Edge :
```edge
<h1> {{ title }} </h1>
<p> Written with love by {{ author }} </p>
<p> This will be safe: {{ theGreat }} </p>
```

## Edge vs. Nunjucks
Unlike Nunjucks, Edge feels like writing JavaScript and not Python. As a result, the Edge has a small learning curve, is quicker to type, and supports all JavaScript expressions.

```
{% if happy and hungry %}
  I am happy *and* hungry; both are true.
{% endif %}

{{ "true" if foo else "false" }}
```

```edge
@if(happy && hungry)
  I am happy *and* hungry; both are true.
@endif

{{ foo ? "true" : "false" }}
```

## Edge vs. Handlebars
Unlike Handlebars, Edge is not restrictive. For example, you can use any JavaScript expression inside your templates, and we parse them using a spec-compliant JavaScript parser.

Whereas in Handlebars, you have to define custom helpers for every little thing. The story gets even worse when using multiple helpers together.

```ts
Handlebars.registerHelper('upperCase', function (aString) {
  return aString.toUpperCase()
})
```

```
{{upperCase lastname}}
```

In comparison to Handlebars, Edge doubles down on native JavaScript capabilities.

```edge
{{ lastname.toUpperCase() }}
```
