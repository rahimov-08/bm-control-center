<template>
  <v-app id="inspire">
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>