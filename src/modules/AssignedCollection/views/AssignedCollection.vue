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
            <div class="col-md-3">
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
            <div class="col-md-3">
              <label class="form-label"> Año estudiante </label>
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
            <div class="col-md-3">
              <label class="form-label"> Trimestre </label>
              <div>
                <el-select v-model="quartetlyId">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in quartersList"
                    :key="item.quartetlyId"
                    :value="item.quartetlyId"
                    :label="item.quartetlyName"
                  />
                </el-select>
              </div>
            </div>
            <div class="col-md-3">
              <div
                class="h-100 d-flex align-items-end justify-content-between px-2"
              >
                <argon-button @click="filter"
                  >Filtrar
                  <i class="fas fa-filter"></i>
                </argon-button>
                <argon-button
                  color="secondary"
                  class="mb-0"
                  :onclick="onDownloadReport"
                  :loading="isDownloadingReportByYear"
                  type="button"
                  name="button"
                  >Descargar
                  <i
                    v-show="!isDownloadingReportByYear"
                    class="fas fa-download mx-2"
                  ></i>
                </argon-button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table
            v-loading="isLoadingAssignedCollections"
            :data="assignedCollections.data"
            border
            size="default"
            row-key="studentId"
          >
            <el-table-column label="Estudiate" min-width="250">
              <template #default="{ row }">
                {{ row.studentFullName }}
              </template>
            </el-table-column>
            <el-table-column label="Cobro" min-width="200">
              <template #default="{ row }">
                {{ row?.collection?.collectionName }}
              </template>
            </el-table-column>
            <el-table-column label="Trimestre" min-width="100">
              <template #default="{ row }">
                {{ row?.Quartetly?.quartetlyName }}
              </template>
            </el-table-column>
            <el-table-column label="Cobro" min-width="100">
              <template #default="{ row }">
                {{
                  `${
                    row?.collectionStudentAmountOwed ||
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
            <el-table-column label="Abonado" min-width="100">
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
            <el-table-column label="Saldo" min-width="100">
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
            <!-- <el-table-column label="Acciones" min-width="100">
              <template #default="{ row }">
                <el-button v-show="row?.collectionStudentId" size="small">
                  <i class="fas fa-edit"></i>
                </el-button>
              </template>
            </el-table-column> -->
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
import { computed, ref } from "vue";
import {
  useCollections,
  useFormatDate,
  useStudents,
  useQuarters,
  useReports,
} from "@/composables";
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

    const {
      isDownloadingReportByYear,
      requestDownloadCollectionHistoryByYear,
    } = useReports();

    const { studentYears } = useStudents();
    const { formatDateDMY, formatDateDMYH } = useFormatDate();
    const { quartersList } = useQuarters();

    const yearSelected = computed(() => {
      const year = studentYears.value.find(
        (item) => item.year === studentCurrentYear.value
      );
      return year ? year.label : "SBG";
    });

    //refs
    const showModal = ref(false);
    const search = ref("");
    const studentCurrentYear = ref("");
    const quartetlyId = ref("");

    //methods
    const filter = () => {
      requestGetAssignedCollections({
        take: 10,
        page: 1,
        searchQuery: search.value,
        currentYear: studentCurrentYear.value,
        quartetlyId: quartetlyId.value,
      });
    };

    const onCloseModal = () => {
      showModal.value = false;
    };

    const onAcceptModal = () => {
      showModal.value = false;
      init();
    };

    const onDownloadReport = () => {
      requestDownloadCollectionHistoryByYear({
        searchQuery: search.value,
        currentYear: studentCurrentYear.value,
        quartetlyId: quartetlyId.value,
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Reporte_${yearSelected.value}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
    };

    const init = () => {
      requestGetAssignedCollections({
        searchQuery: search.value,
        currentYear: studentCurrentYear.value,
        quartetlyId: quartetlyId.value,
        page: 1,
        take: 10,
      });
    };

    return {
      assignedCollections,
      collectionId,
      filter,
      formatDateDMY,
      formatDateDMYH,
      getStatusBadge,
      isLoadingAssignedCollections,
      onAcceptModal,
      onChangePage,
      onCloseModal,
      quartersList,
      quartetlyId,
      search,
      showModal,
      studentCurrentYear,
      studentYears,
      total,
      onDownloadReport,
      isDownloadingReportByYear,
    };
  },
};
</script>
