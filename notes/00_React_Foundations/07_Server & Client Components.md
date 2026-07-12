# <p align="center"> Server and Client Components </p>

To understand how Server and Client Components work, it's helpful to be familiar with two foundational web concepts:

- The `environments` your application code can be executed in: the server and the client.
- The `network boundary` that separates server and client code.

## Server and Client Environments
In the context of web applications:
* **The Client (The Browser):** The web browser running on the user's phone or computer. It sends requests to the server, gets data back, and builds the visual interface that users can click and touch.
* **The Server (The Data Center):** A powerful computer sitting in a cloud data center. It securely stores your application files, handles complex math/database calculations, and sends the correct pages back to the client.

| Environment | Best For... | Limitations |
| :--- | :--- | :--- |
| **Server** | Secure data fetching, heavy computations, hiding API keys. | Cannot use browser states like `useState()` or handle user clicks. |
| **Client** | Instant interactivity, animation transitions, reading user inputs. | Downloading too much code slows down the user's device. |

## The Network Boundary & RSC Payload
In a Next.js application, your component structure is split across two worlds. The line that divides them is called the **Network Boundary**.

### 1. What is the Network Boundary?

The Network Boundary is the conceptual line separating **Server Components** from **Client Components** inside your project tree. 

Instead of making your `whole page` a client-side component just because you need one interactive button, Next.js lets you cherry-pick exactly where to draw this line:
* **On the Server Side:** Keep static, heavy data components (like `Layout`, `Nav`, and `Posts`) on the server to save space and load instantly.
* **On the Client Side:** Push only the interactive elements that need browser state or clicks (like `Links` or `LikeButton`) across the boundary using `"use client"`.

### 2. The Two Behind-the-Scenes Trees
When you build your app, Next.js splits your single file structure into two distinct module maps:
1. **Server Module Graph:** The tree containing all your backend-rendered components.
2. **Client Module Graph:** The tree containing components flagged for the browser.

### 3. What is the RSC Payload?
> How does the browser know where to place your interactive Client Components if the layout is built on the server? 

Next.js solves this by sending a special, lightweight data format called the **React Server Component (RSC) Payload** to the browser.

The RSC Payload contains two things:
1. **The pre-rendered HTML result** of your Server Components.
2. **Placeholders (or holes)** showing exactly where Client Components belong, along with the links to download their specific JavaScript files.

## Using Client Components
To fix the state runtime crash, we need to extract our interactive button code out of our main server page file and move it into an isolated, dedicated client file.
### 1. The Strategy: Component Isolation
- We want our main webpage layout (`page.tsx`) to remain a fast, lightweight **Server Component**. 
- Therefore, we isolate only the interactive button element into its own file (`like-button.tsx`) and mark it with the `"use client"` directive.

### 2. The Code Implementation (TypeScript Stack)

1. **Create the Client Button File**
    - Create a new file inside your `app/` folder named **`app/like-button.tsx`** and add this code:
        ```tsx
        // app/like-button.tsx
        'use client'; // Tells Next.js to compile and run this code in the browser

        import { useState } from 'react';

        export default function LikeButton() {
        const [likes, setLikes] = useState<number>(0); // Typed as a number
        
        function handleClick(): void {
            setLikes(likes + 1);
        }
        
        return (
            <button onClick={handleClick} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Like ({likes})
            </button>
        );
        }
        ```
2. **Clean up and Import into the Main Page**
    ```tsx
    // app/page.tsx
    import LikeButton from './like-button'; // 👈 Import the client component

    interface HeaderProps {
    title?: string;
    }
    
    function Header({ title }: HeaderProps) {
    return <h1>{title ? title : 'Default title'}</h1>;
    }
    
    // This file has NO "use client" directive, meaning it stays a highly performant Server Component!
    export default function HomePage() {
    const names: string[] = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
    
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <Header title="Develop. Preview. Ship." />
        <ul>
            {names.map((name) => (
            <li key={name}>{name}</li>
            ))}
        </ul>
        
        {/* 3. Drop the interactive button here */}
        <LikeButton />
        </div>
    );
    }
    ```
--- 