<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
      <NuxtLink to="/" class="text-sm text-yellow-400 hover:underline flex items-center mb-6">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
         Pagina principal
      </NuxtLink>

      <h2 class="text-2xl font-semibold mb-1 text-center">Bem vindo de volta</h2>
      <p class="text-gray-400 text-center mb-6 text-sm">Entre na sua conta</p>

      <!-- Toggle buttons -->
      <div class="flex mb-4 bg-gray-800 rounded-md overflow-hidden">
        <button
          :class="[
            'w-1/2 py-2 flex items-center justify-center gap-2 font-medium transition',
            loginType === 'client'
              ? 'bg-black text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          ]"
          @click="loginType = 'client'"
        >
          <Icon name="lucide:user" class="w-4 h-4" />
          Cliente
        </button>
        <button
          :class="[
            'w-1/2 py-2 flex items-center justify-center gap-2 font-medium transition',
            loginType === 'barbershop'
              ? 'bg-black text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          ]"
          @click="loginType = 'barbershop'"
        >
          <Icon name="lucide:scissors" class="w-4 h-4" />
          Barbearia
        </button>
      </div>

      <!-- Login form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="text-sm block mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Digite seu email"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>
        <div>
          <label for="password" class="text-sm block mb-1">Senha</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Digite sua senha"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-black font-semibold rounded-md transition"
        >
          {{ loading ? 'Logging in...' : `Entrar como um ${capitalize(loginType)}` }}
        </button>

        <p class="text-center text-sm text-gray-400 mt-4">
         Não tem uma conta?
          <NuxtLink to="/signup" class="text-yellow-400 hover:underline">Criar</NuxtLink>
        </p>

        <p class="text-center text-sm mt-1">
          <NuxtLink to="/forgot-password" class="text-gray-400 hover:underline">Esqueceu sua senha?</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loginType = ref('cliente')
const email = ref('')
const password = ref('')
const loading = ref(false)

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const handleLogin = async () => {
  loading.value = true
  
  // replace with actual API logic
    
    try {
     const token = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        })
      })
      
      const data = await token.json()
      console.log(data)

    } catch (error) {
      console.error('Login failed:', error)
      alert('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      loading.value = false
    }


  loading.value = false
}
</script>
