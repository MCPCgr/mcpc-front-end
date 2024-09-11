<template>
  <div>
    <div class="mx-auto max-w-screen-xl">
      <div class="mx-auto max-w-screen-lg text-center mb-4">
        <h2 class="mb-4 text-2xl tracking-tight font-bold text-black_color dark:text-white">Та өөртөө тохирох багцаа сонгоно уу</h2>
        <p class="mb-2 font-light text-gray-500 dark:text-gray-400">Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм.
          Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн.</p>
      </div>
    </div>
    <div class="mx-auto w-[90%] my-[50px]">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(packageOption, index) in packageOptions" :key="index" class="transform hover:scale-105 transition-transform duration-300 px-2">
          <div class="w-full py-2">
            <p class="text-center font-bold text-xl">{{ packageOption.name }}</p>
          </div>
          <div class="bg-white border border-[1px] rounded-2xl mb-4 pb-4">
            <div :class="['w-full py-3 mb-[10px] rounded-t-lg text-white', packageOption.bgColor]">
              <div class="w-full my-[15px]">
                <p class="text-center text-lg">
                  <span class="text-2xl font-semibold">{{ packageOption.price }}</span>
                  <span v-if="packageOption.price !== 'Free'"> / 1 сар</span>
                </p>
              </div>
              <div class="w-full">
                <p class="text-center font-semibold">{{ packageOption.storage }}</p>
              </div>
            </div>
            <div class="px-4 mb-[15px]">
              <ul class="leading-5 font-semibold" style="line-height:220%">
                <li class="text-center text-gray-400 mb-[10px]">{{ packageOption.people }}</li>
                <li v-for="(feature, fIndex) in packageOption.features" :key="fIndex" class="flex items-center">
                  <CheckCircleOutlined v-if="feature.enabled" :style="{marginRight: '8px', fontSize: '20px', color: packageOption.iconColor}" />
                  <MinusCircleOutlined v-else :style="{marginRight: '8px', fontSize: '20px', color: 'gray'}" />
                  <span :class="{'text-gray-400 font-normal': !feature.enabled}">{{ feature.name }}</span>
                </li>
              </ul>
            </div>
            <div class="px-4">
              <a-button :class="[packageOption.buttonColor, 'w-full text-white rounded-full']" style="height: 60px !important; font-size: 16px" @click="selectPackage(packageOption)">
                Багц сонгох
              </a-button>
            </div>
            <div class="px-4 mt-[15px]" v-if="packageOption.extras">
              <ul style="line-height:220%">
                <li v-for="(extra, eIndex) in packageOption.extras" :key="eIndex" class="flex items-center">
                  <PlusCircleOutlined :style="{marginRight: '8px', color: packageOption.iconColor}" /> {{ extra }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';
import { defineEmits } from 'vue';

const emits = defineEmits(['packageSelected']);
const selectPackage = (packageOption) => {
  emits('packageSelected', packageOption);
};
const packageOptions = [
  {
    id:'f1f5d0e5-28d5-4800-801c-5e042961c4b5',
    name: 'Free',
    price: 'Free',
    storage: '1GB',
    people: '5 хүн',
    bgColor: 'bg-purple-500',
    iconColor: '#A855F7',
    buttonColor: 'bg-purple-500',
    features: [
      { name: 'Хяналтын самбар', enabled: true },
      { name: 'Охин компани, салбарууд', enabled: true },
      { name: 'Хүний нөөц', enabled: true },
      { name: 'Вэбсайт', enabled: true },
      { name: 'Цаг бүртгэл', enabled: true },
      { name: 'Санхүү', enabled: true },
      { name: 'Борлуулалт', enabled: true },
      { name: 'Худалдан авалт', enabled: true },
      { name: 'Бараа, Бүтээгдэхүүн', enabled: true },
      { name: 'Харилцагч', enabled: true },
      { name: 'Нярав', enabled: true },
      { name: 'Төлөвлөлт', enabled: true },
      { name: 'Booking', enabled: true },
      { name: 'POS', enabled: true },
      { name: 'Shop', enabled: true },
      { name: 'Chat', enabled: true },
      { name: 'Courses', enabled: false },
      { name: 'Document', enabled: false },
      { name: 'Learning management system', enabled: false },
      { name: 'School management system', enabled: false },
      { name: 'Student information system', enabled: false },
    ],
  },
  {
    id: 'd0c3d637-18f8-4015-acf8-d7ec5d217f11',
    name: 'Basic',
    price: '100,000₮',
    storage: '10GB',
    people: '10 хүн',
    bgColor: 'bg-green-500',
    iconColor: '#22C55E',
    buttonColor: 'bg-green-500',
    features: [
      { name: 'Хяналтын самбар', enabled: true },
      { name: 'Охин компани, салбарууд', enabled: true },
      { name: 'Хүний нөөц', enabled: true },
      { name: 'Вэбсайт', enabled: true },
      { name: 'Цаг бүртгэл', enabled: true },
      { name: 'Санхүү', enabled: true },
      { name: 'Борлуулалт', enabled: true },
      { name: 'Худалдан авалт', enabled: true },
      { name: 'Бараа, Бүтээгдэхүүн', enabled: true },
      { name: 'Харилцагч', enabled: true },
      { name: 'Нярав', enabled: true },
      { name: 'Төлөвлөлт', enabled: true },
      { name: 'Booking', enabled: true },
      { name: 'POS', enabled: true },
      { name: 'Shop', enabled: true },
      { name: 'Chat', enabled: true },
      { name: 'Courses', enabled: true },
      { name: 'Document', enabled: false },
      { name: 'Learning management system', enabled: false },
      { name: 'School management system', enabled: false },
      { name: 'Student information system', enabled: false },
    ],
    extras: ['Тусламж'],
  },
  {
    id:'aca60e34-4e2f-4197-94ea-beda0304d2dc',
    name: 'Standard',
    price: '200,000₮',
    storage: '100GB',
    people: '100 хүн',
    bgColor: 'bg-rose-500',
    iconColor: '#F43F5E',
    buttonColor: 'bg-rose-500',
    features: [
      { name: 'Хяналтын самбар', enabled: true },
      { name: 'Охин компани, салбарууд', enabled: true },
      { name: 'Хүний нөөц', enabled: true },
      { name: 'Вэбсайт', enabled: true },
      { name: 'Цаг бүртгэл', enabled: true },
      { name: 'Санхүү', enabled: true },
      { name: 'Борлуулалт', enabled: true },
      { name: 'Худалдан авалт', enabled: true },
      { name: 'Бараа, Бүтээгдэхүүн', enabled: true },
      { name: 'Харилцагч', enabled: true },
      { name: 'Нярав', enabled: true },
      { name: 'Төлөвлөлт', enabled: true },
      { name: 'Booking', enabled: true },
      { name: 'POS', enabled: true },
      { name: 'Shop', enabled: true },
      { name: 'Chat', enabled: true },
      { name: 'Courses', enabled: true },
      { name: 'Document', enabled: true },
      { name: 'Learning management system', enabled: false },
      { name: 'School management system', enabled: false },
      { name: 'Student information system', enabled: false },
    ],
    extras: ['Тусламж', 'Administration'],
  },
  {
    id: '43818764-cbf5-4c57-83c8-f59a1bbfa960',
    name: 'Pro',
    price: '400,000₮',
    storage: '1TB',
    people: '200 хүн',
    bgColor: 'bg-yellow-400',
    iconColor: '#FACC15',
    buttonColor: 'bg-yellow-400',
    features: [
      { name: 'Хяналтын самбар', enabled: true },
      { name: 'Охин компани, салбарууд', enabled: true },
      { name: 'Хүний нөөц', enabled: true },
      { name: 'Вэбсайт', enabled: true },
      { name: 'Цаг бүртгэл', enabled: true },
      { name: 'Санхүү', enabled: true },
      { name: 'Борлуулалт', enabled: true },
      { name: 'Худалдан авалт', enabled: true },
      { name: 'Бараа, Бүтээгдэхүүн', enabled: true },
      { name: 'Харилцагч', enabled: true },
      { name: 'Нярав', enabled: true },
      { name: 'Төлөвлөлт', enabled: true },
      { name: 'Booking', enabled: true },
      { name: 'POS', enabled: true },
      { name: 'Shop', enabled: true },
      { name: 'Chat', enabled: true },
      { name: 'Courses', enabled: true },
      { name: 'Document', enabled: true },
      { name: 'Learning management system', enabled: true },
      { name: 'School management system', enabled: true },
      { name: 'Student information system', enabled: true },
    ],
    extras: ['Тусламж', 'Administration'],
  },
];


</script>
