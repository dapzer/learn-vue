<script setup lang="ts">

import UiContainer from "@/components/ui/UiContainer.vue"
import UiTypography from "@/components/ui/UiTypography.vue"
import { RouterLink } from "vue-router"
</script>

<template>
  <UiContainer>
    <UiTypography variant="title2">
      Страница не найдена, вернитесь на
      <UiTypography
        :as="RouterLink"
        variant="linkUnderlined"
        to="/"
        :class="$style.link"
      >
        Главную
      </UiTypography>
    </UiTypography>
  </UiContainer>
</template>

<style module lang="scss">
.link {
  font-size: 1em;
}
</style>
