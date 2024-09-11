<template>
  <div>
    <div id="fb-root"></div>
    <div
      class="fb-comments"
      :data-href="url"
      :data-numposts="numPosts"
      :data-width="width"
      data-colorscheme="light"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    numPosts: {
      type: Number,
      default: 10
    },
    width: {
      type: Number,
      default: 850
    }
  },
  mounted() {
    if (typeof FB !== "undefined") {
      FB.XFBML.parse();
    }
  }
};
</script>
