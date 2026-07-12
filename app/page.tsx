// app/page.tsx
"use client"; // <--- CRITICAL FIX: Tells Next.js this is an interactive Client Component

// app/page.tsx
import { useState } from 'react';
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