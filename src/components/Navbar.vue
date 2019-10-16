<template>
  <div>
      <v-app-bar
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        style="display:flex;flex-direction:column;"
        absolute
        dark
        scroll-target="#playground-example"
        :color="color"
        :elevate-on-scroll="elevateOnScroll"
        :hide-on-scroll="hideOnScroll"
        :fade-on-scroll="fadeOnScroll"
        :fade-img-on-scroll="fadeImgOnScroll"
        :inverted-scroll="invertedScroll"
        :collapse="collapse"
        :collapse-on-scroll="collapseOnScroll"
        :shrink-on-scroll="shrinkOnScroll"
        :extended="extended"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-toolbar-title class="title" style="align-self:center">AUTHAPP</v-toolbar-title>

        <v-spacer></v-spacer>


      </v-app-bar>
  </div>
</template>
<script>
  export default {
    data: () => ({
      elevateOnScroll: false,
      hideOnScroll: false,
      fadeOnScroll: false,
      fadeImgOnScroll: false,
      invertedScroll: false,
      collapse: false,
      collapseOnScroll: true,
      shrinkOnScroll: false,
      extended: false,
      color: 'dark',
      colors: ['primary', 'accent', 'warning lighten-2', 'teal', 'orange'],
    }),
  }
</script>
<style scoped>
.title{
    font-family: 'Oswald';
}
</style>