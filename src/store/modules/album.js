var address = "localhost";

export default {
  actions: {
    async fetchAlbum(ctx, id) {
      const res = await Vue.http.get("http://" + address + ":9000/album/" + id);
      const album = await res.json();
      ctx.commit("updateAlbum", album);
    },
    async fetchMusics(ctx, id) {
      const res = await Vue.http.get(
        "http://" + address + ":9000/music/album/" + id
      );

      const musics = await res.json();
      ctx.commit("updateMusics", musics);
    },
    async deleteMusic(ctx, id) {
      await Vue.http.delete("http://" + address + ":9000/music/" + id);

      ctx.commit("spliceMusic", id);
    },
    async postMusic(ctx, formData) {
      const res = await Vue.http.post(
        "http://" + address + ":9000/music",
        formData
      );
      const newMusic = await res.json();
      ctx.commit("addMusic", newMusic);
    },
  },
  mutations: {
    updateAlbum(state, album) {
      state.album = album;
    },
    updateMusics(state, musics) {
      state.musics = musics;
    },
    addMusic(state, newMusic) {
      state.musics.push(newMusic);
    },
    spliceMusic(state, id) {
      var delIndex;
      for (let index = 0; index < state.musics.length; index++) {
        if (state.musics[index].id === id) {
          delIndex = index;
          break;
        }
      }
      state.musics.splice(delIndex, 1);
    },
  },
  state: {
    album: null,
    musics: [],
  },
  getters: {
    album(state) {
      return state.album;
    },
    allMusics(state) {
      return state.musics;
    },
    albumArtistIds(state) {
      return [
        state.album.id_artist1,
        state.album.id_artist2,
        state.album.id_artist3,
        state.album.id_artist4,
        state.album.id_artist5,
        state.album.id_artist6,
        state.album.id_artist7,
        state.album.id_artist8,
        state.album.id_artist9,
        state.album.id_artist10,
      ];
    },
  },
};
