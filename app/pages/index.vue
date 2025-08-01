<script setup lang="ts">
import AccessCard from '~/components/AccessCard.vue';

</script>



<template>
    <div class="max-w-7xl mx-auto px-4 py-12">
        <HeroSection />
        <AccessChoice>
           <div class="flex justify-center gap-8 flex-wrap mt-8">
              <AccessCard
                icon="bx:user-circle"
                title="Sou um cliente"
                description="Agende horários, navegue por barbearias na sua área, gerencie suas reservas e descubra o barbeiro perfeito para o seu estilo."
                to="/login"
            />
            <AccessCard
                icon="ph:scissors"
                title="Sou uma barbearia"
                description="Gerencie sua agenda, registre barbeiros, visualize reservas, acompanhe a receita e expanda seu negócio com nossas ferramentas profissionais."
                to="/manage"
            />
           </div>
        </AccessChoice>
  </div>
</template>