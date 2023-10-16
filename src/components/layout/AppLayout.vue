<script lang="ts" setup>
import AppHeader from "@/components/layout/AppHeader.vue"
</script>

<template>
  <div :class="$style.layout">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

main {
  padding: calc(var(--s-header-height) + 16px) 0;
  flex: 1 1 auto;

  @media screen and (max-width: var(--bp-md)) {
    min-height: 100vh;
  }
}
</style>
