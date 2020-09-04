var address = "localhost";

export default {
  actions: {
    async fetchArtists(ctx) {
      const res = await Vue.http.get("http://" + address + ":9000/artist");
      const artists = await res.json();
      ctx.commit("updateArtists", artists);
    },
    async fetchArtist(ctx, id) {
      const res = await Vue.http.get(
        "http://" + address + ":9000/artist/" + id
      );
      const artist = await res.json();
      ctx.commit("updateArtist", artist);
    },
    async fetchAlbums(ctx, id) {
      const res = await Vue.http.get(
        "http://" + address + ":9000/album/artist/" + id
      );
      const albums = await res.json();
      ctx.commit("updateAlbums", albums);
    },
  },
  mutations: {
    updateArtist(state, artist) {
      state.artist = artist;
    },
    updateArtists(state, artists) {
      state.artists = artists;
    },
    updateAlbums(state, albums) {
      state.albums = albums;
    },
    async createArtist(state, formData) {
      const res = await Vue.http.post(
        "http://" + address + ":9000/artist",
        formData
      );
      const newArtist = await res.json();
      state.artists.push(newArtist);
    },
    async createAlbum(state, formData) {
      const res = await Vue.http.post(
        "http://" + address + ":9000/album",
        formData
      );

      const newAlbum = await res.json();
      state.albums.push(newAlbum);
    },
  },
  state: {
    artists: [],
    artist: null,
    albums: [],
  },
  getters: {
    allArtists(state) {
      return state.artists;
    },
    getArtist(state) {
      return state.artist;
    },
    allAlbums(state) {
      return state.albums;
    },
  },
};
