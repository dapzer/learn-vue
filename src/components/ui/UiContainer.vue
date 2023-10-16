<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  max-width: calc(var(--s-container) + var(--s-indent) * 2);
  padding: 0 var(--s-indent);
  margin: 0 auto;
}
</style>
