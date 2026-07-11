# <p align="center"> Building UI with Components (Core Concepts) </p>

## React core concepts
There are three core concepts of React that you'll need to be familiar with to start building React applications. 

**These are:**
- Components
- Props
- State


## Components
The building blocks of your app. Instead of writing one giant webpage, you break your User Interface (UI) down into small, isolated, reusable functions (e.g., a `Navbar`, a `Button`, or a `ProfileCard`).
### Creating components
In React, components are functions. Inside your `script `tag, create a new function called `header`.

[Playground File - 05_index.html](./src/05_index.html)

- To render this component to the DOM, pass it as the first argument in the `root.render()` method.
- But, wait a second. If you try to run the code above in your browser, you'll get an error. To get this to work, there are two things you have to do:
    1. React components should be capitalized to distinguish them from plain HTML and JavaScript: [Playground File - 05_index.html (Detail-2)](./src/05_index.html)
    2. you use React components the same way you'd use regular HTML tags, with angle brackets `<>`: [Playground File - 05_index.html (Detail-3)](./src/05_index.html)

### Nesting components
Applications usually include more content than a single component. You can nest React components inside each other like you would regular HTML elements.

In your example, create a new component called `HomePage`: [Playground File - 05_index.html (Detail-4)](./src/05_index.html)

--- 



