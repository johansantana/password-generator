<script setup>
import { ref } from 'vue'
import { animate, newPassword, checkPasswordStrength } from '../utils'
import AppTooltip from './AppTooltip.vue'
import AppWarning from './AppWarning.vue'
import AppButton from './AppButton.vue'
import IconGithub from './icons/IconGithub.vue'
import IconCopy from './icons/IconCopy.vue'
import IconCheck from './icons/IconCheck.vue'
import IconLowercase from './icons/IconLowercase.vue'
import IconUppercase from './icons/IconUppercase.vue'
import IconNumbers from './icons/IconNumbers.vue'
import IconSymbols from './icons/IconSymbols.vue'

const MIN_LENGTH = 6
const MAX_LENGTH = 24

/*
	MAX_LENGTH / 2 + MIN_LENGTH / 2
	sets the initial value to the middle of the input range
*/
const passwordLength = ref(MAX_LENGTH / 2 + MIN_LENGTH / 2)
const password = ref(null)
const options = ref({ hasLowercase: true, hasUppercase: true, hasNumbers: true, hasSymbols: false })
const animatedPassword = ref('')

const handleGenerateNewPassword = length => {
  password.value = newPassword({ length, ...options.value })
  animate(password.value, animatedPassword)
}

const handleOptions = option => {
  const activeOptionsCount = Object.values(options.value).filter(value => value).length

  // force to have at least 1 options actived
  if (activeOptionsCount === 1 && options.value[option]) {
    warningMessage.value = 'You must have at least one option.'
    const warningTimeout = window.setTimeout(() => {
      warningMessage.value = null
      window.clearTimeout(warningTimeout)
    }, 3000)
    return
  }

  options.value[option] = !options.value[option]
}

const showTooltipMessage = ref(false)
const warningMessage = ref(null)

const handleCopy = text => {
  if (!text) {
    warningMessage.value = 'Generate a password before copying.'
    const warningTimeout = window.setTimeout(() => {
      warningMessage.value = null
      window.clearTimeout(warningTimeout)
    }, 3000)
    return
  }
  navigator.clipboard.writeText(text).then(() => {
    showTooltipMessage.value = true
    const tooltipTimeout = window.setTimeout(() => {
      showTooltipMessage.value = false
      window.clearTimeout(tooltipTimeout)
    }, 1500)
  })
}
</script>

<template>
  <div class="flex flex-col gap-10 relative">
    <Transition name="slidedown">
      <AppWarning v-if="warningMessage" :message="warningMessage" />
    </Transition>
    <!-- Generator -->
    <div class="py-10 flex flex-col">
      <!-- Title -->
      <Transition name="slideup" :duration="500" appear>
        <h1
          id="johansantana-h1"
          class="text-4xl sm:text-5xl font-sans font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-pink-500 mb-4"
        >
          Password Generator
        </h1>
      </Transition>

      <!-- Length range -->
      <Transition name="slideup" :duration="1000" appear>
        <div id="length-selector">
          <p
            class="text-sm sm:text-base text-gray-200/50 mb-2 w-fit mx-auto sm:before:content-['-'] sm:after:content-['-'] sm:after:ml-2"
          >
            Select your <span class="text-gray-200/80">Password options</span>
          </p>
          <div class="mb-6 flex gap-6 items-center">
            <input
              id="input-range"
              type="range"
              :min="MIN_LENGTH"
              :max="MAX_LENGTH"
              v-model.number="passwordLength"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none"
              title="Password length"
            />
            <span class="text-white font-bold text-2xl md:text-3xl">{{ passwordLength }}</span>
          </div>
        </div>
      </Transition>

      <!-- Options -->
      <Transition name="slideup" :duration="1500" appear>
        <div class="mb-6 flex gap-3 justify-center">
          <AppButton
            title="Add lowercase letters"
            :class="{ 'bg-white text-black': options.hasLowercase }"
            @click="handleOptions('hasLowercase')"
          >
            <IconLowercase />
          </AppButton>
          <AppButton
            title="Add uppercase letters"
            :class="{ 'bg-white text-black': options.hasUppercase }"
            @click="handleOptions('hasUppercase')"
          >
            <IconUppercase />
          </AppButton>
          <AppButton
            title="Add numbers"
            :class="{ 'bg-white text-black': options.hasNumbers }"
            @click="handleOptions('hasNumbers')"
          >
            <IconNumbers />
          </AppButton>
          <AppButton
            title="Add symbols"
            :class="{ 'bg-white text-black': options.hasSymbols }"
            @click="handleOptions('hasSymbols')"
          >
            <IconSymbols />
          </AppButton>
        </div>
      </Transition>

      <!-- Button -->
      <Transition name="slideup" :duration="2000" appear>
        <button
          id="cta-button"
          class="px-6 text-sm sm:text-lg bg-blue-700 rounded-full py-3 text-white mb-6 hover:scale-105 hover:bg-blue-600 transition outline-8 outline-offset-4"
          @click="handleGenerateNewPassword(passwordLength)"
        >
          Generate!
        </button>
      </Transition>

      <!-- Password -->
      <Transition name="slideup" :duration="2500" appear>
        <div id="johansantana-password-area" class="flex gap-3">
          <input
            type="text"
            :value="animatedPassword"
            placeholder="here goes your password..."
            readonly
            class="bg-transparent border-2 text-sm sm:text-base border-white text-white placeholder-gray-400 rounded-lg focus:outline-none block w-full p-3"
          />
          <AppButton id="johansantana-copy-button" @click="handleCopy(password)">
            <IconCopy />

            <Transition name="fade">
              <AppTooltip v-if="showTooltipMessage" message="Copied!">
                <IconCheck class="text-green-400" />
              </AppTooltip>
            </Transition>
          </AppButton>
        </div>
      </Transition>
    </div>

    <!-- Footer -->
    <Transition name="slideup" :duration="3000" appear>
      <footer
        class="py-10 text-white flex flex-col items-center gap-6 border-t-8 border-dashed border-gray-400/20"
      >
        <div class="w-fit">
          <a
            href="https://github.com/johansantana"
            class="flex text-sm sm:text-base gap-3 p-2 hover:bg-slate-50/10 rounded-full transition"
            target="_blank"
            rel="noopener"
          >
            <IconGithub />
            @johansantana
          </a>
        </div>
      </footer>
    </Transition>
  </div>
</template>

<style scoped>
@import url('../assets/styles/transitions.css');

#input-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 999%;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

#input-range:hover::-webkit-slider-thumb {
  border-radius: 999%;
  background-color: rgb(200, 200, 200);
}

#cta-button,
.btn {
  -webkit-tap-highlight-color: transparent;
}
</style>
