<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Cobros asignados</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <argon-button
                  color="primary"
                  size="lg"
                  @click="showModal = true"
                >
                  Nuevo
                </argon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table
            v-loading="isLoadingAssignedCollections"
            :data="assignedCollections.data"
          >
            <el-table-column label="ID">
              <template #default="{ row }">
                <a href="#" class="text-primary">
                  {{ collectionId(row.collectionStudentId) }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Estudiate">
              <template #default="{ row }">
                {{ row.student.studentFullName }}
              </template>
            </el-table-column>
            <el-table-column label="Fecha asignacion">
              <template #default="{ row }">
                {{ formatDateDMY(row.collectionStudentDate) }}
              </template>
            </el-table-column>
            <el-table-column label="Monto a pagar">
              <template #default="{ row }">
                {{ `Q. ${row.collectionStudentAmountOwed}` }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="assignedCollections.total"
            @current-change="onChangePage"
          />
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <add-edit-asigned-collection
    :show="showModal"
    @hidde-modal="onCloseModal"
    @accept-modal="onAcceptModal"
  />
</template>

<script>
import { onMounted, ref } from "vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { useCollections, useFormatDate } from "@/composables";
import AddEditAsignedCollection from "../components/AddEditAsignedCollection.vue";

export default {
  name: "Collections",
  components: { ArgonButton, AddEditAsignedCollection },
  setup() {
    const {
      isLoadingAssignedCollections,
      onChangePage,
      assignedCollections,
      total,
      collectionId,
      getStatusBadge,
      requestGetAssignedCollections,
    } = useCollections();

    const { formatDateDMY, formatDateDMYH } = useFormatDate();

    //refs
    const showModal = ref(false);

    //methods
    const onCloseModal = () => {
      showModal.value = false;
    };

    const onAcceptModal = () => {
      showModal.value = false;
      init();
    };

    const init = () => {
      requestGetAssignedCollections({
        take: 10,
        page: 1,
      });
    };

    onMounted(() => {
      init();
    });

    return {
      assignedCollections,
      collectionId,
      formatDateDMY,
      formatDateDMYH,
      getStatusBadge,
      isLoadingAssignedCollections,
      onAcceptModal,
      onChangePage,
      onCloseModal,
      showModal,
      total,
    };
  },
};
</script>
