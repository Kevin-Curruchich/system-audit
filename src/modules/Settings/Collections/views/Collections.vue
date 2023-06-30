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
          <el-table v-loading="isLoadingCollections" :data="collections">
            <el-table-column label="Nombre">
              <template #default="{ row }">
                {{ row.collectionName }}
              </template>
            </el-table-column>
            <el-table-column label="Tipo de estudiate">
              <template #default="{ row }">
                <ul>
                  <li
                    v-for="item in row.collectionStudentApply"
                    :key="item.studentTypeId"
                  >
                    {{ getStudentTypeName(item.studentTypeId) }}
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column label="Tipo de cobro">
              <template #default="{ row }">
                {{ row.collectionType?.collectionTypeName }}
              </template>
            </el-table-column>
            <el-table-column label="Monto base">
              <template #default="{ row }">
                {{ `Q. ${row.collectionBaseAmount}` }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="onChangePage"
          /> -->
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <AddEditCollection
    :show-modal="showModal"
    @hidde-modal="onHiddeModal"
    @accept-modal="onAcceptModal"
  />
</template>

<script>
import { onMounted, ref } from "vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { useCollections, useStudents } from "@/composables";
import AddEditCollection from "../components/AddEditCollection.vue";

export default {
  name: "Collections",
  components: { ArgonButton, AddEditCollection },
  setup() {
    //instances
    const { isLoadingCollections, collections, requestGetCollections } =
      useCollections();
    const { getStudentTypeName } = useStudents();

    //refs
    const showModal = ref(false);

    //methods
    const onHiddeModal = () => {
      showModal.value = false;
    };

    const onAcceptModal = () => {
      showModal.value = false;
      requestGetCollections();
    };

    //lifecycle
    onMounted(() => {
      requestGetCollections();
    });

    //returns
    return {
      collections,
      getStudentTypeName,
      isLoadingCollections,
      onAcceptModal,
      onHiddeModal,
      showModal,
    };
  },
};
</script>
