<template>
  <v-content>
    <router-link to="/artists">Исполнители</router-link>
  </v-content>
</template>

<script>
export default {
  name: "Home",
  props: {
    source: String
  }
};
</script>
