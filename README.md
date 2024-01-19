
# Redux Toolkit TypeScript Example

Incubator to enable me to get up to speed and test Next JS 14.0, Redux Toolkit 2.0, Redux core 5.0, Reselect 5.0, and Redux Thunk 3.0. i.e. latest versions at time of testing. I will try to keep this updated with minor version changes, but will probably create new repos for any major version changes.

# Features

## Completed

* Counter Actions
* Asynchronous Thunks
* Todo List Actions

## Planned

* Nested Suspense and Error handling demo
* Parallel routes demo
* Streaming data from sockets to client components

# Live example

This might break from time to time. Feel free to fork it so you can do the same at your leisure.

[Syntapse Next RTK](https://nextrtk.syntapse.co.uk)

or fork and run on localhost:3000

# Docker notes

To run in a container: docker-compose up -d

To run locally: npm i, npm run dev, then visit localhost:3000

docker-compose.yml contains environment variables to route to app using my specific docker setup. Change environment variables according to your own system setup.

Always run npm commands inside the container as it is running a higher version  of node and npm than the host. trying to install anything from the host will break the package-lock file so always run npm in the container

# (Inherited vercel README blurb)

This example shows how to integrate Next.js with [Redux Toolkit](https://redux-toolkit.js.org).

The **Redux Toolkit** is a standardized way to write Redux logic (create actions and reducers, setup the store with some default middlewares like redux devtools extension). This example demonstrates each of these features with Next.js

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-redux&project-name=with-redux&repository-name=with-redux)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-redux with-redux-app
```

```bash
yarn create next-app --example with-redux with-redux-app
```

```bash
pnpm create next-app --example with-redux with-redux-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
