import feedModule from "@/pages/feed";
const { FeedPage } = feedModule;

const routes = [
  {
    path: "/feed",
    name: "Feed",
    component: FeedPage,
  },
];

export default routes;
