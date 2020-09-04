<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card-title>
            <h1>Исполнители</h1>
          </v-card-title>
        </v-col>
        <v-col cols="12" md="8">
          <v-autocomplete
            color="green"
            clearable
            class="mt-1"
            label="Поиск исполнителя"
            :items="allArtists"
            item-text="name"
            solo
            outlined
            rounded
            prepend-inner-icon="search"
            no-data-text="Не удалось найти такого исполнителя"
          >
            <template v-slot:item="data">
              <v-list-item :to="artistUrl+ data.item.id">
                <v-list-item-avatar tile>
                  <img :src="data.item.image200" />
                </v-list-item-avatar>

                <v-list-item-title>
                  <v-list-item-title v-html="data.item.name"></v-list-item-title>
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" xs="6" sm="6" md="3" v-for="artist in allArtists" :key="artist.id">
          <v-card link :to="artistUrl+artist.id" raised>
            <v-img :src="artist.image1000" min-height="400" height="350px">
              <v-card-title class="shadowtext">{{artist.name}}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-col hidden cols="12" sm="6" md="3">
              <v-card color="success" height="387px" width="500px"></v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-card color="success" height="100%" width="auto" v-on="on" min-height="350px">
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-icon color="white" size="100" v-text="'mdi-plus-circle-outline'"></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-col>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Исполнитель</span>
            </v-card-title>
            <v-card-subtitle>Введите информацию об исполнителе</v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-text-field
                  rounded
                  outlined
                  label="Название исполнителя*"
                  hint="Введите название исполнителя"
                  prepend-inner-icon="mdi-account"
                  required
                  v-model="name"
                ></v-text-field>

                <v-file-input
                  show-size
                  rounded
                  outlined
                  accept="image/*"
                  label="Выберите изображение* (не меньше 1000x1000px)"
                  prepend-icon
                  prepend-inner-icon="mdi-camera"
                  aria-required
                  v-model="file"
                ></v-file-input>
              </v-container>
              <small>*указывает обязательное поле</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">Отмена</v-btn>
              <v-btn
                color="success darken-1"
                text
                @click="
                    save
                  "
              >Добавить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: mapGetters(["allArtists"]),
  data: () => ({
    drawer: false,
    dialog: false,
    name: "",
    file: undefined,
    artistUrl: "/artist/"
  }),
  created() {
    this.fetchArtists();
  },
  methods: {
    ...mapActions(["fetchArtists"]),
    ...mapMutations(["createArtist"]),
    save() {
      let formData = new FormData();
      formData.append("id", "");
      formData.append("name", this.name);
      formData.append("file", this.file);

      this.createArtist(formData);

      this.dialog = false;
      this.name = "";
      this.file = undefined;
    }
  }
};
</script>

<style>
.shadowtext {
  -webkit-user-select: none;
  -moz-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-shadow: 1px 1px 1px black, 0 0 1em rgb(37, 36, 36);
  color: white;
}
</style>