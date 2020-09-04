<template>
  <div>
    <p>
      <span v-if="artists.length < 2">Исполнитель:</span>
      <span v-else>Исполнители:</span>
      <span class="ml-1" style="color: grey" v-for="(artist, i) in artists" :key="artist.id">
        <router-link class="link" :to="'/artist/' + artist.id">{{ artist.name }}</router-link>
        <span v-if="i < artists.length - 1">,</span>
      </span>
    </p>
  </div>
</template>
<script>
var address = "localhost";
export default {
  props: ["artistsId"],
  created() {
    this.ids = this.artistsId.filter(el => el !== 0);

    for (let id of this.ids) {
      this.$http
        .get("http://" + address + ":9000/artist/" + id)
        .then(result => result.json().then(data => this.artists.push(data)));
    }
  },

  data() {
    return {
      artists: [],
      ids: []
    };
  }
};
</script>

<style scoped>
.link {
  margin-left: 0.5px;
  text-decoration: none;
  color: gray;
}

.link:hover {
  color: white;
}
</style>
