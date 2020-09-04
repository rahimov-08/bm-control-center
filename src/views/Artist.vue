<template>
  <v-content>
    <v-container>
      <v-row no-gutters dense>
        <v-col cols="14" sm="3" md="3" class="mt-10">
          <v-avatar size="200px">
            <v-img :src="getArtist.image200" />
          </v-avatar>
        </v-col>
        <v-col cols="12" md="6" class="mt-10">
          <v-card-title class="artist-title">{{ getArtist.name }}</v-card-title>
          <v-card-subtitle class="text--secondary mt-1">Исполнитель</v-card-subtitle>
        </v-col>
      </v-row>
      <v-divider class="mt-5"></v-divider>
      <v-row dense>
        <v-col cols="12" sm="12" md="12">
          <v-card-title>
            Треки
            <v-spacer></v-spacer>
            <v-btn class="success">Добавить</v-btn>
          </v-card-title>
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-left">Название</th>
                  <th class="text-right">Длительность</th>
                  <th class="hidden-xs-only text-right">Альбом</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>
                    <v-avatar size="40" tile>
                      <v-img
                        src="http://192.168.0.102:9000/album/image/200x200_0f7df75e-e1cb-46f5-a52e-4301d1e20a25"
                      ></v-img>
                    </v-avatar>
                    {{ item.name }}
                  </td>
                  <td class="text-right">{{ item.calories }}</td>
                  <td class="hidden-xs-only text-right">{{ item.calories }}</td>
                </tr>
              </tbody>
              <p>Показать все</p>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>

      <v-card-title>
        Альбомы
        <v-spacer />
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn class="success" v-on="on">Добавить</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Альбом</span>
            </v-card-title>
            <v-card-subtitle>Введите информацию об альбоме</v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      rounded
                      outlined
                      label="Название альбома*"
                      hint="Введите название альбома"
                      prepend-inner-icon="title"
                      required
                      v-model="name"
                    />
                    <v-text-field
                      rounded
                      outlined
                      label="Жанр*"
                      prepend-inner-icon="mdi-album"
                      required
                      v-model="genre"
                    />
                    <v-text-field
                      rounded
                      outlined
                      label="Год*"
                      prepend-inner-icon="mdi-calendar"
                      required
                      v-model="year"
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
                      accept="image/*"
                      label="Выберите изображение* (не меньше 200x200 px)"
                      prepend-icon
                      prepend-inner-icon="add_a_photo"
                      aria-required
                      v-model="file"
                    />

                    <v-switch inset class="mt-0 ml-3" label="Сингл" v-model="single"></v-switch>

                    <small>*указывает обязательное поле</small>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">Отменить</v-btn>
              <v-btn color="success darken-1" text @click="save">Добавить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-row dense>
        <v-col cols="12" sm="4" md="3" v-for="album in allAlbums" :key="album.id">
          <v-card link :to="'/album/'+album.id" raised>
            <v-img :src="album.imageLink" height="250px"></v-img>
            <v-card-title class="shadowtext">{{album.title}}</v-card-title>
            <v-card-subtitle>
              {{album.year}} · {{album.genre}}
              <span v-if="album.single === true">· сингл</span>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      // artist: undefined,
      dialog: false,
      name: "",
      genre: "",
      year: "",
      file: undefined,
      single: false,
      // artists: [],
      jointArtists: [], //-

      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159
        },
        {
          name: "Ice cream sandwich",
          calories: 237
        },
        {
          name: "Eclair",
          calories: 262
        },
        {
          name: "Cupcake",
          calories: 305
        },
        {
          name: "Gingerbread",
          calories: 356
        }
      ]
    };
  },
  computed: mapGetters(["allArtists", "getArtist", "allAlbums"]),
  created() {
    this.fetchArtists();
    this.fetchArtist(this.id);
    this.fetchAlbums(this.id);
  },
  methods: {
    ...mapActions(["fetchArtists", "fetchArtist", "fetchAlbums"]),
    ...mapMutations(["createAlbum"]),
    save() {
      let formData = new FormData();
      formData.append("title", this.name);
      formData.append("genre", this.genre);
      formData.append("single", this.single);
      formData.append("year", this.year);
      formData.append("idArtist1", this.id);
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
      formData.append(
        "idArtist8",
        this.jointArtists[6] === undefined ? 0 : this.jointArtists[6]
      );
      formData.append(
        "idArtist9",
        this.jointArtists[7] === undefined ? 0 : this.jointArtists[7]
      );
      formData.append(
        "idArtist10",
        this.jointArtists[8] === undefined ? 0 : this.jointArtists[8]
      );
      formData.append("file", this.file);

      this.createAlbum(formData);

      this.dialog = false;
      this.name = "";
      this.genre = "";
      this.single = false;
      this.year = "";
      this.jointArtists = [];
      this.file = undefined;
    },
    remove(item) {
      const index = this.jointArtists.indexOf(item.id);
      if (index >= 0) this.jointArtists.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.artist-title {
  margin-left: -3px;
  font-size: 50px;
  word-break: inherit;
}
</style>
