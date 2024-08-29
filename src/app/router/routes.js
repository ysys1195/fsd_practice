import feedModule from "@/pages/feed";
const { FeedPage } = feedModule;

import signInModule from "@/pages/sign-in";
const { RegisterPage, SignInPage } = signInModule;

const routes = [
  {
    path: "/feed",
    name: "Feed",
    component: FeedPage,
  },
  {
    path: "/login",
    name: "SignIn",
    component: SignInPage,
  },
  {
    path: "/",
    name: "Register",
    component: RegisterPage,
  },
];

export default routes;
