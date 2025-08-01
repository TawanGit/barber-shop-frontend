<template>
  <div  class="space-y-4">
    <div v-for="item in data" :key="item.id">
      <strong>{{ item.name }}</strong> — {{ item.address }}
    </div>
  </div>
</template>

<script setup>
 defineProps({
   data: {
     type: Object,
     required: true
   }
 });


</script>