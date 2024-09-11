<template>
  <div class="flex justify-between items-start py-2">
    <div>
      <img
          class="mr-2 w-6 h-6 rounded-full mt-2.5"
          :src="user.avatar !== null && user.avatar !== '' ? 'https://api.amjilt.com/main'+user.avatar : '/amjilt-erp/images/defaultAvatar.svg'"

          :alt="user.first_name">
    </div>
    <div class="flex-grow mr-2">
      <div @click="startComment"
           v-html="`${newComment ? newComment : 'Сэтгэгдэл бичих...'}`"
           v-if="!commenting"
           class="cursor-pointer p-3 w-full bg-gray-200 rounded-lg task-description">

      </div>
      <div v-if="commenting">
        <CK :value="newComment" url="https://api.amjilt.com/main" @on-finish="commentChange"
            @onCancel="commentCancel"></CK>
      </div>
      <a-button v-if="newComment !== null && newComment !== ''" @click="storeComment" :loading="loading" class="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Илгээх</a-button>

    </div>
  </div>
  <section class="bg-white dark:bg-gray-900 ">
    <div class="max-w-2xl mx-auto px-4">
      <CommentBox v-for="(comment, index) in comments" :key="index" :comment="comment" :employees="employees" :user="user" :noBorder="index === 0" @commentUpdated="commentUpdated" @commentDeleted="commentDeleted"  />
    </div>
  </section>
</template>
<script >
import axios from "~/plugins/core/axios";
import CommentBox from "./CommentBox.vue"
import CK from "~~/plan/Common/Components/CK.vue";
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
const user = ls.get(USER_INFO);
export default {
  emits:["commendAdded"],
  components:{
    CK,
    CommentBox
  },
  props: {
    task_id: String,
    emp_id: String,
    employees: Array,
  },
  data(){
    return {
      newComment:"",
      loading:false,
      commenting: false,
      user:user,
      comments:[]
    }
  },
  methods:{
    startComment() {
      this.commenting = true;
    },
    commentChange(comment) {

      this.newComment = comment;
      this.commenting = false;


    },
    commentCancel() {
      this.commenting = false;
    },
    storeComment(){
      this.loading = true;

      axios.post(`https://api.amjilt.com/plan/comment`, {
        task_id:this.task_id,
        emp_id:this.emp_id,
        comment_text:this.newComment,
      }).then(res => {
        this.comments.push(res.data);
        this.loading = false;
        this.newComment = "";
      }).catch(error => {
        console.log(error);
        this.loading = false;
      });
    },
    getComments(){
      this.loading = true;
      axios.get(`https://api.amjilt.com/plan/comments/${this.task_id}`).then(res => {
        this.comments = res.data;
        this.loading = false;

      }).catch(error => {
        console.log(error);
        this.loading = false;
      });
    },
    commentUpdated(comment){
      const index = this.comments.findIndex(c=>c.id === comment.id)
      if(index >= 0){
        this.comments[index] = comment;
      }
    },
    commentDeleted(commentID){
     this.comments = this.comments.filter(c=>c.id !== commentID)

    }
  },
  mounted(){
    if(this.task_id){
      this.getComments();
    }
  },
  watch:{
    task_id(){
      this.newComment = "";
      this.getComments();
    }
  }
}

</script>
<style scoped>

</style>
