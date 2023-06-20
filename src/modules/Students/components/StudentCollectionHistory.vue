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
            } in collectionsByStudent"
            :key="collectionStudentId"
            :title="collection.collectionName"
          >
            <el-timeline>
              <el-timeline-item
                v-for="payment in Payment"
                :key="payment.paymentId"
                :timestamp="formatDateDMY(payment.paymentDate)"
                placement="top"
                type="primary"
              >
                <span>{{ `Q.${payment.paymentAmount}` }}</span>
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
import { useCollections, useFormatDate } from "@/composables";
export default {
  setup() {
    const route = useRoute();

    const { id } = route.params;
    const {
      requestGetCollectionsByStudent,
      collectionsByStudent,
      isLoadingCollectionsByStudent,
    } = useCollections();
    const { formatDateDMY } = useFormatDate();

    onMounted(() => {
      requestGetCollectionsByStudent(id);
    });

    return {
      collectionsByStudent,
      isLoadingCollectionsByStudent,
      formatDateDMY,
    };
  },
};
</script>

<style></style>
