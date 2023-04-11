<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Empleados</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <argon-button color="primary" size="lg"> Nuevo </argon-button>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-5">
              <label class="form-label"> Sede </label>
              <div class="">
                <el-select v-model="selectedBranch">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in branches"
                    :key="item.branchId"
                    :value="item.branchId"
                    :label="item.branchName"
                  >
                    {{ item.branchName }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-md-5">
              <label class="form-label"> Estado </label>
              <div>
                <el-select v-model="selectedStatus">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in employeeStatuses"
                    :key="item.employeeStatusId"
                    :value="item.employeeStatusId"
                    :label="item.employeeStatussName"
                  >
                    {{ item.employeeStatussName }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="h-100 d-flex align-items-end">
                <argon-button @click="filter"
                  >Filtrar
                  <i class="fas fa-filter"></i>
                </argon-button>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-5">
              <label class="form-label"> Buscar </label>
              <div class="">
                <el-input
                  v-model="search"
                  clearable
                  type="text"
                  placeholder="Buscar"
                />
              </div>
            </div>
            <div class="col-md-5">
              <label class="form-label"> Puesto </label>
              <div>
                <el-select v-model="selectedEmployeeType">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in employeeTypes"
                    :key="item.employeeTypeId"
                    :value="item.employeeTypeId"
                    :label="item.employeeTypeName"
                  >
                    {{ item.employeeTypeName }}
                  </el-option>
                </el-select>
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
                <a href="#" @click="redirectEmployee(row)"
                  >{{ row.personFullName }} <br />
                  <span style="color: #525f7f"
                    ><b>DPI:</b> {{ row.personNDI }}</span
                  >
                  <br />
                  <span style="color: #525f7f"
                    ><b>Telefono:</b> {{ row.personPhone }}</span
                  ></a
                >
              </template>
            </el-table-column>
            <el-table-column label="Salario">
              <template #default="{ row }">
                <span style="color: #525f7f"
                  ><b>Tipo de Pago:</b> {{ row.salaryTypeName }}</span
                >
                <br />
                <span style="color: #525f7f"
                  ><b>Salario:</b> Q.
                  {{ numberWithCommas(row.employeeSalary) }}</span
                >
                <br />
                <span style="color: #525f7f"
                  ><b>Fecha de Inicio:</b>
                  {{ formatDateDMY(row.employeeStartDate) }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="Sede">
              <template #default="{ row }">
                <span><b>Sede:</b> {{ row.branchName }}</span>
                <br />
                <span><b>Departamento:</b> {{ row.departmentName }}</span>
                <br />
                <span><b>Puesto:</b> {{ row.employeeTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Estado" align="center">
              <template #default="{ row }">
                <el-tag
                  :type="getStatusBadge(row.employeeStatusId)"
                  effect="dark"
                >
                  {{ row.employeeStatussName }}
                </el-tag>
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
      requestGetEmployees({});
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
