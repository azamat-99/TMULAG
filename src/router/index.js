import { createRouter, createWebHistory } from "vue-router";
import AboutUsView from "../views/AboutUsView.vue";
import ContactsView from "../views/ContactsView.vue";
import LoginView from "../views/LoginView.vue";
import MainView from "../views/MainView.vue";
import NewsView from "../views/NewsView.vue";
import NotFound from "../views/NotFound.vue";
import OnlineApplicationView from "../views/OnlineApplicationView.vue";
import PasswordResetView from "../views/PasswordResetView.vue";
import ServicesView from "../views/ServicesView.vue";
import SignupView from "../views/SignupView.vue";
import SingleNewsView from "../views/SingleNewsView.vue";

import store from "../store/";
import Online from "../views/Online-Application/index.vue";
import Tab from "@/views/Online-Application/[tab].vue";

const routes = [
  {
    path: "/",
    name: "main_page",
    component: MainView,
  },
  {
    path: "/services",
    name: "services_page",
    component: ServicesView,
  },
  {
    path: "/online-application",
    name: "online_application_page",
    component: OnlineApplicationView,
  },
  {
    path: "/online",
    // name: 'online',
    // component: Online,
    children: [
      {
        path: "",
        name: 'online',
        component: Online,
      },
      {
        path: '/:tab',
        name: 'profileTab',
        component: Tab
      },
    ]
  },
  {
    path: "/news-all/:pageId",
    name: "news_page",
    component: NewsView,
  },
  {
    path: "/single-news/:id",
    name: "single_news_page",
    component: SingleNewsView,
  },
  {
    path: "/about-us",
    name: "about_us_page",
    component: AboutUsView,
  },
  {
    path: "/contacts",
    name: "contacts_page",
    component: ContactsView,
  },
  {
    path: "/login",
    name: "login_page",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup_page",
    component: SignupView,
  },
  {
    path: "/password-reset/:link_code?",
    name: "password_reset_page",
    component: PasswordResetView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    store.state.hamburger_active = "";
    document.body.style.overflowY = "initial";
    document.title = store.state.currentTitle;
  },
});

export default router;
