var cricketerComponent = Vue.component("circket-players", {
  props: ["players"],
  methods: {
    edit: function(value) {
      this.$emit("edit", value);
    },
    deletePlayer:function(id){
      this.$emit("delete",id)
    }
  },
  template: `
  <div class="row">
        <template v-for="player in players">
          <div class="col-sm-4">
            <div class="card">
              <img src="player.jpg" class="card-img-top" />
              <div class="card-body">
                <h4 Card-title>{{player.firstName}} {{player.lastName}}</h4>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-sm-6">
                      Age
                    </div>
                    <div class="col-sm-6">
                      {{player.currentAge}}
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-sm-6">
                      Playing Role
                    </div>
                    <div class="col-sm-6">
                      {{player.playingRole}}
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-sm-6">
                      Batting Style
                    </div>
                    <div class="col-sm-6">
                      {{player.battingStyle}}
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-sm-6">
                      Bowling Style
                    </div>
                    <div class="col-sm-6">
                      {{player.bowlingStyle}}
                    </div>
                  </div>
                </li>
              </ul>
              <div class="card-body">
                <a href="#" class="btn btn-primary" v-on:click="edit(player)">Edit</a>
                <button type="button" class="btn btn-danger" v-on:click="deletePlayer(player.id)">Delete</button>
              </div>
            </div>
          </div>
        </template>
      </div>
  `
});

var app = new Vue({
  el: "#app",
  data: function() {
    return {
      players: [],
      updatePlayer: {
        id: 0,
        firstName: "",
        lastName: "",
        currentAge: 0,
        teams:
          "",
        playingRole: "",
        battingStyle: "",
        bowlingStyle: ""
      },
      idToDelete:0
    };
  },
  mounted: function() {
    this.getAll();
  },
  methods: {
    getAll:function(){
      axios({
        method: "get",
        url: "https://localhost:44316/api/player/all"
      }).then(response => {
        this.players = response.data;
      });
    },
    savePlayerData:function(){
      axios({
        method:"post",
        url:"https://localhost:44316/api/player/save",
        data:{...this.updatePlayer}
      }).then(resp => {
        this.getAll();
        $("#cricketModal").modal("hide");
      })
    },
    updatePlayerData:function(){
      axios({
        method:"post",
        url:"https://localhost:44316/api/player/update",
        data:{...this.updatePlayer}
      }).then(resp => {
        $("#cricketModal").modal("hide");
        this.getAll();
       
      })
    },
    deletePlayerData:function(){
      var url = 'https://localhost:44316/api/player/delete?id=' + this.idToDelete;
      axios({
        method:"delete",
        url:url
      }).then(resp => {
        this.getAll();
        $("#confirmationModal").modal("hide");
      })
    },
    edit: function(value) {
      this.updatePlayer = value;
      $("#cricketModal").modal("show");
    },
    saveOrUpdate:function(){
     if(this.updatePlayer.id > 0){
       this.updatePlayerData();
     }else{
       this.savePlayerData();
     }
    },
    add:function(){

      this.updatePlayer = {
        id: 0,
        firstName: "",
        lastName: "",
        currentAge: 0,
        teams:
          "",
        playingRole: "",
        battingStyle: "",
        bowlingStyle: ""
      }
      $("#cricketModal").modal("show");
    },
    onDelete:function(id){
      this.idToDelete = id;
      $("#confirmationModal").modal("show");
    }
  }
  
});
