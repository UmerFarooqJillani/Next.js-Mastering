## <p align="center"> Explicit vs. Implicit </p>
**The Core Distinction**
- **Explicit:** means the developer writes clear, manual instructions.
- **Implicit:** means the compiler or runtime handles actions automatically behind the scenes based on context.

--- 
## <p align="center"> Understanding Interfaces: `TypeScript` vs. `Dart` </p>
An **Interface** is simply a **contract** or a **blueprint**. It enforces a strict rule about what data or properties an object *must* have, without caring about how that object works.
### The Real-World Analogy
- Think of an interface like an **ID Card form**. 
- **The form mandates:** *`You must list a Name and an Age.`* It doesn't care who you are; it just requires those two slots filled out to be valid.
### Stack Comparison: TypeScript vs. Dart

While both languages use interfaces to structure objects, they handle them slightly differently under the hood:

| Feature | TypeScript (`.ts` / `.tsx`) | Dart (`.dart`) |
| :--- | :--- | :--- |
| **Keyword** | Uses the explicit `interface` keyword. | Has **no** `interface` keyword! Every class is automatically an interface. |
| **Usage** | Used to shape standard JavaScript objects. | Used to force a Class to implement specific behaviors using `implements`. |

### Code Comparison Examples
1. **TypeScript Example (Shaping a Plain Object)**
    - In TypeScript, we use interfaces to make sure data objects contain the correct variables before we pass them around.
        ```tsx
        // 1. Defining the contract blueprint
        interface User {
        name: string;
        age: number;
        }

        // 2. Creating an object matching the contract
        const developer: User = {
        name: "Ada",
        age: 25
        }; // ✅ Valid!

        const brokenUser: User = {
        name: "Grace"
        }; // ❌ ERROR! Missing 'age' property.
        ```
2. **Dart Example (Shaping a Class Contract)**
    - In Dart, every class can act as an interface. We use the implements keyword to force another class to steal its shape.
        ```tsx
        // 1. The blueprint class
        class Vehicle {
        String brand = "";
        void move() {}
        }

        // 2. Enforcing the blueprint using 'implements'
        class Car implements Vehicle {
        @override
        String brand = "Toyota"; // Must be redefined!

        @override
        void move() {
            print("Driving on roads"); // Must be redefined!
        }
        }
        ```
--- 
