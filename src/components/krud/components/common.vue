<template>
    <portal to="header-left">
        <div class="flex">
          <div class="page-title ">
            <div class="float-left pt-3">
              <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">{{ title }}</h1>
              <h2 class="text-gray-400 text-xs m-0">
                        <span v-for="(p, index) in parent" :key="p.index">
                            <span v-if="index >= 1"> / </span>{{ p.title }}
                        </span>
              </h2>
            </div>
          </div>
          <div class=" ml-3 " v-if="!hideAction && permissions.c">
            <span class="divider"></span>
            <a-button type="primary" @click="addAction" shape="round">
              <template #icon>
                        <span class="anticon align-top ant-btn-svg-icon" style="vertical-align: top">
                            <inline-svg
                              src="/assets/icons/duotune/general/gen041.svg"
                            />
                        </span>
              </template>
              {{ lang._add }}
            </a-button>
          </div>
          <portal-target name="grid-left">
          </portal-target>

          <div class=" ml-3 " v-if="canGenerateSalary">
            <span class="divider"></span>
            <a-button type="primary" shape="round" @click="showSalaryGenerate">
              <template #icon>
                        <span class="anticon align-top ant-btn-svg-icon" style="vertical-align: top">
                            <inline-svg
                              src="/assets/icons/duotone/Shopping/Money.svg"
                            />
                        </span>
              </template>
              Цалин үүсгэх
            </a-button>
          </div>
        </div>

    </portal>
    <portal to="mobile-page-title">
        <div class="page-title mb-3">
            <div>
                <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">{{ title }}</h1>
                <h2 class="text-gray-400 text-xs m-0">
                         <span v-for="(p, index) in parent" :key="p.index">
                            <span v-if="index >= 1"> / </span>{{ p.title }}
                        </span>
                </h2>
            </div>
        </div>
    </portal>
    <portal to="header-mobile" v-if="!hideAction && permissions.c">
        <div class="fixed bottom-14 right-2">
            <a-button type="primary" @click="addAction" shape="circle" size="large">
                <template #icon>
                      <span class="settings-btn ant-btn-svg-icon">
                        <inline-svg
                            src="/assets/icons/duotune/general/gen041.svg"
                        />
                      </span>
                </template>
            </a-button>
        </div>
    </portal>
</template>

<script>

export default {
    name: 'common',
    emits: ['showSalaryGenerate'],
    props:["parent", "addAction", "title", "hideAction", "permissions", "canGenerateSalary", "user_condition"],
    computed:{
        lang() {
            const labels = [
                '_add',
                'Information_viewing_history','excelUpload'
            ];
            return labels.reduce((obj, key, i) => {
                obj[key] = this.$t('crud.' + labels[i]);
                return obj;
            }, {});
        },

    },
    methods:{
      showSalaryGenerate(){
        this.$emit("showSalaryGenerate")
      },
    },
}
</script>
