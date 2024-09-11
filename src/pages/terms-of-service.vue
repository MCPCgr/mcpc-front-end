<template>
  <div class="container mx-auto p-4">
    <header class="text-center my-8">
      <h1 class="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p class="text-gray-600">Amjilt ERP</p>
    </header>

    <section class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
      <p class="text-gray-600 mb-4">Welcome to Amjilt ERP! These Terms of Service ("Terms") govern your use of the Amjilt app and any related services provided by Amjilt ERP...</p>
    </section>

    <section class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Use of the Service</h2>
      <p class="text-gray-600 mb-4">Amjilt ERP grants you a limited, non-exclusive, non-transferable, revocable license to use the Amjilt app for your personal, non-commercial use...</p>
    </section>

    <section class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">User Accounts</h2>
      <p class="text-gray-600 mb-4">To access certain features of the Amjilt app, you may be required to create an account. You agree to provide accurate, current, and complete information...</p>
    </section>

    <section class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Content and Conduct</h2>
      <p class="text-gray-600">You are responsible for any content that you submit, post, or display on or through the Amjilt app. You agree not to post, upload, publish, submit, or transmit any content that...</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "terms-of-service",
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
}
</script>

<style scoped>

</style>
