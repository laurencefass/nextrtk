import { Suspense } from 'react';
import { Client } from './Client';
import { Component } from './Component';
import { Users } from './Users';
import UserManager from '@components/Users/Users'
import { readFromFile } from '@utils/server';

let count = 0;
setInterval(() => {
  count++;
}, 1000)

export default async function Server() {
  console.log('Page component rendered on the server');
  let users = await readFromFile("users.json");

  return <>
    {users && <UserManager userList={users} />}
    <div className="text-container">
      <h1>Other RSC tests</h1>
      <div className="block-container">
        <Component name="Page level Server Component" />
      </div>
      <h2>This count increments on each page load indicating that the server component is not cached {count}</h2>
      <Client />

      <h2>This block demonstrates nested Suspense boundaries. These will not reload on HMR</h2>
      <div className="bordered">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component className="bordered" delay={1000} name="Component 1">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Component className="bordered" delay={5000} name="Component 1-1" />
            </Suspense>
            <Suspense fallback={<h1>Loading...</h1>}>
              <Component className="bordered" delay={6000} name="Component 1-2" />
            </Suspense>
          </Component>
        </Suspense>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component className="bordered" delay={2000} name="Component 2">
            <Suspense fallback={<h1>Loading...</h1>}>
              <Component className="bordered" delay={7000} name="Component 2-2" />
            </Suspense>
          </Component>
        </Suspense>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component className="bordered" delay={3000} name="Component 3" />
        </Suspense>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component className="bordered" delay={4000} name="Component 4" />
        </Suspense>
      </div>
    </div>
  </>
}