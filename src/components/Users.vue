<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
  >
                <v-btn
                  v-show="!hidden"
                  color="pink"
                  fab
                  dark
                  small
                  absolute
                  bottom
                  right
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

  </v-data-table>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
            {text:'Id',
            value:'id'},
          {
            text: 'Nombre',
            align: 'left',
            sortable: true,
            value: 'nombre',
          },
          { text: 'Apellido', value: 'apellido' },
          { text: 'Email', value: 'email' },
        ],
        users: [
          {
            id:'1',  
            nombre: 'Julian',
            apellido:'Gutierrez',
            email: 'juligury@gmail.com',

          },
        ],
      }
    },
  }
</script>

<style>

</style>