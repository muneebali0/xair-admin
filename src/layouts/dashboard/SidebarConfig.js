const get_icon = (name) => {
  return <i className={`nav-icon ${name}`}></i>;
};

const sidebarConfig = () => {
  let sidebarMenus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: get_icon("fas fa-tachometer-alt"),
    },
    {
      title: "Passengers List",
      path: "/passengers-list",
      icon: get_icon("fas fa-user-graduate"),
    },
    {
      title: "Pilots List",
      path: "/pilots-list",
      icon: get_icon("fas fa-user-graduate"),
    },
    {
      title: "Airports List",
      path: "/airports-list",
      icon: get_icon("fa-solid fa-plane-arrival"),
    },
    {
      title: "Payment Plans",
      path: "/payment-plans",
      icon: get_icon("fa-solid fa-money-bill-1-wave"),
    },
    {
      title: "Home Page Content",
      path: "/home-page-content",
      icon: get_icon("fa-solid fa-gear"),
    },
    // {
    //   title: "Settings",
    //   icon: get_icon("fas fa-tachometer-alt"),
    //   child_options: [
    //     {
    //       title: "Home Page Content",
    //       path: "/home-page-content",
    //       icon: get_icon("fas fa-tachometer-alt"),
    //     },
    //   ],
    // },
  ];
  return sidebarMenus;
};
export default sidebarConfig;
