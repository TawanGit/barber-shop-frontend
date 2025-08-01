<template>
  <NuxtLink
    :to="to"
    class="group bg-[#1c1f26] p-12 rounded-2xl border-b border-b-yellow-600 h-76 w-full md:w-96 transition-all duration-300 shadow-lg text-left border border-transparent hover:scale-105 hover:border-yellow-600"
  >
    <div class="flex items-center gap-4 mb-4 ">
      <div
        class="bg-[#2a2d34] w-12 h-12  flex  items-center justify-center rounded-full transition-colors duration-300"
      >
        <Icon
          :name="icon"
          class="text-yellow-600   w-6 h-6 transition-colors duration-300 group-hover:text-yellow-400"
        />
      </div>
      
    </div>
     <h3 class="text-2xl font-bold text-white mb-2">{{ title }}</h3>
    <p class="text-gray-400 text-sm">
      {{ description }}
    </p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  description: String,
  to: String,
})
</script>

