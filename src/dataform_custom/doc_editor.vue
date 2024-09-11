<template>
  <lambda-form-item :label="label" :name="model.component" :meta="meta">
    <div class="doc-template-creator">
      <div class="control-section wh-full h-full " style="height: calc(100vh);">

        <div class="sample-container">
          <div class="default-section">
            <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title">
              <div v-on:keydown="titleBarKeydownEvent" v-on:click="titleBarClickEvent" class="single-line"
                   id="documenteditor_title_contentEditor" title="Document Name. Click or tap to rename this document."
                   contenteditable="false">
                <label v-on:blur="titleBarBlurEvent" id="documenteditor_title_name"
                       :style="titileStyle">{{ documentName }}</label>
              </div>
              <ejs-button id="de-print" :style="iconStyle" :iconCss="printIconCss" type="button" v-on:click="printBtnClick"
                          title="Баримт бичгийг хэвлэх(Ctrl+P).">Хэвлэх
              </ejs-button>
              <ejs-dropdownbutton ref="de-export" :style="iconStyle" :items="exportItems" :iconCss="exportIconCss"
                                  cssClass="e-caret-hide" content="Татах" v-bind:select="onExport"
                                  :open="openExportDropDown" title="Баримт бичгийг татах."></ejs-dropdownbutton>
            </div>
            <ejs-documenteditorcontainer ref="doceditcontainer" :serviceUrl="hostUrl" :enableToolbar='true'
                                         height='800px'></ejs-documenteditorcontainer>
          </div>
        </div>
      </div>
    </div>
  </lambda-form-item>
</template>
<script>
import mn_MN from "~/modules/document/mn_mn.json";
import mixin from "@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin";
import {DocumentEditorContainerComponent, Toolbar} from "@syncfusion/ej2-vue-documenteditor";
import {DropDownButtonComponent} from "@syncfusion/ej2-vue-splitbuttons";

import {ButtonComponent} from "@syncfusion/ej2-vue-buttons";
import SubTopMenu from "~/components/Menu/SubTopMenu.vue";
import {L10n, registerLicense, setCulture} from '@syncfusion/ej2-base';
import {syncfusionKey} from "~/modules/document/const";


registerLicense(syncfusionKey);


setCulture("mn-MN")
L10n.load(mn_MN);

export default {

  components: {
    SubTopMenu,
    'ejs-documenteditorcontainer': DocumentEditorContainerComponent,
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-button': ButtonComponent
  },
  mixins: [mixin],
  data() {
    return {
      // hostUrl: 'https://ub-engineering.gov.mn/word/api/documenteditor/',
      hostUrl: 'https://services.syncfusion.com/vue/production/api/documenteditor/',
      documentName: 'Албан бичгийн загвар',
      documentTitle: 'Untitled Document',
      iconStyle: 'float:right;background: transparent;box-shadow:none;border-color: transparent;border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;font-family:inherit;',
      titileStyle: 'text-transform:capitalize;font-weight:400;font-family:inherit;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text',
      openIconCss: 'e-de-icon-Open e-de-padding-right',
      printIconCss: 'ti-printer',
      exportIconCss: 'ti-download',
      exportItems: [
        {text: 'Microsoft Word (.docx)', id: 'word'},
        // {text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt'}

      ],
      toolbarItems: [
        "New", "Open",
        "Separator",
        "Undo", "Redo", "Separator", "Image", "Table", "Hyperlink", "Bookmark", "TableOfContents", "Separator", "Header", "Footer", "PageSetup", "PageNumber", "Break", "InsertFootnote", "InsertEndnote", "Separator", "Find", "Separator", "Comments", "TrackChanges", "Separator", "LocalClipboard", "RestrictEditing", "Separator", "FormFields", "UpdateFields"],

    };
  },
  provide: {
    DocumentEditorContainer: [Toolbar]
  },
  methods: {
    onExport: function (args) {
      switch (args.item.id) {
        case 'word':
          this.save('Docx');
          break;
        case 'sfdt':
          this.save('Sfdt');
          break;
      }
    },
    openExportDropDown: function () {
      // tslint:disable-next-line:max-line-length
      document.getElementById('word').setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
      // tslint:disable-next-line:max-line-length
      document.getElementById('sfdt').setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
    },
    save: function (format) {
      // tslint:disable-next-line:max-line-length
      this.$refs.doceditcontainer.ej2Instances.documentEditor.save(this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName === '' ? 'sample' : this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName, format);
    },
    openBtnClick: function () {
      this.$refs.uploadDocument.click();
    },
    printBtnClick: function () {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.print();
    },
    titleBarKeydownEvent: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
        if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
          document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
        }
      }
    },
    titleBarBlurEvent: function (args) {
      if (document.getElementById("documenteditor_title_contentEditor").textContent === '') {
        document.getElementById("documenteditor_title_contentEditor").textContent = 'Document1';
      }
      document.getElementById("documenteditor_title_contentEditor").contentEditable = 'false';
      this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName = document.getElementById("documenteditor_title_name").textContent;
    },
    titleBarClickEvent: function () {
      this.updateDocumentEditorTitle();
    },
    updateDocumentEditorTitle: function () {
      document.getElementById("documenteditor_title_contentEditor").contentEditable = 'true';
      document.getElementById("documenteditor_title_contentEditor").focus();
      window.getSelection().selectAllChildren(document.getElementById("documenteditor_title_contentEditor"));
    },
    documentChangedEvent: function () {
      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      this.documentTitle = obj.documentName === '' ? 'Untitled Document' : obj.documentName;
      document.getElementById("documenteditor_title_name").textContent = obj.documentName;
      setTimeout(() => {
        obj.scrollToPage(1);
      }, 10);
    },
    changed() {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.saveAsBlob('Sfdt').then((blob) => {

        const reader = new FileReader();


        reader.onloadend = () => {
          const text = reader.result;
// console.log(text)
          this.model.form[this.model.component] = text;
        }
        reader.readAsText(blob);
      });


    },
    async openSaved() {
      const saveData = this.model.form[this.model.component]; // Your saved Base64 data


      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;

      obj.open(saveData)

    }
  },
  mounted() {
    this.$nextTick(async () => {
      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      this.$refs.doceditcontainer.ej2Instances.documentEditorSettings.showRuler = true;


      // obj.open(JSON.stringify(defaultDocument));
      obj.documentName = 'Баримт бичгийн';
      this.$refs.doceditcontainer.ej2Instances.toolbarItems = this.toolbarItems;
      this.$refs.doceditcontainer.ej2Instances.documentChange = () => {
        this.documentChangedEvent();
      };
      this.$refs.doceditcontainer.ej2Instances.contentChange = () => {
        this.changed();
      };
    });
  },
  watch: {
    do_render(show) {

    },
    itemValue(v, oldV) {
      if (oldV === null && v) {
        this.openSaved()
      }
    }
  },
};
</script>
<style lang="scss">
@import "~/modules/document/styles/dms.css";

.doc-template-creator {
  position: relative;
  margin-bottom: 30px;
  max-width: calc(100vw - 350px);
}

#documenteditor_title_name {
  color: #ffffff;
}
</style>
