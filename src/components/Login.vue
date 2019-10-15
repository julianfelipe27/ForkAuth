<template>
<div class="main">
    <v-card elevation="5" class="containerClass">
      <v-container>
        <v-dialog v-model="isOpen" persistent width="310">
          <template v-slot:activator="{ on }">
          </template>
          <v-card>
            <v-card-title class="headline">Imposible iniciar sesión</v-card-title>
            <v-card-text>{{msg}}</v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary darken-1" text @click="isOpen = false">Entendido</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-form lazy-validation ref="form" v-model="valid">
          <h1>Inicio de Sesión</h1>
          <br />
          <v-text-field :rules="emailRules" label="E-mail" required v-model.trim="email"></v-text-field>
          <p>
            ¿No tienes una cuenta?,
            <router-link class="linkStyle" to="/register">Regístrate</router-link>
          </p>
          <v-text-field
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            label="Password"
            v-model.trim="password"
            :rules="passwordRules"
          ></v-text-field>
         <!--  <router-link class="linkStyle" to="/recover">Olvidé mi contraseña</router-link>
          <br /> -->
          <br />
          <v-btn color="primary" style="margin:10px;background:#08799C" @click="login()">Ingresar</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </div>
  
</template>

<script>
import axios from "axios";
const fb = require('../firebaseConfig.js')
export default {
    name: "Login",
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      email: "",
      password: "",
      isOpen: false,
      msg:'',
      emailRules: [
        v => !!v || 'El correo electrónico es obligatorio'
      ],
      passwordRules: [
        v => !!v || 'La contraseña es obligatoria',
      ]
    };
  },
  methods:{
    login() {
    fb.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
        this.$store.commit('setCurrentUser', user.user) 
        this.$store.dispatch('fetchUserProfile')
        this.$router.push('/profileUser')
    }).catch(err => {
        console.log(err)
    })
}

  },

}
</script>

<style scoped>
.main {
  background-image: url("./img/register.jpg");
  background-color: rgba(243, 243, 243, 0.5);
  background-blend-mode: color;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.containerClass {
  background-color: #f8f8f8;
  padding: 2% 2%;
  width: 27%;
  border-radius: 10px;
}

.linkStyle {
  color: #313131 !important;
}

</style>