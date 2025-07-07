# Angular Predictive Hydration with Foresight.js

An example Angular project demonstrating how to use [ForesightJS](https://foresightjs.com/) to predictively hydrate components. By tracking user behavior, it pre-hydrates components just before they are needed, resulting in a faster, more responsive UI.

## Brief Logic

1.  The application is server-rendered with lightweight placeholders for components.
2.  On the client, **Foresight.js** monitors the user's mouse movements to predict which element they will interact with next.
3.  When Foresight.js predicts an interaction, it executes a callback.
4.  This callback updates an Angular `signal` tied to the `hydrate when` condition of an `@defer` block.
5.  The signal change prompts Angular to hydrate the full component, making it interactive just in time for the user.

## Getting Started

### Run the Project

```bash
# 1. Clone the repository
git clone <repository-url>
cd <repository-name>

# 2. Install dependencies
npm install

# 3. Run the application in SSR mode
npm run start
```

Now, open your browser navigate to `http://localhost:4200` and oprn Angular Devtools and **turn on "Show hydration overlay" toggle**. You can monitor the console and use the Foresight.js devtools to see the predictive hydration in action