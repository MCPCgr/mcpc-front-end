<template>
  <div>
    <label>{{ label }}</label>
    <div class="role-config">
      <a-button @click="createCEOPermission">
        <template #icon>
            <span class="svg-icon">
              <inline-svg src="/assets/icons/duotune/communication/com006.svg"/>
            </span>
        </template>
       <span style="margin-right: 8px"></span>Удирдлагын эрх олгох
      </a-button>
      <span style="margin-right: 8px"></span>
      <a-button @click="createStandardEmployeePermission">
        <template #icon>
            <span class="svg-icon ">
              <inline-svg src="/assets/icons/duotone/Communication/Group.svg"/>
            </span>
        </template>
        <span style="margin-right: 8px"></span>Ажилтны эрх олгох
      </a-button>

      <div id="menu-tree" v-if="employeePermissions">
        <ul class="menuTree listsClass">
          <permissionItem
            v-for="(menu_item, index) in menu"
            :key="index"
            :data="menu_item"
            :menuIndex="[index]"
            :cruds="kruds"
            :permissions="employeePermissions.permissions" @change="changePermission">
          </permissionItem>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';
import {COMPANY} from '~/store/mutation-types-tatatonga';

import ls from "~/utils/Storage";

import permissionItem from "./permissionItem"
import {
  KRUDS,
  MENU,
  MENU_LIST,
  PERMISSIONS,
  COMPANY_MAX_PERMISSIONS,
  EMPLOYEE_STANDARD_PERMISSIONS
} from "~/store/mutation-types";
import {getItemPath, getTitle} from "~/utils/menu"
import { cloneDeep } from 'lodash';
export default {
  mixins: [mixin],
  components: {
    permissionItem
  },
  data() {
    const company = ls.get(COMPANY);
    const kruds = ls.get(KRUDS)
    const permissions = ls.get(PERMISSIONS)
    const maxPermissions = ls.get(COMPANY_MAX_PERMISSIONS)
    const employeeStandardPermissions = ls.get(EMPLOYEE_STANDARD_PERMISSIONS)
    const menu = ls.get(MENU)
    const menu_list = ls.get(MENU_LIST)
    return {
      company,
      permissions,
      maxPermissions,
      employeeStandardPermissions,
      employeePermissions: null,
      menu_list,
      menu,
      kruds
    }
  },
  mounted() {
    this.createPermission();
  },
  methods: {
    createCEOPermission(){
      this.employeePermissions = null;
      this.employeePermissions = cloneDeep(this.maxPermissions)
      this.model.form[this.model.component] = JSON.stringify(this.employeePermissions)
    },
    createStandardEmployeePermission(){
      this.employeePermissions = null;

      this.employeePermissions = cloneDeep(this.employeeStandardPermissions)
      this.model.form[this.model.component] = JSON.stringify(this.employeePermissions)
    },
    changePermission() {
      this.model.form[this.model.component] = JSON.stringify(this.employeePermissions)
    },
    createPermission() {

      let permission = {}
      if (this.model.form[this.model.component]) {
        permission = this.getPermissions(JSON.parse(this.model.form[this.model.component])["permissions"], this.menu, false)
      } else {
        permission = this.getPermissions(JSON.parse(JSON.stringify(this.permissions))["permissions"], this.menu, true);
      }

      this.employeePermissions = {
        menu_id: this.permissions.id,
        default_menu: this.permissions.default_menu,
        permissions: permission,
        extra: this.permissions.extra
      }

    },
    getPermissions(permissions, menuItems, isNew) {
      let new_permissions = {};
      menuItems.map(menu => {
        if (permissions.hasOwnProperty(menu.id)) {

          if (isNew) {
            if (menu.link_to === 'crud') {
              new_permissions[menu.id] = {
                ...permissions[menu.id],
                cPossible:this.maxPermissions["permissions"][menu.id].c,
                rPossible:this.maxPermissions["permissions"][menu.id].r,
                uPossible:this.maxPermissions["permissions"][menu.id].u,
                dPossible:this.maxPermissions["permissions"][menu.id].d,
                c: false,
                r: false,
                u: false,
                d: false,
                show: false,
              }
            } else {
              new_permissions[menu.id] = {...permissions[menu.id], show: false, permissions,

                cPossible:this.maxPermissions["permissions"][menu.id].c,
                rPossible:this.maxPermissions["permissions"][menu.id].r,
                uPossible:this.maxPermissions["permissions"][menu.id].u,
                dPossible:this.maxPermissions["permissions"][menu.id].d,
              }
            }
          } else {
            new_permissions[menu.id] = {...permissions[menu.id],
              cPossible:this.maxPermissions["permissions"][menu.id].c,
              rPossible:this.maxPermissions["permissions"][menu.id].r,
              uPossible:this.maxPermissions["permissions"][menu.id].u,
              dPossible:this.maxPermissions["permissions"][menu.id].d,
            }
          }

        } else {
          if (menu.link_to === 'crud') {
            new_permissions[menu.id] = {
              menu_id: menu.id,
              cPossible:this.maxPermissions["permissions"][menu.id].c,
              rPossible:this.maxPermissions["permissions"][menu.id].r,
              uPossible:this.maxPermissions["permissions"][menu.id].u,
              dPossible:this.maxPermissions["permissions"][menu.id].d,
              c: false,
              r: false,
              u: false,
              d: false,
              show: false,
              title: getTitle(menu, this.kruds),
              gridEditConditionSQL: "",
              gridDeleteConditionSQL: "",
              gridDeleteConditionJS: "",
              gridEditConditionJS: "",
            }
          } else {
            if(this.maxPermissions["permissions"][menu.id]){
              new_permissions[menu.id] = {
                menu_id: menu.id,
                show: false,
                title: getTitle(menu, this.kruds),
                cPossible:this.maxPermissions["permissions"][menu.id].c,
                rPossible:this.maxPermissions["permissions"][menu.id].r,
                uPossible:this.maxPermissions["permissions"][menu.id].u,
                dPossible:this.maxPermissions["permissions"][menu.id].d,
              }
            }

          }
        }

        if (menu.children.length >= 1) {
          let child_permistions = this.getPermissions(permissions, menu.children, isNew);
          new_permissions = {...new_permissions, ...child_permistions}
        }
      });

      return new_permissions;
    },
  },

  watch: {
    itemValue(value, oldValue) {
      if ((oldValue && !value) || (value && !oldValue)) {
        if (value) {
          this.createPermission()
        } else {
          this.employeePermissions = null;
        }
      }
    }
  },

}
</script>

<style scoped>

</style>
