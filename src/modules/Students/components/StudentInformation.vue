<template>
  <el-card shadow="never">
    <template #header>
      <div class="d-flex justify-content-between">
        <div>
          <h5 class="mb-0">Información</h5>
        </div>
        <div>
          <argon-button color="primary" @click="onEditMode">{{
            `${editMode ? "Cancelar" : "Editar"}`
          }}</argon-button>
        </div>
      </div>
    </template>
    <el-form
      ref="formRef"
      v-loading="sendingRequest"
      label-position="top"
      :model="formModel"
      :rules="rules"
    >
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Nombre" prop="studentName">
            <el-input
              v-model="formModel.studentName"
              type="text"
              placeholder="Nombre"
              :disabled="!editMode"
            />
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Apellido" prop="studentLastName">
            <el-input
              v-model="formModel.studentLastName"
              type="text"
              placeholder="Apellido"
              :disabled="!editMode"
            />
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="DPI/DNI" prop="studentDni">
            <el-input
              v-model="formModel.studentDni"
              type="text"
              placeholder="DPI/DNI"
              :disabled="!editMode"
            />
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Telefono" prop="studentPhone">
            <el-input
              v-model="formModel.studentPhone"
              type="text"
              placeholder="Telefono"
              :disabled="!editMode"
            />
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Correo" prop="studentEmail">
            <el-input
              v-model="formModel.studentEmail"
              type="text"
              placeholder="Correo"
              :disabled="!editMode"
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
              :disabled="!editMode"
            />
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Tipo estudiante" prop="studentTypeId">
            <el-select
              v-model="formModel.studentTypeId"
              placeholder="Tipo estudiante"
              :disabled="!editMode"
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
        <div class="col-md-6">
          <el-form-item label="Año" prop="studentCurrentYear">
            <el-select
              v-model="formModel.studentCurrentYear"
              placeholder="Año estudiante"
              :disabled="!editMode"
            >
              <el-option
                v-for="item in studentYears"
                :key="item.year"
                :value="item.year"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="col-12">
      <div class="d-flex justify-content-end">
        <argon-button
          v-show="editMode"
          color="success"
          :loading="sendingRequest"
          @click="onSubmit"
        >
          Guardar
        </argon-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStudents, useStudent } from "@/composables";
import { ArgonButton } from "@/components";
import errorMessages from "@/constants/formErrorMessages";

export default {
  components: {
    ArgonButton,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const requiredMesage = errorMessages.required;
    const inValidEmailMessage = errorMessages.inValidEmail;
    //instances
    const {
      requestGetSudentTypes,
      studentTypes,
      studentYears,
      requestPostStudent,
    } = useStudents();

    const { student } = useStudent();

    //refs
    const editMode = ref(false);
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
      studentCurrentYear: "",
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
      studentCurrentYear: [{ required: true, message: requiredMesage }],
    });

    //methods
    const onEditMode = () => {
      editMode.value = !editMode.value;
      if (!editMode.value) {
        onClearData();
      }
    };

    const onClearData = () => {
      formRef.value.resetFields();
      onSetInitialData();
      sendingRequest.value = false;
    };

    const onSetInitialData = () => {
      formModel.value.studentName = student.value.studentName;
      formModel.value.studentLastName = student.value.studentLastName;
      formModel.value.studentDni = student.value.studentDni;
      formModel.value.studentPhone = student.value.studentPhone;
      formModel.value.studentEmail = student.value.studentEmail;
      formModel.value.studentStartDate = student.value.studentStartDate;
      formModel.value.studentTypeId = student.value.StudentType.studentTypeId;
      formModel.value.studentCurrentYear = student.value.studentCurrentYear;
    };

    const onSubmit = async () => {
      await formRef.value.validate((isValid) => {
        if (isValid) {
          sendingRequest.value = true;
          requestPostStudent(formModel.value)
            .then(() => {
              onClearData();
            })
            .catch(() => {
              sendingRequest.value = false;
            });
        }
      });
    };

    //lifecycle
    onMounted(async () => {
      await requestGetSudentTypes();
      onSetInitialData();
    });

    return {
      formModel,
      formRef,
      onSubmit,
      rules,
      sendingRequest,
      studentTypes,
      studentYears,
      editMode,
      onEditMode,
    };
  },
};
</script>

<style></style>
