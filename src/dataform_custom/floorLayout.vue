<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
    <div class="seat-planner">
      <div class="seat-plan">
        <input type="file" name="file" id="file" style="display:none;" @change="parseSVG">
        <label for="file" class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-orange-800">Давхрын план зураг сонгох</label>
        <svg id="test-svg" viewBox="0 0 0 0" style="display:none;">
        </svg>
        <div id="svg-preview"></div>
      </div>
      <div :class="selecting ? 'seat-list selecting' : 'seat-list'">
        <div  class="seat-type">
          <h3>Ширээ</h3>
          <div>
            <div v-for="object in pos_floor_objects.filter(o=>o.object_type === 'table')" :key="object.index"
                 :class="object.path_id !== null && object.path_id !== '' ? 'seat-planed' : 'seat-pending'"
                 @click="selectObject(object)"
                 @mouseover="showMe(object)"
                 @mouseleave="leaveObject(object)"
            >
             Ширээ {{object.object_number}}
            </div>
          </div>
        </div>
        <div  class="seat-type">
          <h3>Өрөө</h3>
          <div>
            <div v-for="object in pos_floor_objects.filter(o=>o.object_type === 'room')" :key="object.index"
                 :class="object.path_id !== null && object.path_id !== '' ? 'seat-planed' : 'seat-pending'"
                 @click="selectObject(object)"
                 @mouseover="showMe(object)"
                 @mouseleave="leaveObject(object)"
            >
              Өрөө {{object.object_number}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </lambda-form-item>
</template>

<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin'

export default {

  mixins: [mixin],

  data() {
    return {
      readyCreate: false,
      pos_floor_objects:[],
      selecting:false,
      ojbectDOM:null
    }
  },
  methods: {
    selectObject(object){

      if(this.ojbectDOM && this.selecting){
        this.selecting = false;
        this.ojbectDOM.setAttribute("fill", "#8e58ce")
        this.ojbectDOM.setAttribute("class", "selected")
        this.ojbectDOM.setAttribute("id", `${object.object_type}-${object.object_number}`);
        object.path_id = `${object.object_type}-${object.object_number}`;

        this.ojbectDOM = null;

        this.model.form["pos_floor_objects"] = this.pos_floor_objects;
        this.model.form[this.model.component] = document.getElementById("svg-preview").innerHTML;

      }

    },
    showMe(seat){

      if(seat.path_id !== null && seat.path_id !== ""){

        document.getElementById(seat.path_id).setAttribute("fill", "green")

      }

    },
    leaveObject(object){

      if(object.path_id !== null && object.path_id !== ""){

        document.getElementById(object.path_id).setAttribute("fill", "#8e58ce")

      }

    },
    createEvents(childNodes){
      childNodes.forEach(DOM=>{
        if(DOM.nodeName !== "#text"){
          if(DOM.childNodes.length >= 1){
            this.createEvents(DOM.childNodes)
          } else {
            DOM.addEventListener('click',  ()=> {
              if(DOM.getAttribute("class") !== "selected" && DOM.getAttribute("class") !== "pending"){
                DOM.setAttribute("default-fill", DOM.getAttribute("fill"))
                DOM.setAttribute("fill", "#3471f6")
                DOM.setAttribute("class", "pending")


                this.selecting = true;
                this.ojbectDOM = DOM;

              } else {
                DOM.setAttribute("fill", DOM.getAttribute("default-fill"))
                DOM.setAttribute("class", "")
                DOM.setAttribute("id", ``);

                this.selecting = false;
                this.ojbectDOM = null;

              }





            });
          }
        }
      })
    },
    prepareSeats() {
      if(this.readyCreate){
        this.createEvents(document.getElementById("svg-creator").childNodes);
      }
    },
    parseSVG() {
      let data = document.getElementById("file").files[0];
      let reader = new FileReader();
      this.readyCreate = false
      reader.onload = (e) => {

        let svgPreviewer = document.getElementById("svg-preview")


        // svgPreviewer.innerHTML = convertProcess(this.convert(e.target.result));
        // svgPreviewer.innerHTML = this.convert(e.target.result);
        svgPreviewer.innerHTML = e.target.result;
        // svgPreviewer.innerHTML = convertProcess(e.target.result);

        if (svgPreviewer.childNodes.length >= 1) {
          if (svgPreviewer.childNodes[0].nodeName === 'svg' || svgPreviewer.childNodes[0].nodeName === "SVG") {
            let target = svgPreviewer.childNodes[0];
            target.id = "svg-creator";
            this.readyCreate = true;
            this.prepareSeats();
          } else {
            alert("SVG файл оруулана уу")
          }
        } else {
          alert("SVG файл оруулана уу")
        }
      }
      reader.readAsText(data);
    },
    parseSavedData(saved){
      console.log(saved)
    },
    generateObjects(objectCount, objectType){


      if(objectCount === 0 || objectCount === null){
        this.pos_floor_objects = this.pos_floor_objects.filter(o=>o.object_type !== objectType);
      } else {
        for (let i = 0; i < objectCount; i++) {

          let index = -1;
          if(this.pos_floor_objects_data){
            if(this.pos_floor_objects_data.length >= 1){
              index = this.pos_floor_objects_data.findIndex(object=>object.object_type === objectType && object.object_number === i+1)
            }
          }
          if(index >= 0){
            this.pos_floor_objects[index] = {floor_id:this.floor_id, object_type:objectType, object_number:i+1 , path_id:this.pos_floor_objects_data[index].path_id, id:undefined};
          } else {

            index = this.pos_floor_objects.findIndex(object=>object.object_type === objectType && object.object_number === i+1)
            if(index >= 0) {
              this.pos_floor_objects[index] = {
                floor_id: this.floor_id,
                object_type: objectType,
                object_number: i + 1,
                path_id: this.pos_floor_objects[index].path_id,
                id: undefined
              };
            } else {
              this.pos_floor_objects.push({floor_id:this.floor_id, object_type:objectType, object_number:i+1 , path_id:null, id:undefined});
            }

          }


        }

        this.pos_floor_objects = this.pos_floor_objects.filter(o=>o.object_type !== objectType || (o.object_type === objectType && o.object_number <= objectCount));

      }
    },
    init(){
      if (this.editMode && !this.readyCreate && this.itemValue) {
        document.getElementById("svg-preview").innerHTML = this.itemValue;
        this.readyCreate = true;
        this.prepareSeats();
        this.generateObjects(this.table_count, "table");
        this.generateObjects(this.room_count, "room");
      } else {
        this.generateObjects(this.table_count, "table");
        this.generateObjects(this.room_count, "room");
      }

    }
  },
  created (){},
  mounted(){
    this.init();
  },
  computed: {
    table_count(){
      return this.model.form["table_count"];
    },
    floor_id(){
      return this.model.form["floor_id"];
    },
    room_count(){
      return this.model.form["room_count"];
    },
    pos_floor_objects_data(){
      return this.model.form["pos_floor_objects"];
    }
  },
  watch: {
    table_count(){
      this.generateObjects(this.table_count, "table");
    },
    room_count(){
      this.generateObjects(this.room_count, "room");
    },
    do_render(value) {

      if (value) {
        this.init();
      }
    },
    itemValue (value, oldValue) {

      if ((oldValue && !value) || (value && !oldValue)) {
        if (value) {

          document.getElementById("svg-preview").innerHTML = this.itemValue;
          this.readyCreate = true;
          this.prepareSeats();
        }

      }
    }
  }

}
</script>
<style lang="scss">
.seat-planner{
  width: 100%;
  .seat-plan{
    width: 65%;
    display: inline-block;
    vertical-align: top;
  }
  .seat-list{
    width: 35%;
    display: inline-block;
    vertical-align: top;
    .seat-type{
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #cccccc;
    }
    .seat-planed, .seat-pending{
      min-width: 25px;
      height: 25px;
      border-radius: 5px;
      padding: 5px;
      vertical-align: middle;
      background-color: #7b929e;
      margin: 5px;
      color:#fff;
      cursor: pointer;
      display: inline-block;
      text-align: center;
      line-height: 16px;
    }
    .seat-planed{
      background-color: #8e58ce;
      &:hover{
        background-color: green;
      }
    }
  }
  .selecting{
    .seat-pending{
      background-color: #3471f6;
      &:hover{
        background-color: green;
      }
    }
  }
}
#svg-preview{
  svg {
    max-width: 100% !important;
    height: auto !important;
  }
}
</style>
