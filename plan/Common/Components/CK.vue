<template>
  <div>
    <ckeditor
      ref="ckeditor"
      :editor="editor"
      v-model="ckValue"
      :config="editorConfig"
      @ready="onReady"
      @blur="onBlur"
      @focus="onFocus"

    ></ckeditor>
   <div class="my-2">
     <a-button type="primary" @click="finish" class="mr-2">Болсон</a-button>
     <a-button @click="cancel">Болих</a-button>
   </div>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";




import axios from "~/plugins/core/axios";

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then((uploadedFile) => {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append("file", uploadedFile);

        axios({
          url: `${window.baseUrl}/lambda/krud/upload`,
          method: "post",
          data,
        })
          .then((response) => {
            if (response.status === 200) {
              resolve({
                default: `${window.baseUrl}${response.data}`,
              });
            } else {
              reject(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
            reject("Upload failed");
          });
      });
    });
  }

  abort() {}
}

function LambdaUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new UploadAdapter(loader);
  };
}

export default {
  name: "myCKEditor",
  props: ['value', 'url'],
  emits:['onFinish', 'onCancel'],
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "|",
            "blockQuote",
            "|",
            "insertTable",
            "|",
            "indent",
            "outdent",
            "|",
            "mediaEmbed",
            "|",

            "uploadImage",


          ],
          shouldNotGroupWhenFull: true,
        },

        extraPlugins: [LambdaUploadAdapterPlugin],
        placeholder: "",
      },
      ckValue:""
    };
  },
  created() {
    if (this.url) {
      window.baseUrl = this.url;
    }
    if(this.value){
      this.ckValue = this.value.toString();
    }

  },

  methods: {
    // onChange(value){
    //   this.$emit('update:value', value);
    // },
    finish(){
      this.$emit('onFinish', this.ckValue);
    },
    cancel(){
      this.$emit('onCancel');
    },
    onBlur(e) {

    },
    onFocus(editor) {},
    onReady(event) {},
  },
};
</script>
<style>
.dark .ck.ck-editor__main > .ck-editor__editable {
  background: #192846 !important;
}

.dark .ck-toolbar {
  background: #192846 !important;
  color: white;
}
.dark .ck-icon_inherit-color {
  color: white !important;
}
.dark .ck-button {
  color: white !important;
}
</style>
