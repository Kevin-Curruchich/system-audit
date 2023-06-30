<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <el-collapse v-loading="isLoadingCollectionsByStudent">
          <el-collapse-item
            v-for="{
              collectionStudentId,
              collection,
              Payment,
              collectionStudentAmountOwed,
              collectionStudentAmountPaid,
            } in collectionsByStudent"
            :key="collectionStudentId"
          >
            <template #title>
              <span class="me-2 fs-6">
                {{ collection.collectionName }}
                <b>
                  {{
                    `Q.${(
                      collectionStudentAmountOwed + collectionStudentAmountPaid
                    ).toLocaleString("es-GT")}`
                  }}
                </b>
              </span>
              <el-tag type="success" class="me-2"
                >{{
                  `Q.${collectionStudentAmountPaid.toLocaleString("es-GT")}`
                }}
              </el-tag>
              <el-tag type="danger" class="me-2"
                >{{
                  `Q.${collectionStudentAmountOwed.toLocaleString("es-GT")}`
                }}
              </el-tag>
            </template>

            <el-timeline>
              <el-timeline-item
                v-for="payment in Payment"
                :key="payment.paymentId"
                :timestamp="formatDateDMY(payment.paymentDate)"
                placement="top"
                type="primary"
              >
                <el-card shadow="never">
                  <span class="me-1">ID: </span>
                  <a
                    href="#"
                    class="text-primary"
                    @click="onNavigateToPayment(payment.paymentId)"
                    >{{ collectionId(payment.paymentId) }}
                  </a>
                  <br />
                  <span
                    >Aporte:
                    <b>
                      {{ `Q.${payment.paymentAmount.toLocaleString("es-GT")}` }}
                    </b>
                  </span>
                  <br />
                  <span class="me-1 mt-3"
                    >Descripción:
                    {{ payment.paymentDescription }}
                  </span>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCollections, useFormatDate, usePayments } from "@/composables";
export default {
  setup() {
    const route = useRoute();

    const { id } = route.params;
    const { onNavigateToPayment } = usePayments();
    const {
      requestGetCollectionsByStudent,
      collectionsByStudent,
      isLoadingCollectionsByStudent,
      collectionId,
    } = useCollections();
    const { formatDateDMY } = useFormatDate();

    onMounted(() => {
      requestGetCollectionsByStudent(id);
    });

    return {
      collectionsByStudent,
      isLoadingCollectionsByStudent,
      formatDateDMY,
      collectionId,
      onNavigateToPayment,
    };
  },
};
</script>

<style></style>
