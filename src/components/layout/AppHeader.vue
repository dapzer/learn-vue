<script lang="ts" setup>

import UiTypography from "@/components/ui/UiTypography.vue"
import UiContainer from "@/components/ui/UiContainer.vue"
import { RouterLink } from "vue-router"

const routes = [
  {
    url: "/",
    label: "ToDo"
  },
  {
    url: "/chat",
    label: "Chat"
  },
]
</script>

<template>
  <header>
    <UiContainer class="body">
      <UiTypography
        :as="RouterLink"
        class="logo"
        to="/"
        variant="link"
      >
        Vue App
      </UiTypography>

      <nav class="links">
        <UiTypography
          v-for="(link, index) in routes"
          :key="index"
          :as="RouterLink"
          :to="link.url"
          variant="link"
        >
          {{ link.label }}
        </UiTypography>
      </nav>
    </UiContainer>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--c-accent);
}

.logo {
  font-size: var(--fs-logo);

  &:hover {
    color: var(--c-secondary);
  }
}

.body {
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.links {
  display: flex;
  align-items: center;
  gap: 16px;
}

</style>
