<template>
  <modal scrollable :show="showModal" size="lg" :on-hide-modal="onHideModal">
    <template #header> Asignar cobro </template>
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
            <el-form-item label="Estudiante" prop="studentId">
              <el-select
                v-model="formModel.studentId"
                placeholder="Estudiante"
                filterable
              >
                <el-option
                  v-for="student in studentsList.data"
                  :key="student.studentId"
                  :value="student.studentId"
                  :label="student.studentFullName"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Cobro" prop="collectionId">
              <el-select
                v-model="formModel.collectionId"
                placeholder="Cobro"
                filterable
              >
                <el-option
                  v-for="collection in collectionsToStudent"
                  :key="collection.collectionId"
                  :value="collection.collectionId"
                  :label="collection.collectionName"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Monto" prop="collectionStudentAmountOwed">
              <el-input
                v-model="formModel.collectionStudentAmountOwed"
                type="number"
                placeholder="Monto "
              />
            </el-form-item>
          </div>

          <div class="col-md-6">
            <el-form-item label="Trimestre" prop="quartetlyQuartetlyId">
              <el-select v-model="formModel.quartetlyQuartetlyId">
                <el-option
                  v-for="quarter in quartersList"
                  :key="quarter.quartetlyId"
                  :value="quarter.quartetlyId"
                  :label="quarter.quartetlyName"
                />
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-6">
            <el-form-item label="Fecha" prop="collectionStudentDate">
              <el-date-picker
                v-model="formModel.collectionStudentDate"
                placeholder="Fecha"
                format="DD/MM/YYYY"
                style="width: 100%"
              />
            </el-form-item>
          </div>

          <div class="col-md-12">
            <el-form-item label="Descripcion" prop="collectionDescription">
              <el-input
                v-model="formModel.collectionDescription"
                placeholder="Descripcion"
                type="textarea"
                rows="2"
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
import { onMounted, ref, watch } from "vue";
import {
  useStudents,
  useCollections,
  useFormatDate,
  useQuarters,
} from "@/composables";
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
    const { requestGetStudentsList, studentsList } = useStudents();
    const { collections, requestGetCollections, requestPostCollectionStudent } =
      useCollections();
    const { requestGetQuartresList, quartersList } = useQuarters();

    const { formatDateYMD } = useFormatDate();

    //refs
    const lockModal = ref(false);
    const collectionsToStudent = ref([]);
    const formRef = ref(null);
    const formModel = ref({
      studentId: "",
      collectionId: "",
      quartetlyQuartetlyId: "",
      collectionStudentDate: "",
      collectionStudentAmountOwed: "",
      collectionDescription: "",
    });

    const rules = ref({
      studentId: [{ required: true, message: requiredMesage }],
      collectionId: [{ required: true, message: requiredMesage }],
      collectionStudentAmountOwed: [
        { required: true, message: requiredMesage },
      ],
      collectionStudentDate: [{ required: true, message: requiredMesage }],
      quartetlyQuartetlyId: [{ required: true, message: requiredMesage }],
    });

    //methods
    const onHideModal = () => {
      formRef.value.resetFields();
      emit("hidde-modal");
    };

    const onClearData = () => {
      formRef.value.resetFields();
      collectionsToStudent.value = [];
      lockModal.value = false;
    };

    const onSubmit = async () => {
      await formRef.value.validate((isValid) => {
        if (isValid) {
          lockModal.value = true;
          formModel.value.collectionStudentDate = formatDateYMD(
            formModel.value.collectionStudentDate
          );
          formModel.value.collectionStudentAmountOwed =
            +formModel.value.collectionStudentAmountOwed;
          console.log({ formModel: formModel.value });
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

    //watchers
    watch(
      () => formModel.value.studentId,
      (studentId) => {
        if (studentId) {
          lockModal.value = true;
          formModel.value.collectionId = "";
          const studentData = studentsList.value.data.find(
            (student) => student.studentId === studentId
          );

          collectionsToStudent.value = collections.value.filter((collection) =>
            collection.collectionStudentApply.find(
              (applyStudent) =>
                applyStudent.studentTypeId === studentData.studentTypeId
            )
          );
          lockModal.value = false;
        }
      }
    );

    watch(
      () => formModel.value.collectionId,
      (collecitonId) => {
        if (collecitonId) {
          const collectionData = collectionsToStudent.value.find(
            (collection) => collection.collectionId === collecitonId
          );

          formModel.value.collectionStudentAmountOwed =
            collectionData.collectionBaseAmount;
        }
      }
    );

    //lifecycle
    onMounted(() => {
      requestGetStudentsList();
      requestGetCollections();
      requestGetQuartresList();
    });

    return {
      formModel,
      formRef,
      onHideModal,
      onSubmit,
      rules,
      lockModal,
      studentsList,
      collectionsToStudent,
      quartersList,
    };
  },
};
</script>

<style></style>
