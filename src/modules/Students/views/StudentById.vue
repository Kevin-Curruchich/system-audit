<template>
  <div v-loading="isLoadingStudent" class="p-4 container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-lg-flex">
          <div>
            <argon-button variant="outline" color="black" @click="back">
              <i class="fas fa-arrow-left"></i>
            </argon-button>
          </div>
          <div class="my-auto mx-auto">
            <span class="fs-4">{{
              `${student.studentName} ${student.studentLastName}`
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <i class="fas fa-money-bill-wave-alt m-2"></i> Historial Pagos
        </template>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <i class="fas fa-address-card m-2"></i> Información
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ArgonButton } from "@/components";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStudent } from "@/composables";

export default {
  components: { ArgonButton },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    //instances
    const router = useRouter();
    const { student, requestGetStudentById, isLoadingStudent } = useStudent();

    const back = () => {
      router.push({ name: "List of Students" });
    };

    //lifecycle
    onMounted(() => {
      requestGetStudentById(props.id);
    });

    return { back, student, isLoadingStudent };
  },
};
</script>

<style></style>
