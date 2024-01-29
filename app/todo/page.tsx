import TodoList from '../components/TodoList/TodoList'

export default function TodoListPage() {
  return <>
    <h1>State is preserved across reloads!</h1>
    <h2><a href="https://redux-toolkit.js.org/usage/nextjs">without these mods</a> state will reset on every HMR</h2>
    <TodoList />
  </>
}
