<template>
  <div class="doc-editor">
    <div class="control-section">
      <div class="default-section">
        <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title flex justify-between">
          <div v-on:keydown="titleBarKeydownEvent" @click="titleBarClickEvent" class="single-line" v-if="!renameStarted"
               id="documenteditor_title_contentEditor" title="Document Name. Click or tap to rename this document."
               contenteditable="false">{{ documentTitle }}
          </div>
          <a-input v-else v-model:value="documentTitle"  placeholder="Нэр" v-on:keydown="titleBarKeydownEvent"
                   size="small"  style="max-width: 40%" v-on:blur="titleBarBlurEvent"/>


          <div class="ml-auto flex items-center align-right spell-switch">
            <label class="px-3">
              <a-switch v-model:checked="spellCheck" @change="toggleSpellCheck" />
              Үгийн алдаа шалгах
            </label>
            <ejs-button  id="de-print" class="px-3" :style="iconStyle" :iconCss="printIconCss" type="button" v-on:click="printBtnClick"
                        title="Баримт бичгийг хэвлэх(Ctrl+P).">Хэвлэх
            </ejs-button>
            <ejs-dropdownbutton ref="de-export" :style="iconStyle" :items="exportItems" :iconCss="exportIconCss"
                                cssClass="e-caret-hide" content="Татах" v-bind:select="onExport"
                                :open="openExportDropDown" title="Баримт бичгийг татах."></ejs-dropdownbutton>
          </div>

        </div>

        <ejs-documenteditorcontainer
          v-if="height >= 1"
          ref="doceditcontainer"
          :serviceUrl="hostUrl"
          :enableToolbar='true'
          :height="`${height}px`"


          :enableSpellCheck='true'
          v-on:created="onCreated"

        ></ejs-documenteditorcontainer>
      </div>
      <!--      <div class="col-lg-3 property-section">-->
      <!--        <div class="content-wrapper">-->
      <!--          <div class="heading-section de-heading">-->
      <!--            <h5><b>User Permission</b></h5>-->
      <!--          </div>-->

      <!--          <div class="control-label lable-padding"><b>Current User</b>-->
      <!--          </div>-->
      <!--          <div class="control-label lable-padding">-->
      <!--            <ejs-dropdownlist id='ddlelement' :dataSource='userDetails' :value='currentUser'  :change='onUserChange'></ejs-dropdownlist>-->
      <!--          </div>-->
      <!--          <div class="control-label lable-padding"><b>User Color</b>-->
      <!--          </div>-->
      <!--          <ejs-colorpicker ref="usercolorpicker" id="color-picker" :change='onUserColorChange' ></ejs-colorpicker>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode';

import {DocumentEditorContainerComponent, Toolbar} from "@syncfusion/ej2-vue-documenteditor";
import {DropDownButtonComponent} from "@syncfusion/ej2-vue-splitbuttons";
import {ButtonComponent} from "@syncfusion/ej2-vue-buttons";
import {registerLicense, L10n, setCulture} from '@syncfusion/ej2-base';
import {DropDownListComponent} from "@syncfusion/ej2-vue-dropdowns";
import {ColorPickerComponent} from "@syncfusion/ej2-vue-inputs";


import mn_MN from "./mn_mn.json";

import {syncfusionKey} from "~/modules/document/const";

registerLicense(syncfusionKey);

setCulture("mn-MN")
L10n.load(mn_MN);
export default {
  props: ["docData", "documentName", "rename", "currentStep"],
  emits: ["change", "rename"],
  components: {
    'ejs-documenteditorcontainer': DocumentEditorContainerComponent,
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-button': ButtonComponent,
    'ejs-dropdownlist': DropDownListComponent,
    'ejs-colorpicker': ColorPickerComponent
  },
  data() {
    return {
      // hostUrl: 'https://services.syncfusion.com/vue/production/api/documenteditor/',
      hostUrl: 'https://ub-engineering.gov.mn/word/api/documenteditor/',
      documentTitle: '',
      iconStyle: 'background: transparent;box-shadow:none;border-color: transparent;border-radius: none; border:none; color:#fff;margin-top:4px;height:28px;font-weight:400;',
      titleStyle: 'font-weight:400;font-family:inherit;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text',
      openIconCss: 'e-de-icon-Open e-de-padding-right',
      printIconCss: 'ti-printer',
      exportIconCss: 'ti-download',
      exportItems: [
        {text: 'Microsoft Word (.docx)', id: 'word'},
      ],
      toolbarItems: ['New', 'Open', 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator',

        'FormFields', 'UpdateFields'],
      renameStarted: false,
      userDetails: ['engineer@mycompany.com', 'manager@mycompany.com'],
      currentUser: 'engineer@mycompany.com',
      height: 0,
      spellCheck:true
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
    openExportDropDown() {
      document.getElementById('word').setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
      // document.getElementById('sfdt').setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
    },
    save(format) {
      // tslint:disable-next-line:max-line-length
      this.$refs.doceditcontainer.ej2Instances.documentEditor.save(this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName === '' ? 'sample' : this.$refs.doceditcontainer.ej2Instances.documentEditor.documentName, format);
    },

    printBtnClick() {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.print();
    },
    titleBarKeydownEvent(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.renameStarted = false
        this.$emit("rename", this.documentTitle);
      }
    },
    titleBarBlurEvent() {
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
    async generateQRCode() {

      const url = 'https://emiat.miat.com/doc/12FCC7682614442397B33150';
      try {
        // Generate QR Code with Medium error correction level and no margin
        const qrCodeDataURL = await QRCode.toDataURL(url, {
          errorCorrectionLevel: 'M',
          margin: 0
        });
        return qrCodeDataURL; // This is your base64 image string
      } catch (err) {
        console.error(err);
        return null; // Handle error case
      }
    },

    htmlAdder(obj, html, callback) {
      let http = new XMLHttpRequest();
      http.open('POST', 'https://ub-engineering.gov.mn/word/api/documenteditor/LoadString');
      http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      http.responseType = 'json';
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200 || http.status === 304) {

            callback(obj, http.response);

          } else {
            alert('failed;');
          }
        }
      };

      let htmlContent = {content: html};
      http.send(JSON.stringify(htmlContent));


    },
    addContent(obj, response) {

      obj.selection.moveToDocumentEnd();
      obj.editor.insertText('\n');

      obj.selection.paragraphFormat.textAlignment = 'Center';
      obj.editor.paste(response);
    },
    addContentToFooter(obj, response) {
      obj.selection.goToFooter();
      obj.selection.paragraphFormat.textAlignment = 'Right';
      obj.selection.paragraphFormat.lineSpacing = 0;
      obj.selection.paragraphFormat.lineSpacingType = 'AtLeast';
      obj.selection.paragraphFormat.beforeSpacing = 0;
      obj.selection.paragraphFormat.afterSpacing = 0;
      obj.selection.paragraphFormat.spaceBeforeAuto = false;
      obj.selection.paragraphFormat.spaceAfterAuto = false;
      obj.setDefaultCharacterFormat({fontSize: 10, fontFamily: "Arial", lineSpacing: 1});
      obj.selection.paragraphFormat.lineSpacing = 1;
      obj.selection.paragraphFormat.lineSpacingType = 'AtLeast';
      obj.editor.paste(response);
      obj.editor.insertPageNumber();
      obj.editor.insertText('/');
      obj.editor.insertPageCount();
      obj.editor.insertText('\n');
      obj.selection.closeHeaderFooter();
    },



    openSaved() {
      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      if (this.docData) {

        obj.open(this.docData)


      }

      obj.spellChecker.languageID = 1;

      obj.spellChecker.removeUnderline = false;
      obj.allowSpellCheckAndSuggestion = true;


      // this.addSignatures(obj);
    //  this.addQRCodeAndPageNumber(obj);
    },
    toggleSpellCheck(){
      this.$nextTick(() => {
        var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
        if (this.spellCheck) {

          obj.spellChecker.removeUnderline = false;
        } else {
          obj.spellChecker.removeUnderline = true;
        }
      })
    },

    onUserChange: function (e) {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.currentUser = e.value;
    },
    onUserColorChange: function (e) {
      this.$refs.doceditcontainer.ej2Instances.documentEditor.userColor = e.currentValue.hex;
    },
    moveCursorToNextCell(obj) {
      // To get current selection start offset
      var startOffset = obj.selection.endOffset;
      // Increasing cell index to consider next cell
      var cellIndex = parseInt(startOffset.substring(6, 7)) + 1;
      console.log(cellIndex)
      console.log(cellIndex)
      // Changing start offset
      startOffset =
        startOffset.substring(0, 6) +
        cellIndex.toString() +
        startOffset.substring(7, startOffset.length);
      // Navigating selection using select method
      obj.selection.select(startOffset, startOffset);

    },
    moveCursorToNextRow() {
      // To get current selection start offset
      var startOffset = this.$refs.doceditcontainer.ej2Instances.documentEditor.selection.startOffset;
      // Increasing row index to consider next row
      var rowIndex = parseInt(startOffset.substring(4, 5)) + 1;
      var cellIndex =
        parseInt(startOffset.substring(6, 7)) != 0
          ? parseInt(startOffset.substring(6, 7)) - 1
          : 0;
      // Changing start offset
      startOffset =
        startOffset.substring(0, 4) +
        rowIndex.toString() +
        startOffset.substring(5, 6) +
        cellIndex +
        startOffset.substring(7, startOffset.length);
      // Navigating selection using select method
      this.$refs.doceditcontainer.ej2Instances.documentEditor.selection.select(startOffset, startOffset);
    },
    updateDocumentEditorSize(obj) {
      //Resizes the document editor component to fit full browser window.
      //  var windowWidth = window.innerWidth;
      //  var windowHeight = window.innerHeight;
      //
      // obj.resize(windowWidth - 350, windowHeight - 350);

      this.height = window.innerHeight - 130;
    },
    onCreated () {
      // var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      // setInterval(() => {
      //   this.updateDocumentEditorSize(obj);
      // }, 100);
      // //Adds event listener for browser window resize event.
      // window.addEventListener('resize', ()=>this.updateDocumentEditorSize(obj));
    },
  },
  beforeMount() {
    this.updateDocumentEditorSize();
    window.addEventListener('resize', this.updateDocumentEditorSize);
  },
  mounted() {

    this.$nextTick(() => {

      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      this.$refs.doceditcontainer.ej2Instances.documentEditorSettings.showRuler = true;


      obj.currentUser = this.currentUser;

      this.documentTitle = this.documentName;
      obj.documentName = this.documentName;
      // this.$refs.doceditcontainer.ej2Instances.toolbarItems = this.toolbarItems;
      this.$refs.doceditcontainer.ej2Instances.showPropertiesPane = false;
      this.$refs.doceditcontainer.ej2Instances.documentEditor.userColor = "#ffffff"
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
  //max-width: calc(100vw - 300px);
  margin-bottom: 20px;
}

#documenteditor_title_name {
  color: #ffffff;
}

.e-btn-pageweb-spellcheck {
  border: 0;
  box-shadow: none;
  float: right;
  margin-left: calc(100% - 450px) !important;
}
.e-de-ctn-title{
  .ant-switch {
    background: #45659b !important;
    height: 22px !important;
  }
  .ant-switch-checked {
    background: #fff !important;
   .ant-switch-handle::before {
     background-color: #0b4da3;
   }
  }
  .spell-switch{
    font-weight: 400;
  }
}
</style>
