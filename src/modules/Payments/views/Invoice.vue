<template>
  <el-button size="large" @click="onBackPayments">
    <i class="fas fa-arrow-left mx-2"></i> Volver
  </el-button>
  <div class="container-fluid">
    <div v-if="userIsAdmin" class="row p-4">
      <div class="col-6 text-end">
        <argon-button
          v-show="!isLoadingPaymentById"
          color="success"
          variant="gradient"
          class="mb-0"
          :onclick="onPrintInvoice"
          type="button"
          name="button"
          >Imprimir
          <i class="fas fa-print mx-2"></i>
        </argon-button>
      </div>
      <div class="col-6">
        <argon-button
          v-show="!isLoadingPaymentById"
          color="primary"
          variant="gradient"
          class="mb-0"
          :onclick="onSendEmail"
          type="button"
          name="button"
          :loading="sendEmail"
          >Enviar correo
          <i class="fas fa-envelope mx-2"></i>
        </argon-button>
      </div>
    </div>
  </div>
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
        <div class="card p-3">
          <div
            class="company-info"
            style="
              text-align: center;
              margin-bottom: 20px;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <img
              class="company-logo"
              src="https://sbg.org.gt/SBG/static/images/logo_sbg_white.png"
              alt="Logo de la empresa"
              style="max-width: 100px; margin-bottom: 10px"
            />
            <h2 style="margin: 0">SEMINARIO BIBLICO GUATEMALTECO</h2>
            <p style="margin: 5px 0">
              1 Calle 7-206 Z.3 Chimaltenango, Guatemala, Chimaltenango,
              Guatemala
            </p>
            <p style="margin: 5px 0">Tel: 7839-4897</p>
          </div>
          <hr style="margin: 5px 0" />
          <div
            class="invoice-header"
            style="
              text-align: center;
              margin-bottom: 20px;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <p style="margin: 5px 0">
              Fecha:
              {{ formatDateDMY(paymentById?.paymentDate) }}
            </p>
            <p style="margin: 5px 0">
              <b>Correlativo:</b> {{ paymentById?.paymentId }}
            </p>
          </div>
          <div
            class="customer-info"
            style="
              margin-bottom: 20px;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <p style="margin: 0; font-weight: bold">Estudiante:</p>
            <p style="margin: 5px 0">
              {{ paymentById?.student?.studentFullName }}
            </p>
          </div>
          <table
            class="invoice-table"
            style="
              width: 100%;
              margin-top: 20px;
              border-collapse: collapse;
              background-color: #f9f9f9;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <tr>
              <th
                style="border: 1px solid #ddd; padding: 10px; text-align: left"
              >
                Concepto
              </th>

              <th
                style="border: 1px solid #ddd; padding: 10px; text-align: left"
              >
                Monto
              </th>
            </tr>

            <tr
              v-for="item in [paymentById]"
              :key="item?.collectionStudent?.collection.collectionId"
            >
              <td
                style="border: 1px solid #ddd; padding: 10px; text-align: left"
              >
                <b>
                  {{ item?.collectionStudent?.collection.collectionName }}
                </b>
                <br />
                <small style="font-variant: small-caps">{{
                  item?.paymentDescription
                }}</small>
              </td>

              <td
                style="border: 1px solid #ddd; padding: 10px; text-align: left"
              >
                {{ `Q. ${item?.paymentAmount?.toLocaleString("es-GT")}` }}
              </td>
            </tr>
          </table>
          <!-- <div
            class="total"
            style="text-align: right; margin-top: 20px; font-weight: bold"
          >
            <p style="margin: 0; font-size: large">Total: $190.00</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePayments, useFormatDate, useAuth } from "@/composables";
import ArgonButton from "@/components/ArgonButton.vue";
import { ElMessage } from "element-plus";

export default {
  name: "Invoice",
  components: {
    ArgonButton,
  },
  setup() {
    //composables
    const {
      requestGetPaymentById,
      paymentById,
      isLoadingPaymentById,
      requestPostInvoiceMail,
    } = usePayments();
    const { formatDateDMY } = useFormatDate();

    const route = useRoute();
    const router = useRouter();
    const { userIsAdmin } = useAuth();

    //ref
    const sendEmail = ref(false);

    //methods
    const onSendEmail = async () => {
      sendEmail.value = true;
      const id = route.params.id;
      await requestPostInvoiceMail(id);
      sendEmail.value = false;

      //message success email
      ElMessage({
        showClose: true,
        message: "Correo enviado correctamente",
        type: "success",
      });
    };

    const onPrintInvoice = () => {
      const prtContent = document.getElementById("sbg-invoice");
      const WinPrint = window.open(
        "www.sbg.org.gt",
        "Recibo_SBG",
        "left=0,top=0,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(
        `<html><head>
          <body onload="window.print();">
          ${prtContent.innerHTML}
          </html>`
      );

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print({
        scale: 110,
      });
      WinPrint.close();
    };

    const onBackPayments = () => {
      router.back();
    };

    //lifecycle
    onMounted(() => {
      const id = route.params.id;
      requestGetPaymentById(id);
    });

    return {
      formatDateDMY,
      isLoadingPaymentById,
      onBackPayments,
      onSendEmail,
      paymentById,
      onPrintInvoice,
      sendEmail,
      userIsAdmin,
    };
  },
};
</script>
