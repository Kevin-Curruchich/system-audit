<template>
  <label class="form-label">
    <slot name="filter-name"></slot>
  </label>
  <div class="w-100">
    <slot name="filter-select"></slot>
  </div>
</template>

<script>
export default {
  name: "MayFilter",
};
</script>

<style></style>
