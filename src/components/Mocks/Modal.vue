<template>
  <modal scrollable :show="showModal" size="lg" :on-hide-modal="onHideModal">
    <template #header> Titulo </template>
    <template #body>
      <el-form
        ref="formRef"
        label-position="top"
        :model="formModel"
        :rules="rules"
        :hide-required-asterisk="true"
      >
        <div class="row"></div>
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

    //refs
    const sendingRequest = ref(false);
    const formRef = ref(null);
    const formModel = ref({
      studentName: "",
    });

    const rules = ref({
      studentName: [{ required: true, message: requiredMesage }],
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
          // sendingRequest.value = true;
          // requestPostStudent(formModel.value)
          //   .then(() => {
          //     emit("accept-modal");
          onClearData();
          //   })
          //   .catch(() => {
          //     sendingRequest.value = false;
          //   });
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
