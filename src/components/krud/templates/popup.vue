<template>
    <div class="card drawer-wrappper">
        <common :parent="parent" :title="title" :addAction="openSide" :permissions="permissions" ></common>
        <portal to="header-right" >
            <Krudtools :search="search"
                       :refresh="refresh"
                       :exportExcel="exportExcel"
                       :exportLoading="exportLoading"
                       :print="print"
                       :save="save"
                       :isPrint="isPrint"
                       :isExcel="isExcel"
                       :isExcelUpload="isExcelUpload"
                       :excelUploadCustomUrl="excelUploadCustomUrl"
                       :excelUploadMethod="excelUploadMethod"
                       :isRefresh="isRefresh"
                       :isSave="isSave"
                       :isSearch="false"
            />
        </portal>
        <section class="offcanvas-template">
            <div class="crud-page">
                <div class="crud-page-body">
                    <div id="drawer-container">
                        <div :class="openSlidePanel ? 'dg-flex open-drawer' : 'dg-flex'">
                            <datagrid v-if="permissions ? permissions.r : false" ref="grid"
                                      :url="url"
                                      :schemaID="grid"
                                      :paginate="50"
                                      :fnClone="clone"
                                      :fnEdit="edit"
                                      :fnQuickEdit="quickEdit"
                                      :fnView="view"
                                      :actions="$props.actions"
                                      :dblClick="$props.dbClickAction"
                                      :onRowSelect="$props.onRowSelect"
                                      :permissions="permissions"
                                      :page_id="page_id"
                                      :custom_condition="$props.custom_condition? $props.custom_condition :null"
                                      :user_condition="user_condition ? user_condition.gridCondition : null"
                                      :changeKrudTool="changeKrudTool"
                            >
                            </datagrid>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <a-modal
            v-model:open="openSlidePanel"
            class="create"
            :maskClosable="false"
            :title="title"
            :forceRender="true"
            :width="this.form_width"
            :footer="null"
            placement="right"
        >
            <dataform
                ref="form"
                :hideTitle="true"
                :schemaID="form"
                :title="title"
                :url="url"
                :editMode="editMode"
                :onSuccess="onSuccess"
                :onReady="onReady"
                :do_render="openSlidePanel"
                :permissions="permissions"
                :page_id="page_id"
                :user_condition="user_condition ? user_condition.formCondition : null"
                :onError="onError"
                :close="hideSide"
            >
            </dataform>

        </a-modal>
    </div>
</template>
<script>

import common from '../components/common'
import Krudtools from '../components/krudtools'
import mixins from './mixin'
import { Modal } from 'ant-design-vue'
export default {
    inheritAttrs: false,
    name: 'Canvas',
    mixins: [mixins],
    data () {
        return {
            form_width: 800,
            openSlidePanel: false,
            exportLoading: false,
        }
    },
    components: {
        common,
        Krudtools,
        "a-modal": Modal,
    },
    methods: {
        hideSide () {
            this.openSlidePanel = false;
            this.editMode = false;

        },
        openSide () {
            this.openSlidePanel = true
            // let unit = (window.innerWidth - 300) / 100
            // let w = parseInt(unit * 40)
            // this.$refs.panel.style.width = w + 'px'
            // this.$refs.panel.style.flex = `0 0 ${w + 'px'}`
        },

        templateEdit () {
            this.openSide()
        },
        templateOnSuccess () {
            this.hideSide()
        },
    },
    mounted () {

    },
}
</script>
