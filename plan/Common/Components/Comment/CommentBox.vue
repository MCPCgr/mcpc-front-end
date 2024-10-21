<template>
  <article :class="boxClass">
    <footer class="flex justify-between items-center mb-2 relative">
      <div class="flex items-center">
        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
            class="mr-2 w-6 h-6 rounded-full"
            :src="employee.avatar !== null && employee.avatar !== '' ? 'https://mcpc.mn'+employee.avatar : '/amjilt-erp/images/defaultAvatar.svg'"
            :alt="employee.firstname">{{ employee.firstname }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate :datetime="commentDate" :title="commentDate">
          {{ commentDate }}</time></p>
      </div>
      <a-dropdown :trigger="['click']" v-if="user.emp_id === comment.emp_id">

        <button @click.prevent
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button">
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
            </path>
          </svg>

        </button>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0" @click="startComment">
              Засах
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1" @click="deleteComment">
              Устгах
            </a-menu-item>


          </a-menu>
        </template>
      </a-dropdown>


    </footer>
    <div class="text-gray-500 dark:text-gray-400" v-if="!commenting" v-html="comment_text ? comment_text : comment.comment_text"></div>

    <div v-if="commenting">
      <CK :value="comment_text" url="https://mcpc.mn" @on-finish="commentChange"
          @onCancel="commentCancel"></CK>
    </div>
    <a-button v-if="comment_text !== null && comment_text !== ''" @click="storeComment" :loading="loading" class="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Хадгалах</a-button>


<!--    <div class="flex items-center mt-4 space-x-4">-->
<!--      <button type="button"-->
<!--              class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">-->
<!--        <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>-->
<!--        Хариулах-->
<!--      </button>-->
<!--    </div>-->
  </article>
  <CommentBox v-for="replay in replayComments" :noBorder="true"  :is-replay="true" :key="replay.key" />
</template>
<script>
import dayjs from '@lambda-platform/lambda-vue/src/utils/dayjs'

import CK from "~~/plan/Common/Components/CK.vue";
import axios from "~/plugins/core/axios";



export default {
  name:"CommentBox",
  components: {CK},
  emits:["commentUpdated", "commentDeleted"],
  props: {
    noBorder: Boolean,
    isReplay: Boolean,
    replayComments: Array,
    employees: Array,
    comment: Object,
    user: Object,
  },
  data() {
    return {
      comment_text: "",
      loading: false,
      showDropDown:false,
      commenting:false
    }
  },
  methods:{
    startComment() {
      this.commenting = true;
      this.comment_text = this.comment.comment_text
    },
    commentChange(comment) {

      this.comment_text = comment;
      this.commenting = false;


    },
    commentCancel() {
      this.commenting = false;
    },
    storeComment(){
      this.loading = true;

      axios.post(`https://plan.mcpc.mn/comment/${this.comment.id}`, {
        task_id:this.comment.task_id,
        emp_id:this.comment.emp_id,
        comment_text:this.comment_text,
      }).then(res => {
        this.$emit('commentUpdated', res.data)
        this.loading = false;
        this.comment_text = ""



      }).catch(error => {
        console.log(error);
        this.loading = false;
      });
    },
    deleteComment(){
      this.loading = true;

      axios.get(`https://plan.mcpc.mn/delete-comment/${this.comment.id}`).then(res => {
        this.$emit('commentDeleted', this.comment.id)


      }).catch(error => {
        console.log(error);
        this.loading = false;
      });
    },
  },
  computed:{

    commentDate(){
      const formatString = "YYYY-MM-DDTHH:mm:ss"
      const formatString2 = "YYYY-MM-DD HH:mm:ss"
      return dayjs(this.comment.created_at, formatString).format(formatString2);
    },
    employee(){
      const index = this.employees.findIndex(emp=>emp.id === this.comment.emp_id);
      if(index >= 0){
        return this.employees[index]
      }
      return {
        id:null,
        firstname: "",
        avatar:null
      }

    },
    boxClass(){
      let myClass = "p-4 mb-4 text-base bg-white rounded-lg dark:bg-gray-900"
      if(!this.noBorder){
        myClass = myClass + " border-t border-gray-200 dark:border-gray-700"
      } else
      if(this.isReplay){
        myClass = myClass + " ml-6 lg:ml-12"
      }
      return myClass
    }
  }
}
</script>
<style scoped>

</style>
