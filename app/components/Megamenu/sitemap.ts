export type MenuItem = {
    title: string;
    url: string;
    options?: { [key: string]: MenuItem }; // Optional property to allow nested menu items
};

export type MenuSection = {
    [key: string]: MenuItem;
};

export type MenuData = {
    [key: string]: MenuSection;
};

export const siteMap: MenuData = {
    services: {
      webDesign: {
        title: "Web Design",
        url: "/services/web-design"
      },
      webDevelopment: {
        title: "Web Development",
        url: "/services/web-development"
      },
      seo: {
        title: "SEO Services",
        url: "/services/seo"
      }
    },
    products: {
      cms: {
        title: "Content Management System",
        url: "/products/cms"
      },
      eCommerce: {
        title: "eCommerce Solutions",
        url: "/products/ecommerce"
      },
      crm: {
        title: "Customer Relationship Management",
        url: "/products/crm"
      }
    },
    prices: {
      packages: {
        title: "Pricing Packages",
        url: "/prices/packages"
      },
      calculator: {
        title: "Price Calculator",
        url: "/prices/calculator"
      },
      discounts: {
        title: "Discounts & Offers",
        url: "/prices/discounts"
      }
    },
    technologies: {
      frontEnd: {
        title: "Front-end Technologies",
        url: "/technologies/front-end",
        options: {
            react: {
                title: "React",
                url: "/technologies/front-end/react"        
            },
            angular: {
                title: "Angular",
                url: "/technologies/front-end/angular"        
            },
            vue: {
                title: "Vue",
                url: "/technologies/front-end/vue"        
            },
        }
      },
      backEnd: {
        title: "Back-end Technologies",
        url: "/technologies/back-end",
        options: {
            react: {
                title: "Express",
                url: "/technologies/backend"        
            },
            angular: {
                title: "Nest",
                url: "/technologies/front-end/nest"        
            },
            vue: {
                title: "Koa",
                url: "/technologies/front-end/koa"        
            },
        }
      },
      devOps: {
        title: "DevOps Practices",
        url: "/technologies/devops",
        options: {
            docker: {
                title: "Docker",
                url: "/technologies/docker"        
            },
            aws: {
                title: "AWS",
                url: "/technologies/front-end/aws"        
            },
            observability: {
                title: "Observability",
                url: "/technologies/front-end/observability"        
            },
        }
      }
    },
    about: {
        companyProfile: {
          title: "Company Profile",
          url: "/about/company-profile"
        },
        team: {
          title: "Our Team",
          url: "/about/team"
        },
        careers: {
          title: "Careers",
          url: "/about/careers"
        }
      },
  }
  