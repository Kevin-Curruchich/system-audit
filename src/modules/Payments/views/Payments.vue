<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Aportes</h5>
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
              <label class="form-label"> Año </label>
              <div>
                <el-select v-model="studentCurrentYear">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in studentYears"
                    :key="item.year"
                    :value="item.year"
                    :label="item.label"
                  />
                </el-select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="h-100 d-flex align-items-end justify-content-end">
                <argon-button @click="filter"
                  >Filtrar
                  <i class="fas fa-filter"></i>
                </argon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table
            v-loading="isLoadingPayments"
            :data="payments.data"
            row-key="studentId"
            style="width: 100%; margin-bottom: 20px"
            border
            size="default"
          >
            <el-table-column label="Estudiante" min-width="180px">
              <template #default="{ row }">
                {{ row.studentFullName }}
              </template>
            </el-table-column>
            <el-table-column label="ID Pago">
              <template #default="{ row }">
                <a
                  href="#"
                  class="text-primary"
                  @click="onNavigateToPayment(row?.paymentId)"
                  >{{ getPaymentsId(row?.paymentId) }}</a
                >
              </template>
            </el-table-column>
            <el-table-column label="Cobro" min-width="180px">
              <template #default="{ row }">
                {{ row?.collectionStudent?.collection.collectionName }}
              </template>
            </el-table-column>
            <el-table-column label="Trimestre" min-width="180px">
              <template #default="{ row }">
                {{ row?.collectionStudent?.Quartetly.quartetlyName }}
              </template>
            </el-table-column>
            <el-table-column label="Monto de aporte" min-width="150px">
              <template #default="{ row }">
                {{ `${row?.paymentAmount ? `Q. ${row.paymentAmount}` : ""}` }}
              </template>
            </el-table-column>
            <el-table-column label="Fecha " min-width="150px">
              <template #default="{ row }">
                {{
                  `${row?.paymentDate ? formatDateDMY(row?.paymentDate) : ""}`
                }}
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
import { ref } from "vue";
import { usePayments, useFormatDate, useStudents } from "@/composables";
import ArgonButton from "@/components/ArgonButton.vue";
import AddEditPayment from "../components/AddEditPayment.vue";

export default {
  name: "Payments",
  components: { ArgonButton, AddEditPayment },
  setup() {
    //instnaces
    const {
      isLoadingPayments,
      requestGetPayments,
      payments,
      getPaymentsId,
      onNavigateToPayment,
    } = usePayments();
    const { formatDateDMY, formatDateDMYH } = useFormatDate();
    const { studentYears } = useStudents();

    //refs
    const showModal = ref(false);
    const search = ref("");
    const studentCurrentYear = ref("");

    //methods
    const filter = () => {
      const params = {
        page: 1,
        take: 10,
        searchQuery: search.value,
        currentYear: studentCurrentYear.value,
      };

      requestGetPayments(params);
    };

    const onChangePage = (page) => {
      requestGetPayments({
        take: 10,
        page,
      });
    };

    const onCloseModal = () => {
      showModal.value = false;
    };

    const onAcceptModal = () => {
      showModal.value = false;
      requestGetPayments();
    };

    return {
      filter,
      formatDateDMY,
      formatDateDMYH,
      getPaymentsId,
      isLoadingPayments,
      onAcceptModal,
      onChangePage,
      onCloseModal,
      onNavigateToPayment,
      payments,
      search,
      showModal,
      studentCurrentYear,
      studentYears,
    };
  },
};
</script>
