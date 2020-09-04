import Vue from "vue";
import Vuex from "vuex";
import artists from "./modules/artists";
import album from "./modules/album";
import player from "./modules/player";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { artists, album, player },
});
