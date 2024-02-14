export type MenuItem = {
  title: string;
  url: string;
  options?: { [key: string]: MenuItem };
};

export type MenuSection = {
  [key: string]: MenuItem;
};

export type MenuData = {
  [key: string]: MenuItem | MenuSection; // Now can be either a MenuItem directly or a MenuSection
};

const siteMap: MenuData = {
  home: {
    title: "Home",
    url: "/",
  },
  login: {
    title: "Login test",
    url: "/login",
  },
  verify: {
    title: "Verify state",
    url: "/verify",
  },
  "parallel routes": {
    root: {
      title: "parallel root",
      url: "/parallel",
    },
    settings: {
      title: "parallel settings",
      url: "/parallel/settings",
    },
  },
  "cache tests": {
    fetch: {
      title: "Cached fetch",
      url: "/cache/fetch",
    },
    counter: {
      title: "Cached counter",
      url: "/cache/counter",
    },
    suspense: {
      title: "Cached suspense",
      url: "/cache/suspense",
    },
  },
  components: {
    carousel: {
      title: "Image Carousel",
      url: "/carousel",
    },
    infinite: {
      title: "Infinite Scroll",
      url: "/infinite",
    },
  },
  "Entity CRUD": {
    entity: {
      title: "Simple CRUD",
      url: "/users/client",
    },
    "rsc entity": {
      title: "RSC CRUD",
      url: "/users/server",
    },
    relational: {
      title: "Relational CRUD",
      url: "/library",
    },
  },
  "TODO lists": {
    simple: {
      title: "simple todo",
      url: "/thunk/todo",
    },
    saga: {
      title: "saga todo",
      url: "/saga/todo",
    },
    listener: {
      title: "RTK listener todo",
      url: "/listener/todo",
    },
  },
};

export default siteMap;
