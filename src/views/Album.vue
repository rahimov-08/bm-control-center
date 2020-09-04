<template>
  <v-content>
    <v-container>
      <v-row no-gutters dense>
        <v-col cols="12" sm="3" md="3" class="mt-10">
          <v-avatar size="200px" tile>
            <v-img :src="album.imageLink" />
          </v-avatar>
        </v-col>
        <v-col cols="12" md="6" class="mt-10">
          <div v-if="album.single === true" class="overline">СИНГЛ</div>
          <div v-else class="overline">АЛЬБОМ</div>
          <h1 class="album-title">{{ album.title }}</h1>
          <app-album-artists :artistsId="albumArtistIds"></app-album-artists>
          <p>{{ album.year }} · {{ album.genre }}</p>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn class="success" v-on="on">Добавить</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Песня</span>
              </v-card-title>
              <v-card-subtitle>Введите информацию о песне</v-card-subtitle>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        rounded
                        outlined
                        label="Название песни*"
                        hint="Введите название песни"
                        prepend-inner-icon="title"
                        required
                        v-model="name"
                      />
                      <v-autocomplete
                        outlined
                        rounded
                        v-model="jointArtists"
                        :items="allArtists"
                        chips
                        color="blue lighten-2"
                        label="Совместно с:"
                        item-text="name"
                        item-value="id"
                        multiple
                        counter="9"
                        no-data-text="Исполнитель не найден"
                        prepend-inner-icon="person"
                        single-line
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            @click="data.select"
                            @click:close="remove(data.item)"
                          >
                            <v-avatar left>
                              <v-img :src="data.item.image200"></v-img>
                            </v-avatar>
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content v-text="data.item"></v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-avatar>
                              <img :src="data.item.image200" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-html="data.item.name"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                      <v-file-input
                        show-size
                        rounded
                        outlined
                        accept="audio/*"
                        label="Выберите файл песни*"
                        prepend-icon
                        prepend-inner-icon="music_note"
                        aria-required
                        v-model="file"
                      />

                      <small>*указывает обязательное поле</small>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false; test() ">Отменить</v-btn>
                <v-btn color="success darken-1" text @click="save">Добавить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col cols="12" sm="12" md="12">
          <v-simple-table dense v-if="this.allMusics[0] !== undefined">
            <template>
              <thead>
                <tr>
                  <th class="m-number">
                    <span class="ml-3">#</span>
                  </th>
                  <th class="text-left">Название</th>

                  <th class="text-right">Длительность</th>
                </tr>
              </thead>
              <tbody>
                <v-hover
                  v-slot:default="{ hover }"
                  v-for="(music, index) in allMusics"
                  :key="music.id"
                >
                  <tr :elevation="hover" :class="{ 'on-hover': hover }">
                    <td>
                      <v-avatar v-if="playing === false" size="30" color="grey" class="mt-4">
                        {{
                        index + 1
                        }}
                      </v-avatar>
                      <v-avatar
                        v-else-if="playing === true && currentTrack.id !== music.id"
                        size="30"
                        color="grey"
                        class="mt-4"
                      >
                        {{
                        index + 1
                        }}
                      </v-avatar>
                      <v-avatar
                        v-else
                        color="green"
                        :style="{
                  animationDuration: animationDuration
                }"
                        class="mt-4 v-avatar--metronome"
                        size="30"
                      ></v-avatar>
                      <v-avatar size="30" class="num">
                        <v-btn
                          @click="setPlayPause(music)"
                          tile
                          :class="{ 'show-btns': hover, success: hover }"
                          color="transparent"
                          icon
                        >
                          <v-icon
                            v-if="playing === false"
                            :class="{ 'show-btns': hover }"
                            color="transparent"
                          >mdi-play</v-icon>
                          <v-icon
                            v-else-if="playing === true && currentTrack.id !== music.id"
                            :class="{ 'show-btns': hover }"
                            color="transparent"
                          >mdi-play</v-icon>
                          <v-icon
                            v-else
                            :class="{ 'show-btns': hover }"
                            color="transparent"
                          >mdi-pause</v-icon>
                        </v-btn>
                      </v-avatar>
                    </td>
                    <td>
                      <div class="m-block">
                        {{ music.title }}
                        <p
                          v-if="music.idArtist2 !== 0"
                          class="one-line ml-2 mr-1"
                          style="color: grey;"
                        >—</p>
                        <app-music-artists
                          v-if="music.idArtist2 !==0"
                          class="one-line"
                          :artistsId="[music.idArtist2,music.idArtist3,music.idArtist4,music.idArtist5,music.idArtist6,music.idArtist7]"
                        ></app-music-artists>
                      </div>
                    </td>

                    <td class="text-right">
                      <v-avatar size="30" :class="{'hide': hover}" color="transparent">
                        {{
                        formatDuration(music.duration)
                        }}
                      </v-avatar>

                      <v-menu>
                        <template v-slot:activator="{ on }">
                          <v-avatar size="30" class="edit" tile>
                            <v-btn
                              tile
                              :class="{ 'show-btns': hover }"
                              color="transparent"
                              v-on="on"
                              icon
                            >
                              <v-icon :class="{ 'show-btns': hover }" color="transparent">more_horiz</v-icon>
                            </v-btn>
                          </v-avatar>
                        </template>

                        <v-list dense>
                          <v-list-item>
                            <v-list-item-icon>
                              <v-icon>edit</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Редактировать</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click.stop="del(music.id)">
                            <v-list-item-icon>
                              <v-icon>delete</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Удалить</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </v-hover>
              </tbody>
            </template>
          </v-simple-table>
          <p
            class="font-weight-thin"
            style="font-size: 15px;"
            v-else
          >Треков в данном албоме не существует</p>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import AlbumArtists from "../components/AlbumArtists.vue";
import MusicArtists from "../components/MusicArtists.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "album",
      "allArtists",
      "allMusics",
      "albumArtistIds",
      "isPlay",
      "currentTrack",
      "isHidden"
    ]),
    animationDuration() {
      return `${60 / this.bpm}s`;
    }
  },
  data() {
    return {
      playing: null,
      bpm: 100,
      id: this.$route.params.id,
      dialog: false,
      name: null,
      jointArtists: [],
      file: null
    };
  },
  components: {
    appAlbumArtists: AlbumArtists,
    appMusicArtists: MusicArtists
  },
  created() {
    this.playing = this.isPlay;
    this.fetchAlbum(this.id);
    this.fetchArtists();
    this.fetchMusics(this.id);
  },
  watch: {
    isPlay() {
      this.playing = this.isPlay;
    }
  },
  methods: {
    ...mapActions([
      "fetchAlbum",
      "fetchMusics",
      "deleteMusic",
      "fetchArtists",
      "postMusic",
      "play",
      "setTracks",
      "setCurrentTrack",
      "visible",
      "setDuration",
      "pause"
    ]),
    formatDuration(duration) {
      return Math.trunc(duration / 60) + ":" + (duration % 60);
    },
    del(id) {
      this.deleteMusic(id);
    },

    remove(item) {
      const index = this.jointArtists.indexOf(item.id);
      if (index >= 0) this.jointArtists.splice(index, 1);
    },

    save() {
      let formData = new FormData();
      formData.append("title", this.name);
      formData.append("idArtist1", this.album.id_artist1);
      formData.append(
        "idArtist2",
        this.jointArtists[0] === undefined ? 0 : this.jointArtists[0]
      );
      formData.append(
        "idArtist3",
        this.jointArtists[1] === undefined ? 0 : this.jointArtists[1]
      );
      formData.append(
        "idArtist4",
        this.jointArtists[2] === undefined ? 0 : this.jointArtists[2]
      );
      formData.append(
        "idArtist5",
        this.jointArtists[3] === undefined ? 0 : this.jointArtists[3]
      );
      formData.append(
        "idArtist6",
        this.jointArtists[4] === undefined ? 0 : this.jointArtists[4]
      );
      formData.append(
        "idArtist7",
        this.jointArtists[5] === undefined ? 0 : this.jointArtists[5]
      );

      formData.append("file", this.file);
      formData.append("idAlbum", this.album.id);
      formData.append("genre", this.album.genre);
      formData.append("year", this.album.year);
      formData.append("imageLink", this.album.imageLink);

      this.postMusic(formData);
      this.dialog = false;
    },
    setPlayPause(music) {
      if (!this.playing) {
        if (this.currentTrack === null || this.currentTrack === undefined) {
          console.log("Initial play");

          this.playing = true;
          this.play();
          this.setCurrentTrack(music);
          this.setTracks(this.allMusics);
          this.visible();
        } else if (music.idAlbum === this.currentTrack.idAlbum) {
          console.log("same album");

          if (music.id === this.currentTrack.id) {
            console.log("pause -> play same paused music");

            this.playing = true;
            this.play();
          } else {
            console.log("another music");

            this.playing = true;
            this.setCurrentTrack(music);
            this.play();
          }
        } else {
          console.log("another album");

          this.playing = true;
          this.setTracks(this.allMusics);
          this.setCurrentTrack(music);
          this.play();
        }
      } else {
        if (music.idAlbum === this.currentTrack.idAlbum) {
          if (music.id === this.currentTrack.id) {
            console.log("play -> pause");

            this.playing = false;
            this.pause();
          } else {
            console.log("play -> play another music");
            this.playing = false;
            this.pause();
            setTimeout(() => {
              this.setCurrentTrack(music);
              this.playing = true;
              this.play();
            }, 500);
          }
        } else {
          console.log("play -> play from another album");

          this.playing = false;
          this.pause();
          this.setTracks(this.allMusics);
          this.setCurrentTrack(music);
          this.playing = true;
          this.play();
        }
      }
    }
  }
};
</script>

<style scoped>
.album-title {
  margin-left: -3px;
  font-size: 50px;
  word-break: inherit;
}
.hide {
  color: transparent;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.m-number {
  width: 10px;
}
.num {
  margin-top: -53px;
}

.m-block {
  margin-top: 5px;
  height: 30px;
}

.one-line {
  display: inline;
}

.edit {
  margin-left: -30px;
}

@keyframes metronome-example {
  from {
    transform: scale(0.2);
  }

  to {
    transform: scale(0.8);
  }
}

.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
