import TodoList from '@components/TodoList/TodoList'

export default function TodoListPage() {
  return <>
    <h2>Todo component using default RTK slices and reducers</h2>
    <p>See also the <a href="/saga/todo">saga implementation</a> and the <a href="/listener/todo">RTK listener implementation</a></p>
    <TodoList />
  </>
}
