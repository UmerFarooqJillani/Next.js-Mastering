# <p align="center"> Getting Started with React </p>

To use React in your project, you need two packages:

- **react** is the core React library.
- **react-dom** provides DOM-specific methods that enable you to use React with the DOM.

## ES Modules (ECMAScript Modules)
The modern standard way JavaScript files share code with each other using `import` and `export` statements. 
* Instead of having one giant script file, ES modules let you split your code into clean, neat folders and import them only when you need them.

## CDN (Content Delivery Network) & esm.sh
A CDN is a global network of fast servers that deliver files to web browsers. 

**`esm.sh`** is a specific CDN that takes standard NPM packages (like React) and converts them into **ES Modules** so browsers can load them straight from a URL.

> Add an import map to the <head> of your index.html file: [04_index.html (With Details)](./src/04_index.html)

This will tell React to render our `<h1>` title inside our `#app` element.

If you try to run this code in the browser, you will get a syntax error:

**Terminal/Console:**
```
Uncaught SyntaxError: Unexpected token '<'
```
This is because `<h1>...</h1>` is not valid Javascript. This piece of code is **JSX**.

## What is JSX (JS XML)?
JSX is a syntax extension for JavaScript that allows you to describe your UI in a familiar HTML-like syntax. 

The nice thing about JSX is that apart from following `three JSX rules`, you don't need to learn any new symbols or syntax outside of HTML and JavaScript.
- **The 3 Strict JSX Rules**<br>
    When writing HTML inside JavaScript (JSX), you must known formatting rules:
    1. **Return a single root element:** You cannot return two tags standing side-by-side. You must wrap them in a single parent container tag like `<div>...</div>` or empty fragments `<>...</>`.
    2. **Close all tags:** Every single tag must be explicitly closed. Self-closing elements like `<img>` must end with a trailing slash: `<img />`.
    3. **camelCase naming:** Because JSX compiles directly into JavaScript object keys, HTML attributes must use JavaScript naming formats (e.g., use `className` instead of `class`, and `htmlFor` instead of `for`).

But browsers don't understand JSX out of the box, so you'll need a JavaScript compiler, such as a `Babel`(A translator tool that turns HTML-like code (`<h1>`) into normal JavaScript so the browser can read it without errors).

## Adding Babel to your project
To add Babel to your project, load it from a CDN in the <head> of your index.html file: [04_index.html (With Details-2)](./src/04_index.html)

- Open the file again and you'll see a different error:
    ```
    Uncaught TypeError: Failed to resolve module specifier "react/jsx-runtime"
    ```
When Babel compiles your JSX, it turns each tag into a call to a small helper that it imports from `react/jsx-runtime`. 

The browser doesn't know where that is, so add it to your import map: `"react/jsx-runtime": "https://esm.sh/react@latest/jsx-runtime?dev" `

--- 