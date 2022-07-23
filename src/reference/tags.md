# Tags

Below is the list of all availables tags that you can use in your Edge templates.

## component

The `@component` tag allows you to use an Edge template as a component. 

- It is a block level tag
- It accepts the template path relative from the `views` directory, along with the component state as the second argument.

```edge
@!component('components/button', {
  title: 'Hello world'
})
```

You can also derive the component name from a runtime value.

```edge
@!component(currentTheme.button, {
  title: 'Hello world'
})
```

## slot
The `@slot` tag allows you define the markup for the named slots. It accepts the slot name as the first argument and can also receive additional arguments from the component template.

```edge
@slot('main')
  This is the content for the main slot
@end
```

If the component passes any additional arguments to the slot, then you can access them as follows:

```edge
@slot('main', scope)
  {{ scope.title }}
@end
```

Since slots are regular functions, the component calls the function and passes it the arguments.

```edge
{{{ await $slots.main({ title: 'Hello world' }) }}}
```

## inject
The `@inject` tag allows the component template to [inject data](../docs/guide/components.md#injecting-data-to-the-component-tree) into the component tree. The tag accepts an object as the only argument.

```edge
@inject({ tabs: [] })
```

## debugger

The `@debugger` tag is an inline tag. It drops the `debugger` keyword to the template output. You can use the chrome devtools to debug the compiled templates.

```edge
@debugger
```

::video{url="https://res.cloudinary.com/adonis-js/video/upload/q_auto/v1618594355/v5/edge-debugger.mp4" controls}

## each
The `@each` tag let you loop over an array or an object of values.

- It is a block level tag
- It accepts a binary expression with `(in)` operator as the only argument.

```edge
@each(username in ['virk', 'nikk', 'romain'])
  {{ username }}
@end
```

You can access the array index as follows:

```edge
@each((username, key) in ['virk', 'nikk', 'romain'])
  {{ key }} - {{ username }}
@end
```

Similarly, you can also loop over objects.

```edge
@each((amount, ingredient) in {
  ketchup: '5 tbsp',
  mustard: '1 tbsp',
  pickle: '0 tbsp'
})
  Use {{ amount }} of {{ ingredient }}
@end
```

## if/elseif/else/unless

The `@if`, `@elseif` and the `@else` tags allows you to write conditionals inside the Edge templates. 

- The `@if` and the `@elseif` tag accepts the expression to evaluate as the only argument.
- Only the `@if` tag needs to be closed explicitly with the `@end` statement. Other tags must appear within the opening and closing if block.

```edge
<!-- Start if -->
@if(user.fullName)
  <p> Hello {{ user.fullName }}! </p>
@elseif(user.firstName)
  <p> Hello {{ user.firstName }}! </p>
@else
  <p> Hello Guest! </p>
<!-- End if -->
@end
```

You can use the `@unless` tag in place of the `@if` tag to write an inverse if statement.

```edge
@unless(account.isActive)
  <p> Please verify the email address to activate your account </p>
@end
```

## include/includeIf

The `@include` tag allows you include a partial to a given template.

- It is an inline tag.
- It accepts only a single argument, that is the partial path relative from the views directory.
- The partial have access to the parent template state.

```edge
@include('partials/header')
```

You can also use variables to define the partial path.

```edge
@include(headerPartial)
```

You can also make use of the `@includeIf` tag to include a partial conditionally. The first argument is the condition to evaluate before including the partial.

```edge
@includeIf(post.comments.length, 'partials/comments')
```

## layout

The `@layout` tag allows you define the layout template for the current template.

- The tag must be used on the first line of the template. Otherwise, it will be ignored.
- It is an inline tag and accepts the layout path.
- You cannot define a layout at runtime. The value has to be a static string, since layouts are processed at the compile time.

```edge
@layout('layouts/main')
```

## section
The template using the layout must define all the markup inside the sections exported by the layout. Any content outside of the `@section` tag is ignored.

- `@section` is a block level tag.
- It accepts the section name as the only argument.
- The section name has to be a static string. Runtime values are not allowed.
- All section tags must appear as top level tags. Meaning you cannot nest a section inside a conditional or a loop.

```edge
@layout('layouts/main')

@section('body')
  The content for the body section
@end

@section('footer')
  The content for the footer section
@end
```

The layout also has to export the sections with the same name.

```edge
@!section('body')
@!section('footer')
```

## super
The `@super` tag allows you to inherit the existing content of the section. It is an inline tag and does not accept any arguments.

```edge
@layout('layouts/main')

@section('scripts')
  @super
  <script src="{{ asset('autocomplete.js') }}"></script>
@end
```

## set

The `@set` tag allows you to define local variables within the template scope or mutate the value of an existing variable.

- It is an inline tag.
- It accepts the variable name as the first argument and its value as the second argument.

```edge
@set('title', 'AdonisJS - A fully featured framework')
```

Following is the compiled output

```js
let title = 'AdonisJS - A fully featured framework';
```

Re-defining the same variable will update the existing value.

```edge
@set('title', 'AdonisJS - A fully featured framework')
@set('title', 'AdonisJS - About page')
```

```js
let title = 'AdonisJS - A fully featured framework';
title = 'AdonisJS - About page';
```

The `@set` tag can also update the properties on an existing variable. The behavior is similar to the `lodash.set` method.

```edge
@set(post, 'title', 'New title')
@set(post, 'author.name', 'Virk')
```
