<template>
  <v-app id="inspire">
    <!-- navbar -->
    <v-app-bar app clipped-right dense>
      <v-toolbar-title>Bauman Music Control Center</v-toolbar-title>
      <v-toolbar-items></v-toolbar-items>
    </v-app-bar>
    <!-- sidebar -->

    <!-- router -->
    <router-view />
    <div class="space"></div>
    <!-- footer -->
    <div class="footer" :hidden="isHidden" v-if="currentTrack !== null">
      <v-card tile>
        <div class="progress-bar">
          <v-progress-linear
            v-model="progress"
            :buffer-value="buffProgress"
            height="13"
            color="green"
          >
            <p class="current-time">{{calcCurrentTime(progress)}}</p>
            <p class="duration">{{formatDuration(musicDuration)}}</p>
          </v-progress-linear>
        </div>

        <v-list>
          <v-list-item>
            <v-avatar tile>
              <img :src="currentTrack.imageLink" />
            </v-avatar>
            <v-list-item-content class="ml-2">
              <v-list-item-title>{{currentTrack.title}}</v-list-item-title>
              <v-list-item-subtitle>Artist</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon>
              <v-btn @click="changeTrack('previous')" icon>
                <v-icon>skip_previous</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              v-if="isPlay === true"
              :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn @click="playerPause()" icon>
                <v-icon>mdi-pause</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-icon v-else :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn @click="playerPlay()" icon>
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon class="ml-0" :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
              <v-btn @click="changeTrack('next')" icon>
                <v-icon>skip_next</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-menu open-on-hover top offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>volume_up</v-icon>
                </v-btn>
              </template>

              <v-list height="235">
                <v-btn tile icon @click="equalizerMenu = true">
                  <v-icon>equalizer</v-icon>
                </v-btn>

                <v-list-item>
                  <v-slider max="1" color="green" v-model="volume" vertical step="0.01"></v-slider>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
        <!-- equalizer -->
        <v-dialog
          v-model="equalizerMenu"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark dense>
              <v-btn icon dark @click="equalizerMenu = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Обработка звука</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-switch
                class="mt-5"
                color="green"
                :label="enableEqualizer?'Вкл.':'Выкл.'"
                v-model="enableEqualizer"
              ></v-switch>
            </v-toolbar>
            <v-container>
              <v-row>
                <v-col>Эквалайзер</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" md="1" class="ml-5">
                  <p class="text-center" style="font-size:10pt">0—100</p>
                  <v-slider
                    v-model="slider1"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider1}}dB</p>
                </v-col>
                <v-col cols="12" md="1" class="ml-12">
                  <p class="text-center" style="font-size:10pt">100—2.75k</p>
                  <v-slider
                    v-model="slider2"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider2}}dB</p>
                </v-col>
                <v-col cols="12" md="1" class="ml-12">
                  <p class="text-center" style="font-size:10pt">2.75k—5.6k</p>
                  <v-slider
                    v-model="slider3"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider3}}dB</p>
                </v-col>
                <v-col cols="12" md="1" class="ml-12">
                  <p class="text-center" style="font-size:10pt">5.6k—8.35k</p>
                  <v-slider
                    v-model="slider4"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider4}}dB</p>
                </v-col>
                <v-col cols="12" md="1" class="ml-12">
                  <p class="text-center" style="font-size:10pt">8.35k—11.1k</p>
                  <v-slider
                    v-model="slider5"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider5}}dB</p>
                </v-col>
                <v-col cols="12" md="1" class="ml-12">
                  <p class="text-center" style="font-size:10pt">11.1k—13.8k</p>
                  <v-slider
                    v-model="slider6"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider6}}dB</p>
                </v-col>
                <v-col cols="12" md="1" class="ml-12">
                  <p class="text-center" style="font-size:10pt">13.8k—16.6k</p>
                  <v-slider
                    v-model="slider7"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider7}}dB</p>
                </v-col>
                <v-col cols="12" md="1" class="ml-12">
                  <p class="text-center" style="font-size:10pt">16.6k—22k</p>
                  <v-slider
                    v-model="slider8"
                    :disabled="!enableEqualizer"
                    class="equalizer"
                    max="20"
                    min="-20"
                    color="green"
                    value="0"
                    vertical
                  ></v-slider>
                  <p class="text-center">{{slider8}}dB</p>
                </v-col>
              </v-row>
              <v-divider />
              <v-row no-gutters class="mt-3">
                <v-col cols="2" md="6">
                  <p>Спектрограмма</p>
                </v-col>

                <v-col cols="2" md="6">
                  <p>Эффекты</p>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col id="spCol" cols="2" md="6">
                  <canvas id="spectrumBefore" width="800" height="200" />
                </v-col>
                <v-col cols="2" md="6">
                  <v-row>
                    <v-col md="2">
                      <p>Реверберация</p>
                    </v-col>
                    <v-col md="4">
                      <v-switch dense style="margin-top: -2px"></v-switch>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2" md="6">
                  <p class="text-center" style="font-size:10pt">До обработки</p>
                </v-col>
                <v-col cols="2" md="6">
                  <v-divider />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" md="6">
                  <canvas id="spectrumAfter" width="800" height="200" />
                  <p class="text-center" style="font-size:10pt">После обработки</p>
                </v-col>
                <v-col cols="2" md="6">
                  <v-row>
                    <v-col md="2">
                      <p>Дисторшн</p>
                    </v-col>
                    <v-col md="4">
                      <v-switch dense style="margin-top: -2px"></v-switch>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import MusicArtists from "../components/MusicArtists.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "isHidden",
      "currentTrack",
      "musicArtistId",
      "isPlay",
      "tracks",
      "duration",
      "currentTime"
    ]),
    buffProgress() {
      return (this.buffTime / this.currentTrack.duration) * 100;
    },
    progress: {
      get() {
        if (this.currentTrack.duration === 0) return 0;
        return (this.playerTime / this.currentTrack.duration) * 100;
      },
      set(percent) {
        if (this.player) {
          this.player.currentTime =
            (percent * this.currentTrack.duration) / 100;
        }
      }
    }
  },
  data() {
    return {
      buffTime: 0,
      volume: 0.5,
      player: null,
      musicDuration: 0,
      playerTime: 0,
      updateTime: null,
      equalizerMenu: false,
      enableEqualizer: false,
      slider1: 0,
      slider2: 0,
      slider3: 0,
      slider4: 0,
      slider5: 0,
      slider6: 0,
      slider7: 0,
      slider8: 0,
      filters: null,
      spectrumBeforeCanvas: null,
      spectrumAfterCanvas: null
    };
  },

  components: {
    appMusicArtists: MusicArtists
  },
  watch: {
    slider1() {
      this.filters[0].gain.value = 3 * this.slider1;
    },
    slider2() {
      this.filters[1].gain.value = 3 * this.slider2;
    },
    slider3() {
      this.filters[2].gain.value = 3 * this.slider3;
    },
    slider4() {
      this.filters[3].gain.value = 3 * this.slider4;
    },
    slider5() {
      this.filters[4].gain.value = 3 * this.slider5;
    },
    slider6() {
      this.filters[5].gain.value = 3 * this.slider6;
    },
    slider7() {
      this.filters[6].gain.value = 3 * this.slider7;
    },
    slider8() {
      this.filters[7].gain.value = 3 * this.slider8;
    },
    enableEqualizer(curr) {
      if (curr) {
        if (
          curr &&
          this.spectrumBeforeCanvas === null &&
          this.spectrumAfterCanvas === null
        ) {
          this.spectrumBeforeCanvas = document.getElementById("spectrumBefore");
          this.spectrumAfterCanvas = document.getElementById("spectrumAfter");

          var spBefCanvContext = this.spectrumBeforeCanvas.getContext("2d");
          var spAftCanvContext = this.spectrumAfterCanvas.getContext("2d");

          this.spectrumBeforeCanvas.width = 800;
          this.spectrumBeforeCanvas.height = 200;

          this.spectrumAfterCanvas.width = 800;
          this.spectrumAfterCanvas.height = 200;
        }

        var WIDTH = this.spectrumBeforeCanvas.width;
        var HEIGHT = this.spectrumBeforeCanvas.height;

        var context = new (window.AudioContext || window.webkitAudioContext)();
        var source = context.createMediaElementSource(this.player);
        var analyser1 = context.createAnalyser(); //Analyser for spectrumBeforeCanvas
        var analyser2 = context.createAnalyser(); //Analyser for spectrumAfterCanvas

        var EQ = [
          { f: 100, type: "lowshelf" },
          { f: 270, type: "peaking" },
          { f: 750, type: "peaking" },
          { f: 1500, type: "peaking" },
          { f: 3500, type: "peaking" },
          { f: 7500, type: "peaking" },
          { f: 13500, type: "peaking" },
          { f: 16000, type: "highshelf" }
        ];

        this.filters = EQ.map(function(band) {
          var filter = context.createBiquadFilter();

          filter.writable = true;
          filter.type = band.type;
          filter.frequency.value = band.f;
          filter.Q.value = 1;
          filter.gain.value = 0;
          return filter;
        });

        source.connect(analyser1);
        analyser1.connect(this.filters[0]);
        this.filters[0].connect(this.filters[1]);
        this.filters[1].connect(this.filters[2]);
        this.filters[2].connect(this.filters[3]);
        this.filters[3].connect(this.filters[4]);
        this.filters[4].connect(this.filters[5]);
        this.filters[5].connect(this.filters[6]);
        this.filters[6].connect(this.filters[7]);
        this.filters[7].connect(analyser2);
        analyser2.connect(context.destination);

        analyser1.fftSize = 256;
        analyser2.fftSize = 256;

        var bufferLength1 = analyser1.frequencyBinCount;
        var dataArray1 = new Uint8Array(bufferLength1);

        var barWidth1 = WIDTH / bufferLength1;
        var barHeight1;
        var x1 = 0;

        var bufferLength2 = analyser2.frequencyBinCount;
        var dataArray2 = new Uint8Array(bufferLength2);

        var barWidth2 = WIDTH / bufferLength2;
        var barHeight2;
        var x2 = 0;

        function renderFrame1() {
          requestAnimationFrame(renderFrame1);

          x1 = 0;

          analyser1.getByteFrequencyData(dataArray1);

          spBefCanvContext.fillStyle = "rgb(0, 0, 0)";
          spBefCanvContext.fillRect(0, 0, WIDTH, HEIGHT);

          for (let i = 0; i < bufferLength1; i++) {
            barHeight1 = dataArray1[i];

            spBefCanvContext.fillStyle = "rgb(50," + (barHeight1 + 50) + ",50)";
            spBefCanvContext.fillRect(
              x1,
              HEIGHT - barHeight1 / 2,
              barWidth1,
              barHeight1
            );
            x1 += barWidth1 + 1;
          }
        }

        function renderFrame2() {
          requestAnimationFrame(renderFrame2);
          console.log("frame");

          x2 = 0;

          analyser2.getByteFrequencyData(dataArray2);

          spAftCanvContext.fillStyle = "rgb(0, 0, 0)";
          spAftCanvContext.fillRect(0, 0, WIDTH, HEIGHT);

          for (let i = 0; i < bufferLength2; i++) {
            barHeight2 = dataArray2[i];

            spAftCanvContext.fillStyle = "rgb(50," + (barHeight2 + 50) + ",50)";
            spAftCanvContext.fillRect(
              x2,
              HEIGHT - barHeight2 / 2,
              barWidth2,
              barHeight2
            );
            x2 += barWidth2 + 1;
          }
        }

        renderFrame2();

        renderFrame1();
      }
    },
    isHidden() {
      this.player = new Audio();
      this.player.crossOrigin = "anonymous";
      console.log("New Audio");
    },

    currentTrack(curr, prev) {
      if (this.currentTrack !== null) {
        this.player.src = this.currentTrack.musicLink;
        this.player.play();
        this.player.volume = this.volume;
        this.playerTime = this.player.currentTime;
        this.musicDuration = this.currentTrack.duration;

        if (curr && curr != null) {
          this.updateTime = setInterval(() => {
            this.playerTime = this.player.currentTime;
            this.buffTime = this.player.buffered.end(0);
            if (this.playerTime === this.player.duration) {
              clearTimeout(this.updateTime);
              //this.killPlayer();
              this.updateTime = null;
              this.changeTrack("next");
            }
          }, 250);
        }
      }
    },
    volume() {
      if (this.player) {
        this.player.volume = this.volume;
      }
    },
    isPlay(curr, prev) {
      if (curr) {
        this.updateTime = setInterval(() => {
          console.log("interval");

          this.playerTime = this.player.currentTime;
          this.player.buffTime = this.player.buffered.end(0);
          if (this.playerTime === this.player.duration) {
            this.changeTrack("next");
          }
        }, 1000);
        setTimeout(() => {
          this.player.play();
        }, 500);
      } else {
        clearInterval(this.updateTime);
        this.updateTime = null;
        setTimeout(() => {
          console.log("pause");

          this.player.pause();
        }, 500);
      }
    }
  },

  methods: {
    ...mapActions([
      "play",
      "pause",
      "setCurrentTrack",
      "setTracks",
      "setCurrentTime",
      "setDuration",
      "setBufferedTime"
    ]),

    calcCurrentTime(percent) {
      var currentTime = (percent * this.musicDuration) / 100;
      return this.formatDuration(currentTime);
    },
    formatDuration(duration) {
      var min = Math.trunc(duration / 60);
      var sec = Math.trunc(duration % 60);
      return min + ":" + (sec < 10 ? "0" + sec : sec);
    },
    killPlayer() {
      if (this.player) {
        this.playerTime = 0;
        this.buffTime = 0;
        this.duration = 0;
        this.setCurrentTime(0);
        this.setDuration(0);
        this.player = null;
      }
    },
    handlePlayPause() {
      if (this.isPlay) {
        if (this.duration > 0 && this.currentTime === this.duration) {
          this.player.fastSeek(0);
          this.setCurrentTime(0);
          this.setDuration(0);
        }
        this.pause();
        this.player.pause();
      } else {
        this.play();
        this.player.play();
      }
    },
    changeTrack(direction) {
      if (this.currentTrack != null) {
        const self = this;
        const currentTrackID = this.currentTrack.id;
        this.tracks.forEach((track, index) => {
          if (currentTrackID === track.id) {
            let nextIndex = 0;
            if (direction === "next") {
              clearTimeout(this.updateTime);
              this.updateTime = null;
              this.player.pause();
              nextIndex = index + 1;
              if (nextIndex < self.tracks.length) {
                setTimeout(() => {
                  //this.killPlayer();
                  this.setCurrentTrack(self.tracks[nextIndex]);
                  this.setDuration(self.tracks[nextIndex].duration);
                  this.musicDuration = this.duration;
                }, 500);
              } else {
                this.pause();
                this.setCurrentTrack(null);
                this.setTracks([]);
                clearTimeout(this.updateTime);
                this.updateTime = null;
              }
            } else if (direction === "previous") {
              clearTimeout(this.updateTime);
              this.updateTime = null;
              this.player.pause();
              nextIndex = index - 1;
              if (nextIndex >= 0) {
                setTimeout(() => {
                  //this.killPlayer();
                  this.setCurrentTrack(self.tracks[nextIndex]);
                  this.setDuration(self.tracks[nextIndex].duration);
                  this.musicDuration = this.duration;
                }, 500);
              }
            }
          }
        });
      }
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style >
.equalizer {
  display: inline;
}
.artist-link {
  text-decoration: none;
  color: white;
}

.artist-link:hover {
  color: #52af50;
}

.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 90px;
  margin-bottom: 0px;
}

.progress-bar {
  height: 13px;

  background-color: #464646;
}
.space {
  height: 97px;
}

.duration {
  margin-right: 5px;
  margin-left: auto;
  font-size: 12px;
  margin-top: 17px;
}
.current-time {
  margin-left: 5px;
  margin-right: auto;
  font-size: 12px;
  margin-top: 17px;
}
</style>

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var source = audioCtx.createMediaElementSource(this.player);

        var EQ = [
          { f: 100, type: "lowshelf" },
          { f: 2750, type: "peaking" },
          { f: 5600, type: "peaking" },
          { f: 8350, type: "peaking" },
          { f: 11100, type: "peaking" },
          { f: 13850, type: "peaking" },
          { f: 16600, type: "peaking" },
          { f: 16600, type: "highshelf" }
        ];

        var filters = EQ.map(function(band) {
          var filter = audioCtx.createBiquadFilter();

          filter.type = band.type;
          filter.frequency = band.f;
          filter.Q.value = 1;
          filter.gain.value = -0.1;
          return filter;
        });