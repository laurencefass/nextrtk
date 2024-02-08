import Session from "./Session";

export default function Page() {
  return <>
    <h1>Redux-Saga
      login/logout/registration</h1>
    <p>Check the content and registration tabs before and after logging out</p>
    <p>Username and password are admin/admin</p>
    <Session />
  </>
}