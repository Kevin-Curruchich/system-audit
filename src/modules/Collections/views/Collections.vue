<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Cobros</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <argon-button color="primary" size="lg"> Nuevo </argon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table v-loading="isLoadingPayrolls" :data="payrollsPerPage">
            <el-table-column label="Cobro">
              <template #default="{ row }">
                {{ getPayrollId(row.payrollId) }}
              </template>
            </el-table-column>
            <el-table-column label="Tipo de estudiate">
              <template #default="{ row }">
                {{ row.branch.branchName }}
              </template>
            </el-table-column>
            <el-table-column label="Tipo de cobro">
              <template #default="{ row }">
                {{ row.branch.branchName }}
              </template>
            </el-table-column>
            <el-table-column label="Monto base">
              <template #default="{ row }">
                {{ formatDateDMY(row.payrollStartDate) }}
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
import moment from "moment";
import ArgonButton from "@/components/ArgonButton.vue";
import { usePayrolls, useFormatDate } from "@/composables";

export default {
  name: "ProductsList",
  components: { ArgonButton },
  setup() {
    const {
      isLoadingPayrolls,
      onChangePage,
      payrollsPerPage,
      // requestGetPayrolls,
      total,
      getPayrollId,
      getStatusBadge,
    } = usePayrolls();

    const { formatDateDMY, formatDateDMYH } = useFormatDate();

    onMounted(() => {
      // requestGetPayrolls();
    });
    return {
      payrollsPerPage,
      isLoadingPayrolls,
      moment,
      total,
      onChangePage,
      getPayrollId,
      formatDateDMY,
      formatDateDMYH,
      getStatusBadge,
    };
  },
};
</script>
