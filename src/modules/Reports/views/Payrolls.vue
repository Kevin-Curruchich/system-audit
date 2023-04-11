<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <!-- <div class="card"> -->
        <!-- Card header -->
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Reporte Planillas</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <!-- <argon-button color="primary" size="lg"> Generar </argon-button> -->
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-5">
              <label class="form-label"> Mes de planilla </label>
              <div class="">
                <el-date-picker
                  v-model="value2"
                  type="month"
                  placeholder="Selecccione mes de planilla"
                />
              </div>
            </div>
            <div class="col-md-5">
              <label class="form-label"> Periodo de pago </label>
              <div>
                <el-select v-model="selectedBranch">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in [{ branchId: '12', branchName: 'Name' }]"
                    :key="item.branchId"
                    :value="item.branchId"
                    :label="item.branchName"
                  >
                    {{ item.branchName }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="h-100 d-flex align-items-end">
                <argon-button color="primary"
                  >Filtrar
                  <i class="fas fa-filter"></i>
                </argon-button>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-5">
              <label class="form-label"> Sede </label>
              <div class="">
                <el-select v-model="selectedBranch">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in [{ branchId: '12', branchName: 'Name' }]"
                    :key="item.branchId"
                    :value="item.branchId"
                    :label="item.branchName"
                  >
                    {{ item.branchName }}
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-md-5">
              <label class="form-label"> Estado pago del empleado </label>
              <div>
                <el-select v-model="selectedBranch">
                  <el-option label="Todos" value=""></el-option>
                  <el-option
                    v-for="item in [{ branchId: '12', branchName: 'Name' }]"
                    :key="item.branchId"
                    :value="item.branchId"
                    :label="item.branchName"
                  >
                    {{ item.branchName }}
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <el-divider />
          <div class="d-lg-flex justify-content-end gap-3">
            <argon-button
              >Exportar Bancos
              <i class="fas fa-piggy-bank"></i>
            </argon-button>
            <argon-button
              >Exportar
              <i class="fas fa-file-export"></i>
            </argon-button>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <el-table>
            <el-table-column label="ID Bonificacion"> </el-table-column>
            <el-table-column label="Sede"> </el-table-column>
            <el-table-column label="Tipo"> </el-table-column>
            <el-table-column label="Fecha"> </el-table-column>
            <el-table-column label="Fecha creacion"> </el-table-column>
            <el-table-column label="Estado"> </el-table-column>
          </el-table>
        </div>
        <div class="mt-4 d-flex justify-content-end">
          <el-pagination background layout="prev, pager, next" :total="1" />
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "PayrollReports",
  components: { ArgonButton },
  data() {
    return {
      selectedBranch: "",
      value2: "",
    };
  },
  mounted() {},
};
</script>

<style>
.el-select {
  width: 100%;
}

.el-date-editor {
  --el-date-editor-width: 100%;
}
</style>
