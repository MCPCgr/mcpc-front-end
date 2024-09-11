<template>
  <div>
    <div class="flex items-center space-x-3 mb-6">
      <div class="dashboard_datepicker">
        <a-space direction="vertical" :size="12">
          <a-range-picker v-model:value="value4" :format="dateFormat" />
        </a-space>
      </div>
      <div>
        <a-select
          v-model:value="value"
          show-search
          placeholder="Select a person"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        ></a-select>
      </div>
      <div class="">
        <a-button class="" type="primary" style="border-radius: 96px; padding: 8px;">
          <img class="w-3.5 h-3.5" src="/amjilt-erp/icon/search.svg"/>
        </a-button>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mb-8">
      <div class="col-span-12 lg:col-span-3 space-y-4">
        <!-- Нийт ажилтан -->
        <div class="rounded-lg p-4 dashboard_shadow bg-white">
          <div class="flex items-center justify-between pb-2">
            <div class="text-[13px] font-semibold text-second_color">Нийт ажилтан</div>
            <div class="bg-blue-400 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/user.svg"/>
            </div>
          </div>
          <div class="flex items-center justify-center pt-2 pb-6">
            <div class="text-xl font-bold text-second_color text-center">32</div>
          </div>
        </div>
        <!-- Ирсэн -->
        <div class="rounded-lg p-4 dashboard_shadow bg-white">
          <div class="flex items-center justify-between pb-2">
            <div class="text-[13px] font-semibold text-second_color">Ирсэн</div>
            <div class="bg-green-500 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/user.svg"/>
            </div>
          </div>
          <div class="flex items-center justify-center pt-2 pb-6">
            <div class="text-xl font-bold text-second_color text-center">32</div>
          </div>
        </div>
        <!-- Хоцорсон -->
        <div class="rounded-lg p-4 dashboard_shadow bg-white">
          <div class="flex items-center justify-between pb-2">
            <div class="text-[13px] font-semibold text-second_color">Хоцорсон</div>
            <div class="bg-primary_color p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/user.svg"/>
            </div>
          </div>
          <div class="flex items-center justify-center pt-2 pb-6">
            <div class="text-xl font-bold text-second_color text-center">32</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-9">
        <div class="bg-white rounded-xl p-4 dashboard_shadow h-full">
          <div class="text-base font-semibold text-second_color">Ирцийн бүртгэл</div>
        </div>
      </div>
    </div>


    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <!-- Чөлөөтэй -->
      <div class="bg-white rounded-xl dashboard_shadow py-4">
        <div class="flex items-center justify-center space-x-2 border-b pb-4 mb-4">
          <img class="w-4 h-4" src="/amjilt-erp/icon/clock.svg"/>
          <div class="text-sm text-second_color text-center">Чөлөөтэй</div>
        </div>
        <div class="px-4">
          <div class="overflow-x-auto w-full">
            <table class="table-auto">
              <thead class="">
              <tr class="w-full border-b flex items-start" style="background-color: #FAFAF9;">
                <th class="w-12 text-center py-3">
                  <span class="text-xs font-medium text-second_color">№</span>
                </th>
                <th class="w-40 py-3 text-left">
                  <span class="text-xs font-medium text-second_color ">Овог</span>
                </th>
                <th class="w-44 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Нэр</span>
                </th>
                <th class="w-36 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Эхлэсэн</span>
                </th>
                <th class="w-36 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Дуусах</span>
                </th>
                <th class="w-40 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Баталсан ажилтан</span>
                </th>
              </tr>
              </thead>
              <tbody class="">
              <tr class="w-full border-b border-b flex items-start">
                <th class="w-12 text-center py-3">
                  <p class="text-xs text-second_color leading-4 text-center m-0">1</p>
                </th>
                <td class="w-40 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">САРУУЛТУЯАСАРУУ</p>
                </td>
                <td class="w-44 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">САРУУЛТУЯА</p>
                </td>
                <td class="w-36 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">2023-05-12</p>
                </td>
                <td class="w-36 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">2023-05-21</p>
                </td>
                <td class="w-40 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">САРУУЛТУЯА</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Ээлжийн амралт -->
      <div class="bg-white rounded-xl dashboard_shadow py-4">
        <div class="flex items-center justify-center space-x-2 border-b pb-4 mb-4">
          <img class="w-4 h-4" src="/amjilt-erp/icon/clock.svg"/>
          <div class="text-sm text-second_color text-center">Ээлжийн амралт</div>
        </div>
        <div class="px-4">
          <div class="overflow-x-auto w-full">
            <table class="table-auto">
              <thead class="">
              <tr class="w-full border-b flex items-start" style="background-color: #FAFAF9;">
                <th class="w-12 text-center py-3">
                  <span class="text-xs font-medium text-second_color">№</span>
                </th>
                <th class="w-40 py-3 text-left">
                  <span class="text-xs font-medium text-second_color ">Овог</span>
                </th>
                <th class="w-44 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Нэр</span>
                </th>
                <th class="w-36 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Эхлэсэн</span>
                </th>
                <th class="w-36 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Дуусах</span>
                </th>
                <th class="w-40 py-3 text-left">
                  <span class="text-xs font-medium text-second_color">Баталсан ажилтан</span>
                </th>
              </tr>
              </thead>
              <tbody class="">
              <tr class="w-full border-b border-b flex items-start">
                <th class="w-12 text-center py-3">
                  <p class="text-xs text-second_color leading-4 text-center m-0">1</p>
                </th>
                <td class="w-40 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">САРУУЛТУЯАСАРУУ</p>
                </td>
                <td class="w-44 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">САРУУЛТУЯА</p>
                </td>
                <td class="w-36 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">2023-05-12</p>
                </td>
                <td class="w-36 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">2023-05-21</p>
                </td>
                <td class="w-40 py-3">
                  <p class="text-xs text-second_color leading-4 m-0">САРУУЛТУЯА</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchOutlined from "@ant-design/icons-vue";

export default {
  name: "attendance",
  components: {
    SearchOutlined,
  },
}
</script>

<style scoped>

</style>
