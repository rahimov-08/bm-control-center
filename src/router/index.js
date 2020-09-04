import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/musics",
    name: "music",
    meta: { layout: "main" },
    component: () => import("../views/Musics.vue")
  },
  {
    path: "/artists",
    name: "artists",
    meta: { layout: "main" },
    component: () => import("../views/Artists.vue")
  },
  {
    path: "/albums",
    name: "albums",
    meta: { layout: "main" },
    component: () => import("../views/Albums.vue")
  },
  {
    path: "/artist/:id",
    name: "artist",
    meta: { layout: "main" },
    component: () => import("../views/Artist.vue")
  },
  {
    path: "/album/:id",
    name: "album",
    meta: { layout: "main" },
    component: () => import("../views/Album.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
