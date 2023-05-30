<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Pagos</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <argon-button
                  color="primary"
                  size="lg"
                  @click="showModal = true"
                >
                  Registrar
                </argon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table v-loading="isLoadingPayments" :data="payments.data">
            <el-table-column label="ID Pago">
              <template #default="{ row }">
                <a href="#">{{ getPaymentsId(row.paymentId) }}</a>
              </template>
            </el-table-column>
            <el-table-column label="Estudiante">
              <template #default="{ row }">
                {{ row.student.studentFullName }}
              </template>
            </el-table-column>
            <el-table-column label="Cobro a debitar">
              <template #default="{ row }">
                {{ row.collectionStudent.collection.collectionName }}
              </template>
            </el-table-column>
            <el-table-column label="Fecha Pago" min-width="150px">
              <template #default="{ row }">
                {{ formatDateDMY(row.paymentDate) }}
              </template>
            </el-table-column>
            <el-table-column label="Monto de Pago" min-width="150px">
              <template #default="{ row }">
                {{ `Q. ${row.paymentAmount}` }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="payments.total"
            @current-change="onChangePage"
          />
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <add-edit-payment
    :show-modal="showModal"
    @hidde-modal="onCloseModal"
    @accept-modal="onAcceptModal"
  />
</template>

<script>
import { onMounted, ref } from "vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { usePayments, useFormatDate } from "@/composables";
import AddEditPayment from "../components/AddEditPayment.vue";

export default {
  name: "Payments",
  components: { ArgonButton, AddEditPayment },
  setup() {
    //instnaces
    const { isLoadingPayments, requestGetPayments, payments, getPaymentsId } =
      usePayments();
    const { formatDateDMY, formatDateDMYH } = useFormatDate();

    //refs
    const showModal = ref(false);

    //methods
    const onChangePage = () => {};

    const onCloseModal = () => {
      showModal.value = false;
    };

    const onAcceptModal = () => {
      showModal.value = false;
      requestGetPayments();
    };

    onMounted(() => {
      requestGetPayments();
    });

    return {
      formatDateDMY,
      formatDateDMYH,
      getPaymentsId,
      isLoadingPayments,
      onAcceptModal,
      onChangePage,
      onCloseModal,
      payments,
      showModal,
    };
  },
};
</script>
