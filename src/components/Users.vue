<template>
  <div class="usersContent">
 <div class="text-center">
    <v-dialog
      v-model="dialogEdit"
      width="500"
      persistent
  
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Editar usuario
        </v-card-title>
        <div style="margin:auto;width:70%; display:flex;flex-direction:column;align-items:center">
        <v-text-field  label='Nombre(s)' :value="currentUser.nombre"></v-text-field>
        <v-text-field  label='Apellido(s)' :value="currentUser.apellido"></v-text-field>
        <v-text-field  label='Email' :value="currentUser.email"></v-text-field>
        <v-select  placeholder="Dependencias" :multiple="true"  :items="['Logística','Desarrollo']" ></v-select>
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Valido hasta"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>

        </div>


        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Actualizar
          </v-btn>
          <v-btn
            color="error"
            text
            @click="dialogEdit = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog
      v-model="dialogAdd"
      width="500"
      persistent
  
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Agregar usuario
        </v-card-title>
        <v-form  ref="form" v-model="valid" style="margin:auto;width:70%; display:flex;flex-direction:column;align-items:center">
        <v-text-field :rules="rules" v-model="name" label='Nombre(s)'></v-text-field>
        <v-text-field :rules="rules" v-model="lastname" label='Apellido(s)'></v-text-field>
        <v-text-field :rules="emailRules" v-model="email" label='Email'></v-text-field>
        <v-select :rules="selectRules" v-model="deps" placeholder="Dependencias" :multiple="true" :items="['Logística','Desarrollo']"></v-select>

         <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Valido hasta"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>


        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="primary"
            text
            @click="addUser()"
          >
            Agregar
          </v-btn>
          <v-btn
            color="error"
            text
            @click="dialogAdd = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
    <div class="table">
      <div style="width:50%">
        <v-text-field
          placeholder="Buscar usuarios nombre, apellido o correo"
          v-model="search"
          append-icon="search"
        ></v-text-field>
      </div>
      <v-data-table
        :search="search"
        :loading="users.length===0"
        style="width:100%;"
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="elevation-1"
      >
        <template v-slot:item.acciones="{ item }">
          <v-btn class="mr-1" small color="primary" rounded @click="editUser(item)">
            <v-icon>mdi-pencil</v-icon>
            </v-btn>
          <v-btn small color="error" rounded @click="removeUser(item)">
            <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
      </v-data-table>
      <v-btn @click="dialogAdd=true" style="margin-top:-45px" color="primary" dark small fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
const fb = require("../firebaseConfig.js");

export default {
  data() {
    return {
      dateRules:[
        value=> !!value||'Obligatorio'
      ],
      emailRules: [
        value => !!value || 'Obligatorio.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email inválido'
        },
      ],
      rules: [
         v => !!v || 'Obligatorio',
        v => (v && v.length <= 20) || 'Max 20 carácteres',
      ],
      selectRules:[
          value => (value).length>0 || 'Al menos 1',
          value=>{const pattern =/$/
          return pattern.test(value)}
      ],

      name:"",
      lastname:"",
      email:"",
      deps:[],
      state:true,
      valid:"",
      date: new Date().toISOString().substr(0, 10),
      menu: false,

      search: "",
      currentUser:"",

      dialogEdit:false,
      dialogAdd:false,

      nameLbl:false,

      headers: [
        { text: "Id", value: "id", align:'center'},
        {
          text: "Nombre",
          align: "center",
          sortable: true,
          value: "nombre"
        },
        { text: "Apellido", value: "apellido", align:'center' },
        { text: "Email", value: "email", align:'center' },
        { text: "Estado", value: "estado", sortable: false , align:'center'},
        { text: "Acciones", value: "acciones", sortable: false , align:'center'}
      ],
      users: [
        {
          id: "0",
          nombre: "Julian",
          apellido: "Gutierrez",
          estado:"Activo",
          email: "juligury@gmail.com",
          valido:'10/11/2019',
          deps:[
            "Logistica",
            "Desarrollo"
          ]
        },
        {
          id: "1",
          nombre: "Camilo",
          apellido: "Tobar",
          estado:"Activo",
          email: "camilotobar@outlook.com",
          valido:'17/12/2019',
           deps:[
            "Logistica",
            "Desarrollo"
          ]
        }
      ],
      deps:[
        'Desarrollo',
        'Logísitica'
      ]
    };
  },
  created(){
    let user ={
          id: "",
          nombre: "",
          apellido: "",
          estado:"",
          email: "",
          valido:'',
           deps:[
          ]
        }
    let date =new Date().toISOString().substring(0,10)
    fb.usersCollection.get().then(querySnapshot=>{querySnapshot.forEach(doc=>{
      let data=(doc.data())
      if(doc.data().id){
        user={
          id:data.id,
          nombre:data.nombre,
          apellido:data.apellido,
          estado:date>data.valido?'Inactivo':'Activo',
          email: data.email,
          deps:data.deps
        }
        this.users.push(user)
        console.log(user.deps)
      }
    })})
  },
  methods:{

    addUser(){
      let user={
        id:this.users.length.toString(),
        nombre: this.name,
        apellido:this.lastname,
        email:this.email,
        valido:this.date,
        deps:this.deps
      }
      fb.usersCollection.doc(user.id).set(user)
      this.dialogAdd=false

    },
    removeUser(item){ 
      fb.usersCollection.doc(item.id).delete()
  },
    editUser(item){
      this.dialogEdit=true
      this.currentUser=item
    },
  }
};
</script>

<style>
.usersContent {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.usersContent .table {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>  