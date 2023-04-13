<template>
  <div
    v-if="showBlock"
    class="text-danger invalid-feedback"
    style="display: block"
  >
    {{ blockMessage }}
  </div>
</template>

<script>
export default {
  props: {
    showBlock: {
      type: Boolean,
      default: false,
    },
    blockMessage: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
