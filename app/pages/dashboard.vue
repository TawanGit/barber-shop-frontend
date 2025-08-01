<script setup>
import BarberShops from '~/components/dashboard/BarberShops.vue';

definePageMeta({
  middleware: 'auth'
})

const { data, error } = await useAsyncData('barber-shops', () =>
  $fetch('http://localhost:8080/api/v1/barber-shops')
);

console.log(data.value) 
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12  text-white p-4">
    <div>
      <input type="text" placeholder="Procurar barbearias..." class="w-full p-2 mb-4 rounded bg-gray-800 text-white" />
      <div>
        <BarberShops :data="data"/>
      </div>
    </div>
  </div>
</template>
