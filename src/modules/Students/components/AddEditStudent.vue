<template>
  <modal scrollable :show="showModal" size="lg" :on-hide-modal="onHideModal">
    <template #header> Agregar Estudiante </template>
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
            <el-form-item label="Nombre" prop="studentName">
              <el-input
                v-model="formModel.studentName"
                type="text"
                placeholder="Nombre"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Apellido" prop="studentLastName">
              <el-input
                v-model="formModel.studentLastName"
                type="text"
                placeholder="Apellido"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="DPI/DNI" prop="studentDni">
              <el-input
                v-model="formModel.studentDni"
                type="text"
                placeholder="DPI/DNI"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Telefono" prop="studentPhone">
              <el-input
                v-model="formModel.studentPhone"
                type="text"
                placeholder="Telefono"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Correo" prop="studentEmail">
              <el-input
                v-model="formModel.studentEmail"
                type="text"
                placeholder="Correo"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Fecha ingreso" prop="studentStartDate">
              <el-date-picker
                v-model="formModel.studentStartDate"
                placeholder="Fecha ingreso"
                format="DD/MM/YYYY"
                style="width: 100%"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Tipo estudiante" prop="studentTypeId">
              <el-select
                v-model="formModel.studentTypeId"
                placeholder="Tipo estudiante"
              >
                <el-option
                  v-for="item in studentTypes"
                  :key="item.studentTypeId"
                  :value="item.studentTypeId"
                  :label="item.studentTypeName"
                />
              </el-select>
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
import { useStudents } from "@/composables";
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
    const inValidEmailMessage = errorMessages.inValidEmail;
    //instances
    const { requestGetSudentTypes, studentTypes, requestPostStudent } =
      useStudents();

    //refs
    const sendingRequest = ref(false);
    const formRef = ref(null);
    const formModel = ref({
      studentName: "",
      studentLastName: "",
      studentDni: "",
      studentPhone: "",
      studentEmail: "",
      studentStartDate: "",
      studentTypeId: "",
    });

    const rules = ref({
      studentName: [{ required: true, message: requiredMesage }],
      studentLastName: [{ required: true, message: requiredMesage }],
      studentDni: [{ required: true, message: requiredMesage }],
      studentPhone: [{ required: true, message: requiredMesage }],
      studentEmail: [
        { required: true, message: requiredMesage },
        { type: "email", message: inValidEmailMessage },
      ],
      studentStartDate: [{ required: true, message: requiredMesage }],
      studentTypeId: [
        { required: true, message: requiredMesage, trigger: "change" },
      ],
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
          requestPostStudent(formModel.value)
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
    onMounted(() => {
      requestGetSudentTypes();
    });

    return {
      formModel,
      formRef,
      onHideModal,
      onSubmit,
      rules,
      sendingRequest,
      studentTypes,
    };
  },
};
</script>

<style></style>
