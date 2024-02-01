import TodoList from '../components/TodoList/TodoList'

export default function TodoListPage() {
  return <>
    <h1>State is preserved across HMR reloads!</h1>
    <h2>without these <a href="https://redux-toolkit.js.org/usage/nextjs">redux mods</a> state will reset on every HMR</h2>
    <TodoList />
  </>
}
