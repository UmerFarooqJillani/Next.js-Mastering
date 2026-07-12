# <p align="center"> Installing Next.js </p>

When you use Next.js in your project, you do not need to load `react` and `react-dom` from a CDN with an import map anymore. Instead, you can install these packages locally using `npm` or your preferred package manager.

## Step 1: Initialize Your Project (`package.json`)
1. create a new file in the same directory as your `index.html` file, called `package.json` with an empty object `{}`.
2. In your `terminal`, run the following command in the root of your project:
    ```bash
    npm install react@latest react-dom@latest next@latest
    ```
3. Once the installation is complete, you should be able to see your project dependencies listed inside your `package.json` file:
    ```json
    // package.json
    {
    "dependencies": {
        "next": "^14.0.3",
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
    }
    }
    ```
    - **What Happens Behind the Scenes:**
        - **node_modules/ folder appears:** Contains the physical downloaded code for Next.js and React.
        - **package-lock.json appears:** Records the exact versions of the packages installed.
        - **package.json updates automatically**
## Step 2: Cleaning Up the Code (Deleting the CDN Garbage)
Because Next.js has its own built-in compiler, we can strip out all the old manual HTML setup blocks.

**Delete these from your old file:**
1. The `<html>`, `<head>`, and `<body>` tags.
2. The `<div>` element with the id of app.
3. The import map, since you've installed `react` and `react-dom` with NPM.
4. The **Babel script** because Next.js has a compiler that transforms JSX into valid JavaScript browsers can understand.
5. The `<script type="text/babel">` tag.
6. The `import { createRoot }` line, plus the `document.getElementById()` and `createRoot()` methods.
7. The `React.` part of the `React.useState(0)` function

## Step 3: Upgrading to Your Tech Stack (TypeScript Adaptation)
After deleting the lines above, change the import React from 'react' line at the top of your file to import useState directly:
```tsx
// index.html
import { useState } from 'react';
```
- Your code should look like this:
    ```tsx
    // index.html
    // 1. Define the TypeScript type for the incoming props
    interface HeaderProps {
        title?: string; // The "?" means this string is optional
    }

    function Header({ title }: HeaderProps) {
        return <h1>{title ? title : 'Default title'}</h1>;
    }
    // 2. We use "export default" so Next.js knows this is the primary component for the route
    export default function HomePage() {
        const names: string[] = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

        const [likes, setLikes] = useState(0);   // Explicitly typing our state as a number

        function handleClick() {
            setLikes(likes + 1);
        }

        return (
            <div>
                <Header title="Develop. Preview. Ship." />
                <ul>
                    {names.map((name) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>

                <button onClick={handleClick}>Like ({likes})</button>
            </div>
        );
    }
    ```
- The only code left in the HTML file is JSX, so you can change the file type from `.html` to `.js` , `.jsx` or `.tsx` (For Typescript).

## Step 4: Creating your first page
Next.js uses file-system routing. This means that instead of using code to define the routes of your application, you can use folders and files.

**Here's how you can create your first page in Next.js:**
- Create a new folder called `app` and move the `index.tsx` file inside it.
- Rename your `index.tsx` file to `page.tsx`. This will be the main page of your application.
- Add **export default** to your `<HomePage>` component to help `Next.js` distinguish which component to render as the main component of the page.
    ```tsx
    interface HeaderProps {
        title?: string; // The "?" means this string is optional
    }

    function Header({ title }: HeaderProps) {
        return <h1>{title ? title : 'Default title'}</h1>;
    }
    // 2. We use "export default" so Next.js knows this is the primary component for the route
    export default function HomePage() {
        // ...
    }
    ```
## Step 5: Running the development server
Add a "next dev" script to your `package.json` file:
```json
{
  "scripts": {
    "dev": "next dev"
  },
  "dependencies": {
    "next": "^14.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```
> Check what happens by running `npm run dev` in your terminal. You'll notice two things:
1. When you navigate to `localhost:3000`, you should see the following error:
    <div align="center">
    <img src="./img/learn-usestate-rsc-error.webp">
    </div>

    - This is because Next.js uses React Server Components, a new feature that allows React to render on the server. Server Components don't support `useState`, so you'll need to use a Client Component instead.
    - In the next File, we'll discuss the main differences between Server and Client Components and fix this error.
2. A new file called `layout.js` was automatically created inside the `app` folder. This is the main layout of your application. You can use it to add UI elements that are shared across all pages (e.g. navigation, footer, etc).
    ```tsx
    // app/layout.tsx
    import { ReactNode } from 'react';

    // SEO Configuration Metadata: Next.js reads this to inject tags into the HTML header automatically
    export const metadata = {
        title: 'Next.js Learning Hub',
        description: 'Generated by Next.js',
    };

    interface RootLayoutProps {
        children: ReactNode; // Represents whatever page component Next.js is currently rendering
    }

    export default function RootLayout({ children }: RootLayoutProps) {
        return (
            <html lang="en">
                {/* The layout defines the global HTML shell. 
            The {children} expression injects your current route page (like app/page.tsx) 
            directly inside the body tags!
        */}
                <body>{children}</body>
            </html>
        );
    }
    ```

## Fixing the Error: What is a Server Component?
### The Problem:
By default, **every folder and file you create inside the Next.js App Router is a React Server Component (RSC)**. These components are executed completely on the server (backend). Because they never send their internal JavaScript logic to the browser, they **do not support browser-based features** like:
* Interactivity hooks (`useState`, `useEffect`)
* Browser events (`onClick`, `onChange`)

Because our `page.tsx` file uses `useState` and `onClick` to handle our counter, Next.js throws an error because the server doesn't know what a "click" is!

### The Solution (`"use client"`):
To fix this, we must explicitly tell Next.js to download this component's logic to the browser. We do this by writing the special string **`"use client";`** at the **very top** of our file before any imports.
- **Update your `app/page.tsx` code like this:**
```tsx
// app/page.tsx
"use client"; // <--- CRITICAL FIX: Tells Next.js this is an interactive Client Component

import { useState } from 'react';

interface HeaderProps {
  title?: string;
}

function Header({ title }: HeaderProps) {
  return <h1>{title ? title : 'Default title'}</h1>;
}
/* 
...
*/
```

--- 