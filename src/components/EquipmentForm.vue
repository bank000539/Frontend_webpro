<template>
  <v-container fluid>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>EQUIPMENT NAME</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field label="EQUIPMENT NAME" v-model="Equipment.name" :readonly="_readonly"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3 offset-xs1>
        <v-subheader>DESCRIPTION</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-textarea name="input-7-1" label="DESCRIPTION" v-model="Equipment.description" :readonly="_readonly"></v-textarea>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn v-if="_readonly==true" color="primary" dark :to="'/equipment'" >CLOSE</v-btn>
          <v-btn v-if="_readonly==false" color="error" dark :to="'/equipment'">CANCEL</v-btn>
          <v-btn v-if="_readonly==false" color="primary" dark v-on="on">SAVE</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">CONFIRM?</v-card-title>
          
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>EQUIPMENT NAME</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-text-field v-model="Equipment.name" readonly></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3 offset-xs1>
              <v-subheader>DESCRIPTION</v-subheader>
            </v-flex>
            <v-flex xs7>
              <v-textarea v-model="Equipment.description" readonly></v-textarea>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="dialog = false">BACK</v-btn>
            <v-btn color="success" @click="save">CONFIRM</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    _readonly: false,
    Equipment:{
      name:"",
      description:""
    },
    dialog: false
  }),
  methods:{
      async save(){
        if(this.$route.params.title == "edit"){
          console.log("Edit",this.$route.params.id)
          this.Equipment._id =this.$route.params.id
          this.Equipment.data = {equipmentName:this.Equipment.name,description:this.Equipment.description}
          console.log(this.Equipment)
          let result = await axios.post('/equipment/editEquipment',this.Equipment)
          console.log(result)
          if(result.data.code === 500){
            alert(result.data.result)
          }else{
            this.$router.push('/equipment')
          }
        }
        else{
          console.log("Add")
          this.Equipment.equipmentName = this.Equipment.name
          let result = await axios.post('/equipment/createEquipment',this.Equipment)
          console.log(result)
          if(result.data.code === 500){
            alert(result.data.result)
          }else{
            this.$router.push('/equipment')
          }
        }
        this.dialog = false
      },
      async setdata(){
        let data = await axios.post('/equipment/getEquipment',{})
        let id = this.$route.params.id
        let findData = data.data.result.find(el=>el._id===id)
        this.Equipment={
        name:findData.equipmentName,
        description:findData.description
        }
      }
  },
  async created(){
    if(this.$route.params.title == "view"){
      this._readonly = true
      await this.setdata()
    }
    else if(this.$route.params.title == "add"){
      this._readonly = false
    }
    else{
      this._readonly = false
      await this.setdata()
    }
  }
};
</script>