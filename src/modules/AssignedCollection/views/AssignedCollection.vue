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
            v-loading="isLoadingAssignedCollections"
            :data="assignedCollections.data"
            row-key="studentId"
            style="width: 100%; margin-bottom: 20px"
            border
            size="medium"
          >
            <el-table-column label="Estudiate">
              <template #default="{ row }">
                {{ row.studentFullName }}
              </template>
            </el-table-column>
            <el-table-column label="ID" min-width="50px">
              <template #default="{ row }">
                <a href="#" class="text-primary">
                  {{ collectionId(row?.collectionStudentId) }}
                </a>
              </template>
            </el-table-column>
            <el-table-column label="Cobro">
              <template #default="{ row }">
                {{ row?.collection?.collectionName }}
              </template>
            </el-table-column>
            <el-table-column label="Fecha">
              <template #default="{ row }">
                {{
                  `${
                    row?.collectionStudentDate
                      ? formatDateDMY(row?.collectionStudentDate)
                      : ""
                  }`
                }}
              </template>
            </el-table-column>
            <el-table-column label="Total">
              <template #default="{ row }">
                {{
                  `${
                    row?.collectionStudentAmountOwed &&
                    row?.collectionStudentAmountPaid
                      ? `Q. ${(
                          row?.collectionStudentAmountOwed +
                          row?.collectionStudentAmountPaid
                        ).toLocaleString("es-GT")}`
                      : ""
                  }`
                }}
              </template>
            </el-table-column>
            <el-table-column label="Abonado">
              <template #default="{ row }">
                <div class="text-success">
                  {{
                    `${
                      row?.collectionStudentAmountPaid
                        ? `Q. ${(row?.collectionStudentAmountPaid).toLocaleString(
                            "es-GT"
                          )}`
                        : ""
                    }`
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Saldo">
              <template #default="{ row }">
                <div class="text-danger">
                  {{
                    `${
                      row?.collectionStudentAmountOwed
                        ? `Q. ${(row?.collectionStudentAmountOwed).toLocaleString(
                            "es-GT"
                          )}`
                        : ""
                    }`
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Acciones">
              <template #default="{ row }">
                <el-button v-show="row?.collectionStudentId" size="sm">
                  <i class="fas fa-edit"></i>
                </el-button>
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
import { ref } from "vue";
import { useCollections, useFormatDate, useStudents } from "@/composables";
import ArgonButton from "@/components/ArgonButton.vue";
import AddEditAsignedCollection from "../components/AddEditAsignedCollection.vue";

export default {
  name: "Collections",
  components: { ArgonButton, AddEditAsignedCollection },
  setup() {
    //instances
    const {
      isLoadingAssignedCollections,
      onChangePage,
      assignedCollections,
      total,
      collectionId,
      getStatusBadge,
      requestGetAssignedCollections,
    } = useCollections();
    const { studentYears } = useStudents();

    const { formatDateDMY, formatDateDMYH } = useFormatDate();

    //refs
    const showModal = ref(false);
    const search = ref("");
    const studentCurrentYear = ref("");

    //methods
    const filter = () => {
      requestGetAssignedCollections({
        take: 10,
        page: 1,
        searchQuery: search.value,
        currentYear: studentCurrentYear.value,
      });
    };

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
        searchQuery: search.value,
        currentYear: studentCurrentYear.value,
      });
    };

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
      search,
      showModal,
      studentYears,
      total,
      studentCurrentYear,
      filter,
    };
  },
};
</script>
