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
  qrcode: {
    title: "QR code",
    url: "/qrcode",
  },
  api: {
    title: "News API",
    url: "/newsapi",
  },
  sockets: {
    title: "test sockets",
    url: "/socket",
  },
  verify: {
    title: "verify state",
    url: "/verify",
  },
  import: {
    title: "import tests",
    url: "/imports",
  },
  authenticate: {
    actions: {
      title: "cookie auth (actions)",
      url: "/actions/cookie-login",
    },
    jwt: {
      title: "jwt auth (actions)",
      url: "/actions/jwt-login",
    },
    api: {
      title: "cookie auth (api)",
      url: "/auth",
    },
    login: {
      title: "client only flow (rtk)",
      url: "/login",
    },
  },
  "parallel routes": {
    intercepts: {
      title: "intercepted routes",
      url: "/intercept",
    },
    sharetabs: {
      title: "shareable tabs",
      url: "/sharetabs",
    },
    root: {
      title: "route layouts",
      url: "/parallel",
    },
    settings: {
      title: "settings",
      url: "/parallel/settings",
    },
    configure: {
      title: "configure",
      url: "/parallel/configure",
    },
  },
  "cache tests": {
    fetch: {
      title: "cached fetch",
      url: "/cache/fetch",
    },
    counter: {
      title: "cached counter",
      url: "/cache/counter",
    },
    suspense: {
      title: "cached suspense",
      url: "/cache/suspense",
    },
  },
  "infinite scrollers": {
    sidebar: {
      title: "sidebar layout",
      url: "/infinite/sidebar",
    },
    column: {
      title: "single column",
      url: "/infinite/column",
    },
  },
  components: {
    modal: {
      title: "modal",
      url: "/modal",
    },
    accordion: {
      title: "accordion",
      url: "/accordion",
    },
    carousel: {
      title: "image Carousel",
      url: "/carousel",
    },
    useTransition: {
      title: "tab transitions",
      url: "/usetransition",
    },
  },
  "entity CRUD": {
    entity: {
      title: "simple CRUD",
      url: "/users/client",
    },
    "rsc entity": {
      title: "RSC CRUD",
      url: "/users/server",
    },
    relational: {
      title: "relational CRUD",
      url: "/library",
    },
  },
  "todo lists": {
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
  maplio: {
    title: "maplio",
    url: "/maplio",
  },
};

export default siteMap;
