export default {
  actions: {
    visible(ctx) {
      ctx.commit("VISIBLE");
    },
    hidden(ctx) {
      ctx.commit("HIDDEN");
    },
    play(ctx) {
      ctx.commit("PLAY");
    },
    pause(ctx) {
      ctx.commit("PAUSE");
    },
    setCurrentTime(context, time) {
      context.commit("SET_CURRENT_TIME", time);
    },
    setDuration(context, time) {
      context.commit("SET_DURATION", time);
    },
    setBufferedTime(context, time) {
      context.commit("SET_BUFFERED_TIME", time);
    },
    setTracks(context, tracks) {
      context.commit("SET_TRACKS", tracks);
    },
    setCurrentTrack(context, track) {
      context.commit("SET_CURRENT_TRACK", track);
    },
    setSeeking(context, track) {
      context.commit("SET_SEEKING", track);
    },
  },
  mutations: {
    VISIBLE(state) {
      state.isHidden = false;
    },
    HIDDEN(state) {
      state.isHidden = true;
    },
    PLAY(state) {
      state.isPlay = true;
    },
    PAUSE(state) {
      state.isPlay = false;
    },
    SET_CURRENT_TIME(state, time) {
      state.currentTime = time;
    },
    SET_DURATION(state, time) {
      state.duration = time;
    },
    SET_BUFFERED_TIME(state, time) {
      state.bufferedTime = time;
    },
    SET_TRACKS(state, tracks) {
      state.tracks = tracks;
    },
    SET_CURRENT_TRACK(state, track) {
      state.currentTrack = track;
    },
    SET_SEEKING(state, seeking) {
      state.seeking = seeking;
    },
  },
  state: {
    isHidden: true,
    isPlay: false,
    currentTime: 0,
    duration: 0,
    tracks: [],
    currentTrack: null,
    bufferedTime: 0,
    seeking: false,
    volume: 100,
  },
  getters: {
    isHidden: (state) => state.isHidden,
    isPlay: (state) => state.isPlay,
    currentTime: (state) => state.currentTime,
    bufferedTime: (state) => state.bufferedTime,
    duration: (state) => state.duration,
    tracks: (state) => state.tracks,
    currentTrack: (state) => state.currentTrack,
    seeking: (state) => state.seeking,
  },
};
