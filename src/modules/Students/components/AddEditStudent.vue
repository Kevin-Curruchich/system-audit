<template>
  <modal scrollable :show="showModal" size="lg" :on-hide-modal="onHideModal">
    <template #header> Agregar Estudiante </template>
    <template #body>
      <el-form
        ref="formRef"
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
            <el-form-item label="DPI/DNI" prop="studentDNI">
              <el-input
                v-model="formModel.studentDNI"
                type="text"
                placeholder="DPI/DNI"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Telefono" prop="studentPhoneNumber">
              <el-input
                v-model="formModel.studentPhoneNumber"
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
            <el-form-item label="Fecha ingreso" prop="studentDateStart">
              <el-date-picker
                v-model="formModel.studentDateStart"
                type="month"
                placeholder="Fecha ingreso"
                style="width: 100%"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Tipo estudiante" prop="studentType">
              <el-select
                v-model="formModel.studentType"
                placeholder="Tipo estudiante"
              >
                <el-option
                  v-for="item in [{ label: 'Estudiante', value: 1 }]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
      <argon-button @click="onSubmit">Agregar</argon-button>
    </template>
  </modal>
</template>

<script>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import { ArgonButton } from "@/components";
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
  emits: ["hidde-modal"],
  setup(_, { emit }) {
    const requiredMesage = errorMessages.required;
    const inValidEmailMessage = errorMessages.inValidEmail;

    //refs
    const formRef = ref(null);
    const formModel = ref({
      studentName: "",
      studentLastName: "",
      studentDNI: "",
      studentPhoneNumber: "",
      studentEmail: "",
      studentDateStart: "",
      studentType: "",
    });

    const rules = ref({
      studentName: [{ required: true, message: requiredMesage }],
      studentLastName: [{ required: true, message: requiredMesage }],
      studentDNI: [{ required: true, message: requiredMesage }],
      studentPhoneNumber: [{ required: true, message: requiredMesage }],
      studentEmail: [
        { required: true, message: requiredMesage },
        { type: "email", message: inValidEmailMessage },
      ],
      studentDateStart: [{ required: true, message: requiredMesage }],
      studentType: [
        { required: true, message: requiredMesage, trigger: "change" },
      ],
    });

    //methods
    const onHideModal = () => {
      formRef.value.resetFields();
      emit("hidde-modal");
    };

    const onSubmit = async () => {
      await formRef.value.validate((isValid) => {
        if (isValid) {
          console.log(formModel.value);
        }
      });
    };

    return {
      formModel,
      formRef,
      onHideModal,
      onSubmit,
      rules,
    };
  },
};
</script>

<style></style>
