# <p align="center"> Updating UI with Javascript </p>

```html
<!-- index.html -->
<html>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      // Select the div element with 'app' id
      const app = document.getElementById('app');
 
      // Create a new H1 element
      const header = document.createElement('h1');
 
      // Create a new text node for the H1 element
      const text = 'Develop. Preview. Ship.';
      const headerContent = document.createTextNode(text);
 
      // Append the text to the H1 element
      header.appendChild(headerContent);
 
      // Place the H1 element inside the div
      app.appendChild(header);
    </script>
  </body>
</html>
```
To make sure everything is working, open your HTML file inside your browser of choice. You should see an h1 tag that says, 'Develop. Preview. Ship.'.

## HTML vs. DOM
If you look at the DOM elements inside your `browser developer tools`, you will notice the DOM includes the `<h1>` element. The DOM of the page is different from the source code - or in other words, the original HTML file you created.

<div align="center">
<img src="./img/learn-dom-and-source.webp">
</div>

- This is because the HTML represents the initial page content, whereas the DOM represents the updated page content which was changed by the JavaScript code you wrote.
- Updating the DOM with plain JavaScript is very powerful but verbose. You've written all this code to add an `<h1>` element with some text:
    ```html
    <script type="text/javascript">
        const app = document.getElementById('app');
        const header = document.createElement('h1');
        const text = 'Develop. Preview. Ship.';
        const headerContent = document.createTextNode(text);
        header.appendChild(headerContent);
        app.appendChild(header);
    </script>
    ```
- As the size of an app or team grows, it can become increasingly challenging to build applications this way.
- With this approach, developers spend a lot of time writing instructions to tell the computer `how` it should do things. But wouldn't it be nice to describe `what` you want to show and let the computer figure out `how` to update the DOM?

## `Imperative` vs. `Declarative Programming`
### The Imperative Way (Vanilla JS)
> The code above is a good example of **imperative programming**. 

You have to manually target elements and write out every physical step to update the screen. If one step breaks, your whole UI crashes.
```javascript
// Step 1: Find the parent container
const app = document.getElementById('app');
// Step 2: Create a brand new h1 tag element
const header = document.createElement('h1');
// Step 3: Set the inner text content
header.textContent = 'Hello World';
// Step 4: Manually append it to the parent container
app.appendChild(header);
```
* **Imperative Programming (How):** Like walking into a kitchen and giving a chef detailed, step-by-step instructions on how to bake a pizza: *"First roll the dough, then spread 2 spoons of sauce, then add pepperoni, then bake at 180°C for 15 minutes."*
### The Declarative Way (React)
You simply declare exactly what you want to see on the screen. You don't write any DOM update steps.
```TypeScript
// You just state what you want. React handles the heavy lifting under the hood!
return <h1>Hello World</h1>;
```
* **Declarative Programming (What):** Like sitting down at a table and simply ordering a pizza from a menu: *"I want a pepperoni pizza, please."* You don't care *how* the oven works or *how* the chef rolls the dough; you just care about the final result.

--- 