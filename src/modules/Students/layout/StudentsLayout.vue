<template>
  <div class="py-2 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentsList",
  mounted() {},
};
</script>

<style>
.el-select {
  width: 100%;
}
</style>
