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
                <argon-button color="primary" size="lg"> Nuevo </argon-button>
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
</template>

<script>
import { onMounted, ref } from "vue";
import moment from "moment";
import ArgonButton from "@/components/ArgonButton.vue";
import { useStudents, useFormatDate } from "@/composables";

export default {
  name: "Students",
  components: { ArgonButton },

  setup() {
    //instances
    const {
      studentTypes,
      isLoadingStudentTypes,
      requestGetSudentTypes,
      getStatusBadge,
    } = useStudents();
    const { formatDateDMY } = useFormatDate();

    //ref
    const selectedStatus = ref("");
    const search = ref("");

    //methods
    const onChangePage = () => {
      requestGetSudentTypes();
    };

    //lifecycle
    onMounted(() => {
      requestGetSudentTypes();
    });

    return {
      studentTypes,
      isLoadingStudentTypes,
      moment,
      onChangePage,
      search,
      selectedStatus,
      formatDateDMY,
      getStatusBadge,
    };
  },
};
</script>
