'use client'

import ReactMarkdown from "react-markdown";
import { TodoWidget } from "./TodoList";
import { Accordion } from "@/lib/components/layout/Accordion/Accordion";

const markdown = `
Redux Listener Middleware is a direct alternative to Redux-Saga and Redux-Observable for managing effects in Redux apps.

It [contains the primitives](https://github.com/reduxjs/redux-toolkit/blob/03eafd5236f16574935cdf1c5958e32ee8cf3fbe/packages/toolkit/src/listenerMiddleware/tests/effectScenarios.test.ts) to create throttles, debounces, and other Saga functionality. 

both thunks and the createListenerMiddleware API are valuable parts of Redux Toolkit (RTK), each serving specific use cases within the Redux ecosystem. The introduction of listeners does not deprecate or diminish the role of thunks; rather, it expands the options developers have for managing side effects and asynchronous logic in their applications. The choice between using thunks or listeners depends on your specific use case, coding style preference, and the complexity of the asynchronous logic you need to handle.

## Use Cases for Thunks
Thunks are particularly well-suited for straightforward asynchronous operations where you need to dispatch actions before and after an asynchronous call. They allow you to write logic that can interact with the Redux store by dispatching actions or accessing the current state and are ideal for simpler async operations, such as fetching data from an API, where the sequence of actions is linear and relatively uncomplicated.

* Simplicity: For many use cases, thunks provide a simple and direct way to handle asynchronous logic.
* Familiarity: Developers who are accustomed to thunks may prefer to use them for consistency across their application.
* Direct Access to dispatch and getState: Thunks give you direct access to the Redux store's dispatch and getState methods, making it straightforward to perform asynchronous operations and state queries within a single function.

## Use Cases for Listeners
- Listeners, on the other hand, are designed to separate side effects from action creators, allowing you to respond to dispatched actions or state changes with more complex or conditional logic. They are particularly useful when you need to orchestrate more complex sequences of events in response to actions or state updates.
- Complex Workflows: Listeners can be more suitable for complex side effects that depend on a series of actions or specific state conditions, allowing you to separate the logic of when to perform an effect from the effect itself.
- Decoupled Logic: They help keep your action creators pure and focused solely on representing events, with side effects handled separately in a more decoupled manner.
- Enhanced Testability: By decoupling side effects, listeners can make certain parts of your application logic easier to test.

## Recommendation
- Use Thunks for Simple Asynchronous Operations: When your side effect logic is primarily making API calls or performing asynchronous operations that follow a simple, linear sequence of steps, thunks are often the simplest and most direct choice.
- Use Listeners for Complex Side Effect Orchestration: When you have complex side effects that need to respond dynamically to a variety of actions or state changes, or when you want to keep your action creators decoupled from side effect logic, listeners can provide a powerful alternative.

In practice, many applications can benefit from using both thunks and listeners, choosing the tool that best fits each particular scenario. The choice between thunks and listeners should be guided by the specific requirements of your application, the complexity of your asynchronous logic, and your team's preferences for managing side effects.
`;

export default function TodoListPage() {
  return (
    <div className="content">
      <Accordion title="Todo list using RTK native createListenerMiddleware">
        <ReactMarkdown className="text-container">{markdown}</ReactMarkdown>
      </Accordion>
      <TodoWidget />
    </div>
  );
}
