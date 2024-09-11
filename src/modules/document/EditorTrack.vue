<template>
  <div class="doc-editor">
    <div class="control-section" >
      <div class="sample-container">
        <div class="default-section">
          <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title">
            <div v-on:keydown="titleBarKeydownEvent" @click="titleBarClickEvent" class="single-line" v-if="!renameStarted"
                 id="documenteditor_title_contentEditor" title="Document Name. Click or tap to rename this document."
                 contenteditable="false">{{ documentTitle }}
            </div>
            <a-input v-else v-model:value="documentTitle" placeholder="Нэр" v-on:keydown="titleBarKeydownEvent" size="small" class="mt-1" style="max-width: 50%" v-on:blur="titleBarBlurEvent" />
            <ButtonComponent id="de-print" :style="iconStyle" :iconCss="printIconCss" type="button" v-on:click="printBtnClick"
                        title="Баримт бичгийг хэвлэх(Ctrl+P).">Хэвлэх
            </ButtonComponent>
            <DropDownButtonComponent ref="de-export" :style="iconStyle" :items="exportItems" :iconCss="exportIconCss"
                                cssClass="e-caret-hide" content="Татах" v-bind:select="onExport"
                                :open="openExportDropDown" title="Баримт бичгийг татах."></DropDownButtonComponent>
          </div>
          <DocumentEditorContainerComponent ref="doceditcontainer"
                                            :serviceUrl="hostUrl"
                                            :enableToolbar='true'

                                            currentUser="Ч.Мөнх-Алтай"
                                            userColor='#b70f34'
                                       height='800px'></DocumentEditorContainerComponent>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {DocumentEditorContainerComponent, Toolbar} from "@syncfusion/ej2-vue-documenteditor";
import {DropDownButtonComponent} from "@syncfusion/ej2-vue-splitbuttons";
import {ButtonComponent} from "@syncfusion/ej2-vue-buttons";
import {registerLicense} from '@syncfusion/ej2-base';
import {syncfusionKey} from "~/modules/document/const";
registerLicense(syncfusionKey);
export default {
  props:["docData", "documentName", "rename", "currentStep"],
  emits:["change", "rename"],
  components: {
    DocumentEditorContainerComponent,
    DropDownButtonComponent,
    ButtonComponent
  },
  data() {
    return {
      hostUrl: 'https://services.syncfusion.com/vue/production/api/documenteditor/',

      documentTitle: '',
      iconStyle: 'float:right;background: transparent;box-shadow:none;border-color: transparent;border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;font-family:inherit;',
      titleStyle: 'font-weight:400;font-family:inherit;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text',
      openIconCss: 'e-de-icon-Open e-de-padding-right',
      printIconCss: 'ti-printer',
      exportIconCss: 'ti-download',
      exportItems: [
        {text: 'Microsoft Word (.docx)', id: 'word'},
      ],
      // toolbarItems: [ 'Undo','Redo','Comments','Image','Table','Hyperlink','Bookmark','TableOfContents',       'Header','Footer','PageSetup','PageNumber','Break','Find','LocalClipboard','RestrictEditing'],
      renameStarted:false
    };
  },
  provide: {
    DocumentEditorContainer: [Toolbar],

  },
  methods: {
    onExport(args) {
      switch (args.item.id) {
        case 'word':
          this.save('Docx');
          break;
        case 'sfdt':
          this.save('Sfdt');
          break;
      }
    },
    openExportDropDown(){
      document.getElementById('word').setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
      document.getElementById('sfdt').setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
    },
    save (format) {
      // tslint:disable-next-line:max-line-length
      this.$refs.doceditcontainer.ej2Instances.documentEditor.save(this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName === '' ? 'sample' : this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName, format);
    },

    printBtnClick () {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.print();
    },
    titleBarKeydownEvent (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.renameStarted = false
        this.$emit("rename", this.documentTitle);
      }
    },
    titleBarBlurEvent () {
      this.renameStarted = false
      this.$emit("rename", this.documentTitle);
    },
    titleBarClickEvent() {
      this.renameStarted = true;
    },
    changed() {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.saveAsBlob('Sfdt').then((blob) => {

        const reader = new FileReader();


        reader.onloadend = () => {
          const text = reader.result;
         this.$emit("change", text)
        }
        reader.readAsText(blob);
      });
    },
    openSaved() {
      if(this.docData){
        var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
        obj.open(this.docData)
      }

    }
  },
  mounted() {
    this.$nextTick(() => {
      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      this.$refs.doceditcontainer.ej2Instances.documentEditorSettings.showRuler = true;

      this.documentTitle = this.documentName;
      obj.documentName = this.documentName;
      // this.$refs.doceditcontainer.ej2Instances.toolbarItems = this.toolbarItems;
      this.$refs.doceditcontainer.ej2Instances.showPropertiesPane = false;


      this.$refs.doceditcontainer.ej2Instances.contentChange = () => {
        this.changed();
      };
      this.openSaved();
    });
  },

};
</script>
<style lang="scss">
@import "~/modules/document/styles/dms.css";

.doc-editor {
  position: relative;
  max-width: calc(100vw - 300px);
  margin-bottom: 20px;
}

#documenteditor_title_name {
  color: #ffffff;
}
</style>
