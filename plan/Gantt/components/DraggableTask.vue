<template>
  <Draggable v-model="treeData" ref="tree" virtualization style="height: auto; width: 349px" :watermark="false">
    <template #default="{ node, stat }">
      <div class="flex" >
           <span v-if="stat.children && stat.children.length"  class="mr-2 cursor-pointer" @click="toggleClose(stat, node)">
            {{ stat.open ? "-" : "+" }}
          </span>
        <div  @click="taskClick(node)" class="task-name flex-grow" :class="stat.children && stat.children.length ? 'has-children' : ''">{{ node.name }}</div>
      </div>
    </template>
  </Draggable>
</template>
<script>
import {BaseTree, Draggable} from '@he-tree/vue'
import "@he-tree/vue/style/default.css"

export default {
  name: "DraggableTask",
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  emits: ["change", "click", "parentsClosed"],
  components: {
    BaseTree, Draggable
  },
  data(){
    return {
      closedParents:[]
    }
  },
  computed: {
    treeData: {
      get() {
        return [...this.tasks]
      },
      set(value) {
        this.$emit("change", value)
      },
    },
  },

  methods: {
    taskClick(e) {
     this.$emit("click", e)
    },
    getAllSubGroups(items){
        let groupIDs = [];
        items.forEach(child =>{
          if (child.children && child.children.length >= 1){
            groupIDs.push(child.id)
            groupIDs = [...groupIDs, ...this.getAllSubGroups(child.children)];

          }
        });

      return groupIDs;
    },
    toggleClose(stat, task){
      stat.open = !stat.open
      if(!stat.open){
        this.closedParents = [...this.closedParents, ...this.getAllSubGroups(task.children)];
        this.closedParents.push(task.id)


      } else {
        this.closedParents = this.closedParents.filter(parent=>parent !== task.id);
      }



      this.closedParents = this.closedParents.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      this.$emit("parentsClosed", this.closedParents)
    }
  }
};
</script>
<style scoped>
.has-children{
  font-weight: bold;
}
</style>
