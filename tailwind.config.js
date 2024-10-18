module.exports = {
  mode: "jit",
  content: [
    // "./src/assets/styles/**/*.{css}",
    "./src/components/*.{vue,js}",
    "./src/components/**/*.{vue,js}",
    "./src/components/**/**/*.{vue,js}",
    "./src/components/**/**/**/*.{vue,js}",
    "./src/dataform_custom/*.{vue,js}",
    "./src/dataform_custom/**/*.{vue,js}",
    "./src/dataform_custom/**/**/*.{vue,js}",
    "./src/dataform_custom/**/**/**/*.{vue,js}",
    "../../../LAMBDA/vue3/src/modules/**/**/**/*.{vue,js}",
    "../../../LAMBDA/vue3/src/modules/**/*.{vue,js}",
    "../../../LAMBDA/vue3/src/components/**/**/**/*.{vue,js}",
    "../../../LAMBDA/vue3/src/pages/**/**/**/*.{vue,js}",

    "./plan/Common/*.{vue,js}",
    "./plan/Common/**/*.{vue,js}",
    "./plan/Common/**/**/*.{vue,js}",
    "./plan/Common/**/**/**/*.{vue,js}",

    "./plan/Gantt/*.{vue,js}",
    "./plan/Gantt/**/*.{vue,js}",
    "./plan/Gantt/**/**/*.{vue,js}",
    "./plan/Gantt/**/**/**/*.{vue,js}",
    "./plan/Kanban/*.{vue,js}",
    "./plan/Kanban/**/*.{vue,js}",
    "./plan/Kanban/**/**/*.{vue,js}",
    "./plan/Kanban/**/**/**/*.{vue,js}",

    "./node_modules/@lambda-platform/lambda-vue/src/modules/**/**/**/*.{vue,js}",
    "./node_modules/@lambda-platform/lambda-vue/src/modules/**/*.{vue,js}",
    "./node_modules/@lambda-platform/lambda-vue/src/components/**/**/**/*.{vue,js}",
    "./node_modules/@lambda-platform/lambda-vue/src/pages/**/**/**/*.{vue,js}",
    "./src/layouts/*.vue",
    "./src/pages/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/*.{vue,js,ts}",
    "./src/nuxt.config.{js,ts}",


    "./src/modules/*.{vue,js}",
    "./src/modules/**/*.{vue,js}",
    "./src/modules/**/**/*.{vue,js}",
    "./src/modules/**/**/**/*.{vue,js}",
    "./src/modules/**/**/**/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logo-light':
          "url('/amjilthome/logos/mcpc-gr-white.svg')",
        'logo-dark':
          "url('/amjilthome/logos/mcpc-gr-white.svg')",

        'icon-lms-light':
          "url('/amjilthome/icons/lms.svg')",
        'icon-lms-dark':
          "url('/amjilthome/icons/lms-white.svg')",

        'icon-sis-light':
          "url('/amjilthome/icons/Sis.svg')",
        'icon-sis-dark':
          "url('/amjilthome/icons/Sis-white.svg')",

        'icon-erp-light':
          "url('/amjilthome/icons/erp.svg')",
        'icon-erp-dark':
          "url('/amjilthome/icons/erp-white.svg')",

        'icon-pos-light':
          "url('/amjilthome/icons/pos.svg')",
        'icon-pos-dark':
          "url('/amjilthome/icons/pos-white.svg')",
      },
      boxShadow: {
        '3xl': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        '4xl': 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        '5xl': 'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
      },
      colors: {
        // 'primary-color': '#282834',
        // 'regal-gray': '#667085',
        // 'regal-purple': '#272C6E',
        // 'regal-dark-black': '#0b0d1f',
        'primary-color': '#0b4da3',
        'miat-soft': '#d0e2f8',
        'primary_color': '#0b4da3',
        'primary-color-light': '#fff5f8',
        'main_color': '#6B7280',
        'second_color': '#111827',
        'blue_second': '#2275e1',
        'blue_second_medium': '#cdecfc',
        'blue_primary_light': '#f3f4f6',
        'border_color': '#e1e5ec',
      },

      keyframes: {
        // forwarding-left-right
        propel: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(25%)" },
          "40%": { transform: "translateX(-25%)" },
          "60%": { transform: "translateX(25%)" },
          "100%": { transform: "translateX(-25%)" },
        },
      },
      animation: {
        // forwarding-arrow
        "arrow-forwarding": "propel 3s infinite",

      },
    },
  },
  darkMode: 'class',
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
};
