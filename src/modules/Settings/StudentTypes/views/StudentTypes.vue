<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Tipos de Estudiantes</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <argon-button color="primary" size="lg" @click="onOpenModal">
                  Nuevo
                </argon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table
            v-loading="isLoadingStudentTypes"
            :data="studentTypes"
            style="width: 100%"
          >
            <el-table-column label="Nombre">
              <template #default="{ row }">
                <span>{{ row.studentTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Descripción">
              <template #default="{ row }">
                <span>{{ row.studentTypeDesc }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="2"
            @current-change="onChangePage"
          />
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <add-edit-student-type
    :show-modal="showModal"
    @hidde-modal="OnHiddeModal"
    @accept-modal="onAcceptModal"
  />
</template>

<script>
import { onMounted, ref } from "vue";
import { ArgonButton } from "@/components";
import { useStudents } from "@/composables";
import AddEditStudentType from "../components/AddEditStudentType.vue";

export default {
  name: "Students",
  components: { ArgonButton, AddEditStudentType },

  setup() {
    //instances
    const { studentTypes, isLoadingStudentTypes, requestGetSudentTypes } =
      useStudents();

    //ref
    const showModal = ref(false);

    //methods
    const onOpenModal = () => {
      showModal.value = true;
    };

    const OnHiddeModal = () => {
      showModal.value = false;
    };

    const onChangePage = () => {
      requestGetSudentTypes();
    };

    const onAcceptModal = () => {
      OnHiddeModal();
      requestGetSudentTypes();
    };

    //lifecycle
    onMounted(() => {
      requestGetSudentTypes();
    });

    return {
      isLoadingStudentTypes,
      onChangePage,
      onOpenModal,
      showModal,
      studentTypes,
      OnHiddeModal,
      onAcceptModal,
    };
  },
};
</script>
