<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
      <NuxtLink to="/login" class="text-sm text-yellow-400 hover:underline flex items-center mb-6">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para o login
      </NuxtLink>

      <h2 class="text-2xl font-semibold mb-1 text-center">Criar Conta</h2>
      <p class="text-gray-400 text-center mb-6 text-sm">Cadastre-se para começar</p>

      <!-- Alternância entre types -->
      <div class="flex mb-4 bg-gray-800 rounded-md overflow-hidden">
        <button
          :class="[
            'w-1/2 py-2 flex items-center justify-center gap-2 font-medium transition',
            type === 'cliente'
              ? 'bg-black text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          ]"
          @click="type = 'cliente'"
        >
          <Icon name="lucide:user" class="w-4 h-4" />
          Cliente
        </button>
        <button
          :class="[
            'w-1/2 py-2 flex items-center justify-center gap-2 font-medium transition',
            type === 'barbearia'
              ? 'bg-black text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          ]"
          @click="type = 'barbearia'"
        >
          <Icon name="lucide:scissors" class="w-4 h-4" />
          Barbearia
        </button>
      </div>

      <!-- Formulário de cadastro -->
      <form @submit.prevent="criarConta" class="space-y-4">
        <div>
          <label class="text-sm block mb-1">{{ type == "cliente" ? 'Nome Completo' : 'CNPJ'}}</label>
          <input
            v-model="name"
            type="text"
            :placeholder="type === 'cliente' ? 'Digite seu nome completo' : 'Digite o CNPJ'"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>
          <div  v-if="type == 'barbearia'">
          <label class="text-sm block mb-1" >Nome da Barbearia</label>
          <input
            v-model="barberName"
            type="text"
            :placeholder="type === 'barbearia' ? 'Digite o nome da barbearia' : 'Digite seu nome completo'"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>
        <div>
          <label class="text-sm block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            :placeholder="type === 'cliente' ? 'Digite seu email' : 'Digite o email da barbearia'"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>
          <div>
          <label class="text-sm block mb-1">Telefone</label>
          <input
            v-model="cellphone"
            type="number"
            placeholder="Numero de telefone"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>
        <div>
          <label class="text-sm block mb-1">Senha</label>
          <input
            v-model="password"
            type="password"
            placeholder="Crie uma senha"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>
        <div>
          <label class="text-sm block mb-1">Confirmar senha</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Repita a senha"
            class="w-full px-4 py-3 rounded-md bg-black border border-gray-700 focus:ring-2 focus:ring-yellow-500 text-sm"
            required
          />
        </div>

        <button
          type="submit"

          :disabled="loading"
          class="w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-black font-semibold rounded-md transition"
        >
          {{ loading ? 'Criando conta...' : `Cadastrar como ${capitalize(type)}` }}
        </button>

        <p class="text-center text-sm text-gray-400 mt-4">
          Já tem uma conta?
          <NuxtLink to="/login" class="text-yellow-400 hover:underline">Entrar</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const barberName = ref('')
const confirmPassword = ref('')
const cellphone = ref('')
const type = ref('cliente')
const loading = ref(false)

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const criarConta = async () => {
  loading.value = true

  // Validação básica
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem!')
    loading.value = false
    return
  }

    if (name.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
        alert('Por favor, preencha todos os campos obrigatórios.')
        loading.value = false
        return
    }

   if (type.value === "cliente") {
  try {
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        cellphone: cellphone.value
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      alert("Erro ao criar conta: " + (errorData.message || response.statusText))
      return
    }

    const data = await response.json()
    console.log("Conta criada com sucesso:", data)
    // Você pode redirecionar o usuário ou mostrar mensagem de sucesso aqui
  } catch (error) {
    console.error("Erro na requisição:", error)
    alert("Erro ao conectar com o servidor.")
  } finally {
    loading.value = false
  }
}




  
}
</script>
