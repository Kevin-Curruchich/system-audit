<template>
  <modal scrollable :show="showModal" size="lg" :on-hide-modal="onHideModal">
    <template #header>
      {{ `${props.rowSelected ? "Editar" : "Crear"} Trimestre` }}
    </template>
    <template #body>
      <el-form
        ref="formRef"
        v-loading="lockModal"
        label-position="top"
        :model="formModel"
        :rules="rules"
      >
        <div class="row">
          <div class="col-md-6">
            <el-form-item label="Nombre Trimestre" prop="quartetlyName">
              <el-input
                v-model="formModel.quartetlyName"
                placeholder="Nombre Trimestre"
              />
            </el-form-item>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-6">
            <el-form-item label="Fecha Inicio" prop="quartetlyStart">
              <el-date-picker
                v-model="formModel.quartetlyStart"
                placeholder="Fecha Inicio"
                format="DD/MM/YYYY"
                style="width: 100%"
              />
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item label="Fecha Final" prop="quartetlyEnd">
              <el-date-picker
                v-model="formModel.quartetlyEnd"
                placeholder="Fecha Final"
                format="DD/MM/YYYY"
                style="width: 100%"
              />
            </el-form-item>
          </div>
          <div v-if="props.rowSelected" class="col-md-6">
            <el-form-item label="Estado" prop="quartetlyIsActive">
              <el-switch
                v-model="formModel.quartetlyIsActive"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="Activo"
                inactive-text="Inactivo"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </template>
    <template #footer>
      <argon-button variant="outline" @click="onHideModal"
        >Cancelar</argon-button
      >
      <argon-button :loading="lockModal" @click="onSubmit">
        {{ props.rowSelected ? "Editar" : "Agregar" }}
      </argon-button>
    </template>
  </modal>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useQuarters, useFormatDate } from "@/composables";
import { ArgonButton, Modal } from "@/components";
import errorMessages from "@/constants/formErrorMessages";

export default {
  components: {
    Modal,
    ArgonButton,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    rowSelected: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["hidde-modal", "accept-modal"],
  setup(props, { emit }) {
    const requiredMesage = errorMessages.required;
    //instances
    const { requestPostQuarters, requestPutQuarters } = useQuarters();
    const { formatDateYMD } = useFormatDate();

    //refs
    const lockModal = ref(false);
    const formRef = ref(null);
    const formModel = ref({
      quartetlyName: "",
      quartetlyStart: "",
      quartetlyEnd: "",
      quartetlyIsActive: true,
    });

    const rules = ref({
      quartetlyName: [{ required: true, message: requiredMesage }],
      quartetlyStart: [{ required: true, message: requiredMesage }],
      quartetlyEnd: [{ required: true, message: requiredMesage }],
    });

    //methods
    const onHideModal = () => {
      formRef.value.resetFields();
      emit("hidde-modal");
    };

    const onClearData = () => {
      formRef.value.resetFields();
      lockModal.value = false;
    };

    const onSubmit = async () => {
      await formRef.value.validate((isValid) => {
        if (!isValid) return;
        lockModal.value = true;

        formModel.value.quartetlyStart = formatDateYMD(
          formModel.value.quartetlyStart
        );
        formModel.value.quartetlyEnd = formatDateYMD(
          formModel.value.quartetlyEnd
        );

        const data = { ...formModel.value };

        if (props.rowSelected) {
          const id = props.rowSelected.quartetlyId;

          requestPutQuarters({ id, data })
            .then(() => {
              onClearData();
              emit("accept-modal");
            })
            .catch(() => {
              lockModal.value = false;
            });
        } else {
          delete data.quartetlyIsActive;

          requestPostQuarters(formModel.value)
            .then(() => {
              onClearData();
              emit("accept-modal");
            })
            .catch(() => {
              lockModal.value = false;
            });
        }
      });
    };

    //watchers
    watch(
      () => props.rowSelected,
      (value) => {
        if (value) {
          formModel.value.quartetlyName = value.quartetlyName;
          formModel.value.quartetlyStart = value.quartetlyStart;
          formModel.value.quartetlyEnd = value.quartetlyEnd;
          formModel.value.quartetlyIsActive = value.quartetlyIsActive;
        }
      }
    );

    //lifecycle
    onMounted(() => {});

    return {
      formModel,
      formRef,
      onHideModal,
      onSubmit,
      rules,
      lockModal,
      props,
    };
  },
};
</script>

<style></style>
