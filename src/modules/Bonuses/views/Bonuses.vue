<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Bonificaciones</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <argon-button color="primary" size="lg"> Generar </argon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table v-loading="isLoadingTable" :data="payrollBonusesPerPage">
            <el-table-column label="ID Bonificacion">
              <template #default="{ row }">
                <a href="#">{{ getPayrollBonusesId(row.payrollBonusId) }}</a>
              </template>
            </el-table-column>
            <el-table-column label="Sede">
              <template #default="{ row }">
                {{ row.branch.branchName }}
              </template>
            </el-table-column>
            <el-table-column label="Tipo">
              <template #default="{ row }">
                {{ row.payrollBonusType.payrollBonusTypeName }}
              </template>
            </el-table-column>
            <el-table-column label="Fecha" min-width="150px">
              <template #default="{ row }">
                {{ formatDateDMY(row.payrollBonusStartDate) }} -
                {{ formatDateDMY(row.payrollBonusEndDate) }}
              </template>
            </el-table-column>
            <el-table-column label="Fecha creacion" min-width="150px">
              <template #default="{ row }">
                {{ formatDateDMYH(row.payrollBonusCreatedAt) }}
              </template>
            </el-table-column>
            <el-table-column label="Estado" align="center">
              <template #default="{ row }">
                <el-tag
                  :type="
                    getStatusBadge(row.payrollBonusStatus?.payrollBonusStatusId)
                  "
                  effect="dark"
                  >{{
                    getStatus(row.payrollBonusStatus?.payrollBonusStatusId)
                  }}</el-tag
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="onChangePage"
          />
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { usePayrollBonuses, useFormatDate } from "@/composables";

export default {
  name: "ProductsList",
  components: { ArgonButton },
  setup() {
    const {
      isLoadingTable,
      onChangePage,
      payrollBonusesPerPage,
      requestGetPayrollBonuses,
      total,
      getPayrollBonusesId,
      getStatusBadge,
      getStatus,
    } = usePayrollBonuses();
    const { formatDateDMY, formatDateDMYH } = useFormatDate();

    onMounted(() => {
      requestGetPayrollBonuses();
    });

    return {
      isLoadingTable,
      onChangePage,
      payrollBonusesPerPage,
      total,
      getPayrollBonusesId,
      formatDateDMY,
      formatDateDMYH,
      getStatusBadge,
      getStatus,
    };
  },
};
</script>
