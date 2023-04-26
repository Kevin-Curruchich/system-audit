<template>
  <modal scrollable :show="showModal" size="lg" :on-hide-modal="onHideModal">
    <template #header> Agregar Tipo de Estudiante </template>
    <template #body>
      <el-form
        ref="formRef"
        v-loading="sendingRequest"
        label-position="top"
        :model="formModel"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <div class="row">
          <div class="col-md-6">
            <el-form-item label="Nombre" prop="studentTypeName">
              <el-input
                v-model="formModel.studentTypeName"
                type="text"
                placeholder="Nombre"
              />
            </el-form-item>
          </div>
          <div class="col-md-12">
            <el-form-item label="Descripcion" prop="studentTypeDesc">
              <el-input
                v-model="formModel.studentTypeDesc"
                type="text"
                placeholder="Descripcion"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </template>
    <template #footer>
      <argon-button variant="outline" @click="onHideModal"
        >Cancelar</argon-button
      >
      <argon-button :loading="sendingRequest" @click="onSubmit"
        >Agregar</argon-button
      >
    </template>
  </modal>
</template>

<script>
import { onMounted, ref } from "vue";
import { ArgonButton, Modal } from "@/components";
import { useStudents } from "@/composables";
import errorMessages from "@/constants/formErrorMessages";

export default {
  components: {
    Modal,
    ArgonButton,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["hidde-modal", "accept-modal"],
  setup(_, { emit }) {
    const requiredMesage = errorMessages.required;
    //instances
    const { requestPostStudentType } = useStudents();
    //refs
    const sendingRequest = ref(false);
    const formRef = ref(null);
    const formModel = ref({
      studentTypeName: "",
      studentTypeDesc: "",
    });

    const rules = ref({
      studentTypeName: [{ required: true, message: requiredMesage }],
      studentTypeDesc: [{ required: true, message: requiredMesage }],
    });

    //methods
    const onHideModal = () => {
      formRef.value.resetFields();
      emit("hidde-modal");
    };

    const onClearData = () => {
      formRef.value.resetFields();
      sendingRequest.value = false;
    };

    const onSubmit = async () => {
      await formRef.value.validate((isValid) => {
        if (isValid) {
          sendingRequest.value = true;
          requestPostStudentType(formModel.value)
            .then(() => {
              emit("accept-modal");
              onClearData();
            })
            .catch(() => {
              sendingRequest.value = false;
            });
        }
      });
    };

    //lifecycle
    onMounted(() => {});

    return {
      formModel,
      formRef,
      onHideModal,
      onSubmit,
      rules,
      sendingRequest,
    };
  },
};
</script>

<style></style>
