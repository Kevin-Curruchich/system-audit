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
            v-loading="isLoadingEmployees"
            :data="employees.data"
            style="width: 100%"
          >
            <el-table-column label="Nombre">
              <template #default="{ row }">
                <span>{{ row.employeeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Descripción">
              <template #default="{ row }">
                <span>{{ row.employeeTypeName }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="employees.total"
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
import { useEmployees, useBranches, useFormatDate } from "@/composables";

export default {
  name: "ProductsList",
  components: { ArgonButton },

  setup() {
    //instances
    const {
      employees,
      employeeStatuses,
      employeeTypes,
      isLoadingEmployees,
      requestGetEmployees,
      requestGetEmployeeStatuses,
      requestGetEmployeeTypes,
      getStatusBadge,
    } = useEmployees();
    const { branches, getBranches } = useBranches();
    const { formatDateDMY } = useFormatDate();

    //ref
    const selectedBranch = ref("");
    const selectedStatus = ref("");
    const selectedEmployeeType = ref("");
    const search = ref("");

    //methods
    const numberWithCommas = (x) => {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    };

    const onChangePage = (page) => {
      requestGetEmployees({
        page,
        search: search.value || null,
        branchId: selectedBranch.value || null,
        employeeStatusId: selectedStatus.value || null,
        employeeTypeId: selectedEmployeeType.value || null,
      });
    };

    const filter = () => {
      requestGetEmployees({
        search: search.value || null,
        branchId: selectedBranch.value || null,
        employeeStatusId: selectedStatus.value || null,
        employeeTypeId: selectedEmployeeType.value || null,
      });
    };

    //lifecycle
    onMounted(() => {
      // requestGetEmployees({});
      getBranches();
      requestGetEmployeeStatuses();
      requestGetEmployeeTypes();
    });

    return {
      branches,
      employees,
      employeeStatuses,
      employeeTypes,
      filter,
      isLoadingEmployees,
      moment,
      numberWithCommas,
      onChangePage,
      search,
      selectedBranch,
      selectedEmployeeType,
      selectedStatus,
      formatDateDMY,
      getStatusBadge,
    };
  },
};
</script>
