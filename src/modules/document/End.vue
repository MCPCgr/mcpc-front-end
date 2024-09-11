<template>
  <div class="doc-editor">
    <div class="control-section">
      <div class="default-section">
        <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title" v-if="!hideTitle">
          <div
            id="documenteditor_title_contentEditor" title="Document Name. Click or tap to rename this document."
            contenteditable="false">{{ documentTitle }}
          </div>

          <ejs-button id="de-print" :style="iconStyle" :iconCss="printIconCss" type="button" v-on:click="printBtnClick"
                      title="Баримт бичгийг хэвлэх(Ctrl+P).">Хэвлэх
          </ejs-button>
          <ejs-dropdownbutton ref="de-export" :style="iconStyle" :items="exportItems" :iconCss="exportIconCss"
                              cssClass="e-caret-hide" content="Татах" v-bind:select="onExport"

                              :isReadOnly="true"
                              :open="openExportDropDown" title="Баримт бичгийг татах."></ejs-dropdownbutton>
        </div>

        <ejs-documenteditorcontainer
          v-if="height >= 1"
          ref="doceditcontainer"
          :serviceUrl="hostUrl"
          :enableToolbar='false'
          :height="`${height}px`"


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
import {VotingPageHTML} from "./votingPage";

import axios from "~/plugins/core/axios";
import {getEmployeesByIDS} from "~/graphql/fetch";

registerLicense(syncfusionKey);

setCulture("mn-MN")
L10n.load(mn_MN);
export default {
  props: ["docData", "documentName", "rename", "currentStep", "id", "hideTitle", "date", "vote_additional_comments", "name", "description"],
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
      hostUrl: 'https://ub-engineering.gov.mn/word/api/documenteditor/',
      documentTitle: '',
      iconStyle: 'float:right;background: transparent;box-shadow:none;border-color: transparent;border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;font-family:inherit;',
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
      statusHistories:[],
      votingPeople:[],
      employees:[],
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

      const url = `https://amjilt.com/document/check/${this.id}`;
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

    async htmlAdder(obj, html, callback) {
      try {
        const response = await fetch('https://ub-engineering.gov.mn/word/api/documenteditor/LoadString', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({ content: html })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        callback(obj, data);
      } catch (error) {
        alert('Failed; ' + error.message);
      }
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


      obj.isReadOnly = true;
    },


    openSaved() {
      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      if (this.docData) {

        obj.open(this.docData)


      }
      //
      // obj.spellChecker.languageID = 1;
      //
      // obj.spellChecker.removeUnderline = false;
      // obj.allowSpellCheckAndSuggestion = true;


      this.GetHistory(obj);

    },
    async addQRCodeAndPageNumber(obj) {


      const qrcode = await this.generateQRCode();

      let htmltags = `<?xml version='1.0' encoding='utf - 8'?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN''http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html xmlns ='http://www.w3.org/1999/xhtml' xml:lang='mn' lang ='mn'>
<body style="margin: 0; padding: 0;">
<table style="width:100%; margin: 0; padding: 0;">
  <tr>
    <td><img width="80" height="80"   src="${qrcode}" /></td>
    <td style="text-align: right; font-family: Arial; font-size: 12px;">
       Албан бичгийн нэгдсэн системээс олгосон давтагдашгүй дугаар бүхий
      цахим албан бичиг нь цаасан албан бичгийн нэгэн адил хүчинтэй байна.
    </td>
  </tr>
</table>
</body>
</html>
`;

     await this.htmlAdder(obj, htmltags, this.addContentToFooter);





    },
    async addSignatures(obj) {


      const status_histories = this.statusHistories.reverse().filter(h => h.is_done && h.status_type !== "PRE_END" && h.status_type !== "TRANSFER" && h.status_type !== "VOTE" && h.status_type !== "RE_CREATE" && h.status_type !== "START");


      obj.selection.moveToDocumentEnd();
      // obj.editor.insertPageBreak();



      for (const history of status_histories) {




        if (history.signature !== null && history.signature !== "") {

          const docSignature = history.signature;
let realSignature = docSignature.signature;
let info = `Цахимаар баталгаажуулсан огноо цаг: <br/> ${this.$dateTime(history.created_at)}`;
          if(docSignature.type == "text"){
            realSignature = realSignature + "<br/>"
          } else {
            let imageData = realSignature
            if(docSignature.type == "imageFile"){

            }
            realSignature  = `<div >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="${imageData}" height="35" /></div>`

            info = `Цахимаар баталгаажуулсан: ${this.getEmployeesByID(history.emp_id)} <br/>Oгноо цаг: ${this.$dateTime(history.created_at)}`;
          }



          const htmltags = `<?xml version='1.0' encoding='utf - 8'?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN''http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html xmlns ='http://www.w3.org/1999/xhtml' xml:lang='mn' lang ='mn'>
<body style="margin: 0; padding: 0;">
<table style="width:100%; margin: 0; padding: 0;">
  <tr>
    <td style="text-align: left; font-family: Arial; font-size: 12px; vertical-align: middle; width:45%">${docSignature.signAction} : ${this.getEmployeesByID(history.emp_id)}</td>
    <td style="text-align: center; font-family: Arial; font-size: 12px; vertical-align: middle; width:55%">
        ${realSignature}
        ${info}
    </td>
  </tr>
</table>
</body>
</html>
`;

          await this.htmlAdder(obj, htmltags, this.addContent)
        } else {

          const infoHTML = `<?xml version='1.0' encoding='utf - 8'?><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN''http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html xmlns ='http://www.w3.org/1999/xhtml' xml:lang='mn' lang ='mn'>
<body style="margin: 0; padding: 0;">
<table style="width:100%; margin: 0; padding: 0;">
  <tr>
    <td style="text-align: left; font-family: Arial; font-size: 12px; vertical-align: middle">${history.status_action} : ${this.getEmployeesByID(history.emp_id)}
    </td>

  </tr>
</table>
</body>
</html>
`;
          await this.htmlAdder(obj, infoHTML, this.addContent)
        }


      }

      if(this.votingPeople.length >= 1){
        await  this.addVotingPage(obj);
      }
      await this.addQRCodeAndPageNumber(obj);
    },
    getEmployeesByID(empID) {
      const index = this.employees.findIndex(employee => employee.id === empID);
      if(index >= 0){
        const emp = this.employees[index];

        return `Салбар нэгж: ${emp.struct_name} <br/>${emp.a_tushaal_ner}: ${emp.lastname ? emp.lastname.charAt(0).toUpperCase() + "." : ''}${ emp.firstname}`;
      } else {
        return ""
      }
    },
    async addVotingPage(obj){


      obj.editor.insertPageBreak();


      const pageHTML = VotingPageHTML(this.date, this.statusHistories, this.vote_additional_comments, this.votingPeople, this.name, this.description);

      await this.htmlAdder(obj, pageHTML, this.addContent)


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
    onCreated() {
      // var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      // setInterval(() => {
      //   this.updateDocumentEditorSize(obj);
      // }, 100);
      // //Adds event listener for browser window resize event.
      // window.addEventListener('resize', ()=>this.updateDocumentEditorSize(obj));
    },
    async GetHistory(obj) {
      try {
        const r = await axios.get(`https://api.amjilt.com/document/process/history/${this.id}`, );

        let empIDs = [];
        if(r.data.statusHistories){
          this.statusHistories = r.data.statusHistories.reverse().map(history=>{
            if(history.signature){
              if(history.signature !== "null"){
                history.signature = JSON.parse(history.signature)
              }
            }

            empIDs.push(history.emp_id)
            return history
          }).filter(h=>h.is_done || h.status_type === "END");

        }

        if(r.data.votingPeople){
          this.votingPeople = r.data.votingPeople.map(vp=>{
            if(vp.SIGNATURE_IMAGE){
              if(vp.SIGNATURE_IMAGE !== "null"){
                vp.SIGNATURE_IMAGE = JSON.parse(vp.SIGNATURE_IMAGE)
              }
            }

            empIDs.push(vp.emp_id)
            return vp
          });
        }


        try {
          const {view_emp} = await getEmployeesByIDS(empIDs.join(","));

          this.employees = view_emp;

        } catch (error) {
          return null;
        }
        this.addSignatures(obj);



      } catch (error) {
        console.error(error);

      }
    }
  },
  beforeMount() {
    this.updateDocumentEditorSize();
    window.addEventListener('resize', this.updateDocumentEditorSize);
  },
  mounted() {

    this.$nextTick(() => {

      var obj = this.$refs.doceditcontainer.ej2Instances.documentEditor;
      this.$refs.doceditcontainer.ej2Instances.documentEditorSettings.showRuler = false;


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
</style>
