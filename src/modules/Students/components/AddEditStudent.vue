<template>
  <modal scrollable :show="false" size="lg">
    <template #header> Agregar Estudiante </template>
    <template #body>
      <el-form label-position="top">
        <div class="row">
          <div class="col-md-6">
            <el-form-item label="Nombre">
              <el-input type="text" placeholder="Nombre" />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Apellido">
              <el-input type="text" placeholder="Apellido" />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </template>
    <template #footer>
      <argon-button variant="outline">Cancelar</argon-button>
      <argon-button>Agregar</argon-button>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { ArgonButton } from "@/components";

export default {
  components: {
    Modal,
    ArgonButton,
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
