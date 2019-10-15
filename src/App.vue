<template>
  <v-app>
      <Navbar></Navbar>
      <router-view></router-view>
     <!-- <HelloWorld/> -->
   
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    Navbar
  },
  data: () => ({
    //
  }),
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
