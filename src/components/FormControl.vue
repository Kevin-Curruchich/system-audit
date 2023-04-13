<template>
  <div class="form-group">
    <div class="label">
      <label class="form-control-label">
        <slot name="control-label"></slot>
      </label>
    </div>
    <div class="has-label">
      <slot name="control-input"> </slot>
    </div>
    <div class="helpBlock">
      <slot name="control-help-block"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-select {
  width: 100%;
}
</style>
