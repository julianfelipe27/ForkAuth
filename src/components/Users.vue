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
        <v-text-field label='Nombre(s)' :value="currentUser.nombre"></v-text-field>
        <v-text-field label='Apellido(s)' :value="currentUser.apellido"></v-text-field>
        <v-text-field label='Email' :value="currentUser.email"></v-text-field>
        <v-select placeholder="Dependencias" :multiple="true"  :items="currentUser.deps" ></v-select>
        <v-switch :v-model="false" :label="`Estado: Activo`" :value="currentUser.estado"></v-switch>
        <v-text-field label='Valido hasta' placeholder="dd/mm/aaaa" :value="currentUser.valido"></v-text-field>

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
        <div style="margin:auto;width:70%; display:flex;flex-direction:column;align-items:center">
        <v-text-field label='Nombre(s)'></v-text-field>
        <v-text-field label='Apellido(s)'></v-text-field>
        <v-text-field label='Email'></v-text-field>
        <v-select placeholder="Dependencias" :multiple="true" :items="deps"></v-select>
        <v-switch :v-model="false" :label="`Estado: Activo`"
        ></v-switch>
        <v-text-field label='Valido hasta' placeholder="dd/mm/aaaa" ></v-text-field>

        </div>


        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
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
        :items-per-page="5"
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
      search: "",
      currentUser:"",
      dialogEdit:false,
      dialogAdd:false,
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
          id: "1",
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
          id: "2",
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
    fb.usersCollection.get().then(querySnapshot=>{querySnapshot.forEach(doc=>{
      this.users.push(doc.data().userInfoRegister)
    })})
  },
  methods:{
    addUser(item){
      this.dialogAdd=true
    },
    removeUser(item){ 
      fb.usersCollection.doc(item.id).delete()
  },
    editUser(item){
      this.dialogEdit=true
      this.currentUser=item
    }
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