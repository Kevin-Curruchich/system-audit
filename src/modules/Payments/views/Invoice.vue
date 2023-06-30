<template>
  <el-button @click="onBackPayments">
    <i class="fas fa-arrow-left mx-2"></i> Volver
  </el-button>
  <div v-if="isLoadingPaymentById" class="container-fluid mt-1 pt-1">
    <div class="row">
      <div class="col-md-8 col-sm-10 mx-auto">
        <div class="card">
          <div class="card-header text-center pb-0">
            <el-skeleton>
              <el-skeleton-item style="height: 150px" />
              <el-skeleton-item style="height: 150px" />
              <el-skeleton-item style="height: 150px" />
            </el-skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else id="sbg-invoice" class="container-fluid mt-1 pt-1">
    <div v-loading="isLoadingPaymentById" class="row">
      <div class="col-md-8 col-sm-10 mx-auto">
        <div class="card">
          <div class="card-header text-center pb-0">
            <div class="row justify-content-between py-1 my-0">
              <div class="col-6 text-start">
                <img
                  class="mb-2 w-25 p-2"
                  src="https://sbg.org.gt/SBG/static/images/logo_sbg_white.png"
                  alt="Logo"
                />
                <h6>Seminario Bíblico Guatemalteco</h6>
                <p class="d-block text-secondary mb-1">
                  <i class="fas fa-map-marker-alt me-2"></i> 5a. Calle 0-43
                </p>
                <p class="d-block text-secondary mb-1">
                  <i class="fas fa-phone-alt me-2"></i> 2251-8000
                </p>
              </div>
            </div>
            <div class="row justify-content-md-between">
              <div class="col-md-12">
                <span class="text-left fs-6">
                  Correlativo:
                  <span class="text-secondary">
                    {{ paymentById?.paymentId }}
                  </span>
                </span>
              </div>
              <div class="col-md-4">
                <p class="text-start mb-0">
                  Estudiante:
                  <b>
                    {{ paymentById?.student?.studentFullName }}
                  </b>
                </p>
              </div>
              <div class="col-lg-5 col-md-7 text-end">
                <p class="text-secondary mb-0">
                  Fecha:
                  <b>
                    {{ formatDateDMY(paymentById?.paymentDate) }}
                  </b>
                </p>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <el-table :data="[paymentById]">
                  <el-table-column>
                    <template #header>
                      <div class="text-center">Concepto</div>
                    </template>
                    <template #default="{ row }">
                      <div class="text-center">
                        {{ row?.collectionStudent?.collection.collectionName }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template #header>
                      <div class="text-center">Monto</div>
                    </template>
                    <template #default="{ row }">
                      <div class="text-center">
                        {{
                          `Q. ${(row?.paymentAmount).toLocaleString("es-GT")}`
                        }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="card-footer pt-1 pb-4">
            <div class="d-flex justify-content-center">
              <span class="text-secondary mb-0">
                Alguna informacion extra
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center align-items-center p-4">
      <argon-button
        color="success"
        variant="gradient"
        class="mb-0"
        :onclick="printInvoice"
        type="button"
        name="button"
        >Imprimir
        <i class="fas fa-print"></i>
      </argon-button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePayments, useFormatDate } from "@/composables";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "Invoice",
  components: {
    ArgonButton,
  },
  setup() {
    //composables
    const { requestGetPaymentById, paymentById, isLoadingPaymentById } =
      usePayments();
    const { formatDateDMY } = useFormatDate();

    const route = useRoute();
    const router = useRouter();

    //methods
    const printInvoice = () => {
      const prtContent = document.getElementById("sbg-invoice");
      const WinPrint = window.open(
        "www.sbg.org.gt",
        "Recibo_SBG",
        "left=0,top=0,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    };

    const onBackPayments = () => {
      router.back();
    };

    //lifecycle
    onMounted(() => {
      console.log("Hola");
      const id = route.params.id;
      requestGetPaymentById(id);
    });

    return {
      formatDateDMY,
      isLoadingPaymentById,
      onBackPayments,
      paymentById,
      printInvoice,
    };
  },
};
</script>
