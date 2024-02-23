import ReactMarkdown from "react-markdown";
import TodoWidget from "./TodoList";
import { Accordion } from "@/lib/components/layout/Accordion/Accordion";

const markdown = `
## Wait! what's happening here? ...

Redux-Saga is not a design pattern in itself; rather, it's a library used in conjunction with Redux for managing side effects in applications built using React or any other framework. However, Redux-Saga is inspired by and implements the Saga design pattern, which is indeed a design pattern used for managing and handling long-lived transactions and side effects in a more controlled manner.

# Saga Design Pattern
The Saga design pattern is a way to manage distributed transactions across multiple microservices, databases, or external APIs in a way that maintains data consistency and integrity. It was first described by Hector Garcia-Molina and Kenneth Salem in 1987. The pattern ensures that if one part of the transaction fails, the system can compensate for those failures, usually by executing compensating transactions to undo the work done before the failure.

In the context of software development, a saga is a sequence of local transactions where each transaction updates data within a single service. If a transaction fails for some reason, the saga executes compensating transactions to rollback the changes made by the preceding transactions.

# Redux-Saga and the Saga Pattern
Redux-Saga applies the saga concept to managing side effects in Redux applications, such as data fetching, accessing browser cache, and more. It uses generator functions to make asynchronous flows easy to read, write, and test. By structuring side effects as sagas, developers can write complex side effects logic in a more manageable and efficient way.

# Key Points about Redux-Saga:

* Asynchronous Operations: It provides a powerful model for building complex asynchronous workflows and tasks in Redux applications.
* Side Effect Management: Redux-Saga handles side effects (such as API calls) outside of your Redux reducers. This keeps the reducers pure, focusing solely on the state changes.
* Declarative Effects: It uses a declarative style, allowing you to declare effects in your sagas without actually performing them. This makes the code easier to test and reason about.
* Concurrency Management: Redux-Saga offers various helpers for managing concurrency, such as forking tasks in the background, cancelling tasks, and more.

In summary, while Redux-Saga is not a design pattern but a library, it implements the saga design pattern principles for managing complex side effects in Redux applications, providing a structured approach to handle asynchronous operations and ensuring application state remains consistent and predictable.
`;

export default function TodoListPage() {
  return (
    <div className="content">
      <Accordion title="Todo list using Redux-Saga and the saga design pattern">
        <ReactMarkdown className="text-container">{markdown}</ReactMarkdown>
      </Accordion>
      <TodoWidget />
    </div>
  );
}
