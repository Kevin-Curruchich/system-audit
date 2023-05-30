<template>
  <modal scrollable :show="showModal" size="lg" :on-hide-modal="onHideModal">
    <template #header> Crear Trimestre </template>
    <template #body>
      <el-form
        ref="formRef"
        v-loading="lockModal"
        label-position="top"
        :model="formModel"
        :rules="rules"
      >
        <div class="row">
          <div class="col-md-6">
            <el-form-item label="Nombre Trimestre" prop="quartetName">
              <el-input
                v-model="formModel.quartetName"
                placeholder="Nombre Trimestre"
              />
            </el-form-item>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-6">
            <el-form-item label="Fecha Inicio" prop="quartetlyStart">
              <el-date-picker
                v-model="formModel.quartetlyStart"
                placeholder="Fecha Inicio"
                format="DD/MM/YYYY"
                style="width: 100%"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Fecha Final" prop="quartetlyEnd">
              <el-date-picker
                v-model="formModel.quartetlyEnd"
                placeholder="Fecha Final"
                format="DD/MM/YYYY"
                style="width: 100%"
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
      <argon-button :loading="lockModal" @click="onSubmit"
        >Agregar</argon-button
      >
    </template>
  </modal>
</template>

<script>
import { onMounted, ref } from "vue";
import { useCollections, useFormatDate } from "@/composables";
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
    const { requestPostCollectionStudent } = useCollections();

    const { formatDateYMD } = useFormatDate();

    //refs
    const lockModal = ref(false);
    const formRef = ref(null);
    const formModel = ref({
      quartetName: "",
      quartetlyStart: "",
      quartetlyEnd: "",
    });

    const rules = ref({
      quartetName: [{ required: true, message: requiredMesage }],
      quartetlyStart: [{ required: true, message: requiredMesage }],
      quartetlyEnd: [{ required: true, message: requiredMesage }],
    });

    //methods
    const onHideModal = () => {
      formRef.value.resetFields();
      emit("hidde-modal");
    };

    const onClearData = () => {
      formRef.value.resetFields();
      lockModal.value = false;
    };

    const onSubmit = async () => {
      await formRef.value.validate((isValid) => {
        if (isValid) {
          lockModal.value = true;
          formModel.value.quartetlyStart = formatDateYMD(
            formModel.value.quartetlyStart
          );
          formModel.value.quartetlyEnd = formatDateYMD(
            formModel.value.quartetlyEnd
          );

          requestPostCollectionStudent(formModel.value)
            .then(() => {
              onClearData();
              emit("accept-modal");
            })
            .catch(() => {
              lockModal.value = false;
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
      lockModal,
    };
  },
};
</script>

<style></style>
