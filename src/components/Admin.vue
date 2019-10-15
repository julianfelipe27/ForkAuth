<template>
  <div class="adminContent">
      <v-tabs
    fixed-tabs
    background-color="primary"
    dark
  >
    <v-tab :to="{name:'users'}">
      Usuarios
    </v-tab>
    <v-tab :to="{name:'deps'}">
      Dependencias
    </v-tab>
  </v-tabs>
  <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.adminContent{
  padding-top:65px;
  width:100%;
  height:100vh;
}
</style>