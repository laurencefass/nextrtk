'use client'

import ReactMarkdown from "react-markdown";
import { TodoWidget } from "./TodoList";

const markdown = `
## Todo list using RTK native createListenerMiddleware

This provides side effects processing as an alternative to Redux-Saga and Redux-Observable
`;

export default function TodoListPage() {
  return (
    <>
      <TodoWidget />
      <div>
        <ReactMarkdown className="text-container">{markdown}</ReactMarkdown>
      </div>
    </>
  );
}
