import { resolve } from "path";
import { defineNuxtConfig } from "nuxt/config";
// import { viteThemePlugin } from 'vite-plugin-theme';
// import { getThemeColors } from './src/utils/themeUtil'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer'
const pathResolve = (pathStr: string) => {
  return resolve(__dirname, pathStr);
};

let nuxtAlies = {};
let viteAlies = [
  {
    find: "@",
    replacement: pathResolve("src") + "/",
  },
  {
    find: "vue-i18n",
    replacement: "vue-i18n/dist/vue-i18n.cjs.js",
  },
];
if (
  process.env.LAMBDA_ROOT !== "@lambda-platform/lambda-vue" &&
  process.env.LAMBDA_ROOT != ""
) {
  nuxtAlies["@lambda-platform/lambda-vue"] = resolve(
    __dirname,
    process.env.LAMBDA_ROOT
  );

  viteAlies.push({
    find: "@lambda-platform/lambda-vue",
    replacement: pathResolve(process.env.LAMBDA_ROOT) + "/",
  });
}
export default defineNuxtConfig({
  alias: nuxtAlies,
  srcDir: "src/",
  modules: ["@stefanobartoletti/nuxt-social-share", "nuxt-vue3-google-signin"],
  googleSignIn: {
    clientId: '265025740518-vse4f2j2nd8h47c4kf7hb0mj91j873cu.apps.googleusercontent.com',
  },
  socialShare: {},
  app: {
    buildAssetsDir: "amjilt_erp/",
    head: {
      meta: [
        { name: "charset", content: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        {
          name: "description",
          content:
            "АМЖИЛТ систем нь БАЙГУУЛЛАГЫН үйл ажиллагааг цогцоор нь Удирдаж хянах Cloud суурьтай багц систем юм.",
        },
        { name: "og:url", content: "/amjilthome/logos/mcpc-s.svg" },
        { name: "og:type", content: "article" },
        { name: "og:title", content: "Amjilt.com" },
        {
          name: "og:description",
          content:
            "АМЖИЛТ систем нь БАЙГУУЛЛАГЫН үйл ажиллагааг цогцоор нь Удирдаж хянах Cloud суурьтай багц систем юм.",
        },
        {
          name: "og:image",
          content: "https://amjilt.com/amjilthome/images/amjilt-cover.jpg",
        },

        { name: "twitter:title", content: "Amjilt.com" },
        { name: "fb:app_id", content: "912095810649755" },
        {
          name: "twitter:description",
          content:
            "АМЖИЛТ систем нь БАЙГУУЛЛАГЫН үйл ажиллагааг цогцоор нь Удирдаж хянах Cloud суурьтай багц систем юм.",
        },
        {
          name: "twitter:image",
          content: "https://amjilt.com/amjilthome/images/amjilt-cover.jpg",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "" },
      ],
      script: [
        // { src: '' },
      ],
      link: [
        { rel: "icon", href: "/amjilthome/logos/mcpc-s.svg" },
        {
          rel: "stylesheet",
          href: "/assets/lambda/fonts/flaticons/flaticons.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/lambda/fonts/themify/themify-icons.css",
        },
        { rel: 'stylesheet', href: '/assets/dms/material.css' },
      ],
    },
  },
  dir: {
    public: resolve(__dirname, "./public/"),
  },

  css: [
    "~/assets/styles/components/loading.css",
    "leaflet-draw/dist/leaflet.draw.css",
    "@lambda-platform/lambda-vue/src/modules/chart/scss/chart.scss",
    "@lambda-platform/lambda-vue/src/modules/datagrid/scss/style.scss",
    "@lambda-platform/lambda-vue/src/modules/dataform/scss/style.scss",
    "@lambda-platform/lambda-vue/src/modules/dataform/scss/_dataform_dark.scss",
    "@lambda-platform/lambda-vue/src/modules/datagrid/scss/theme/_light.scss",
    "@lambda-platform/lambda-vue/src/modules/datagrid/scss/theme/_material.scss",
    "@lambda-platform/lambda-vue/src/modules/datagrid/scss/theme/_balham.scss",
    "@lambda-platform/lambda-vue/src/modules/datagrid/scss/theme/_dark.scss",
    "@lambda-platform/lambda-vue/src/modules/krud/scss/style.scss",
    "@/assets/styles/tailwind.css",
    "@clientio/rappid/rappid.css",
  ],
  vite: {
    envPrefix: "LAMBDA_",

    plugins: [
      // splitVendorChunkPlugin(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),

      //
      // viteThemePlugin({
      //   colorVariables: [...getThemeColors()],
      // }),
      // Components({
      //   resolvers: [
      //     AntDesignVueResolver(),
      //   ],
      //
      // }),
    ],
    resolve: {
      alias: viteAlies,
      dedupe: ["vue"],
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: {
          //   'primary-color': process.env.LAMBDA_PRIMARY_COLOR,
          //   'primary-color-dark-theme': process.env.LAMBDA_PRIMARY_COLOR },
          javascriptEnabled: true,
        },
        // scss: {
        //   modifyVars: { 'primary-color': process.env.LAMBDA_PRIMARY_COLOR, 'primary-color-dark-theme': process.env.LAMBDA_PRIMARY_COLOR },
        //   additionalData: `
        //   $primary-color: ${process.env.LAMBDA_PRIMARY_COLOR};
        //   $ag-primary-color: ${process.env.LAMBDA_PRIMARY_COLOR};
        //   `,
        // },
      },
    },
    define: {
      "process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE": "1000000",
      "process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS": "1000000",
      __COLOR_PLUGIN_OUTPUT_FILE_NAME__: undefined,
      __PROD__: true,
      __COLOR_PLUGIN_OPTIONS__: {},
    },
    assetsInclude: ['**/*.lottie'],
    build: {
      sourcemap: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        plugins: [
          visualizer({
            filename: 'bundle-report.html',
            open: false
          }),
        ],
        output: {
          manualChunks(id) {
            if (id.includes('ag-grid-community')) {
              return 'ag-grid-community'
            }
            if (id.includes('ag-grid-enterprise')) {
              return 'ag-grid-enterprise'
            }
            if (id.includes('@syncfusion')) {
              return 'syncfusion'
            }
            if (id.includes('@clientio/rappid')) {
              return '@clientio/rappid'
            }
            if (id.includes('lodash')) {
              return 'lodash'
            }
            if (id.includes('swiper')) {
              return 'swiper'
            }
            if (id.includes('moment')) {
              return 'moment'
            }
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('ant-design-vue')) {
              return 'ant-design-vue'
            }
            if (id.includes('@lottiefiles/dotlottie-web')) {
              return '@lottiefiles/dotlottie-web'
            }
            // Add other libraries here if needed
          },
        },
      },
    },
    server: {
      fs: {
        allow: [pathResolve(process.env.LAMBDA_ROOT) + "/"],
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  generate: {
    routes: ["/"],
  },
  ssr: false,
});
