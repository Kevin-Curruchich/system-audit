<template>
  <div
    v-show="show"
    class="modal fade"
    :class="[
      { 'show d-block': show },
      { 'd-none': !show },
      { 'modal-mini': type === 'mini' },
    ]"
    tabindex="-1"
    role="dialog"
    :aria-hidden="!show"
    @mousedown.self="closeModal"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="[
        { 'modal-dialog-scrollable': scrollable },
        { 'modal-notice': type === 'notice', [`modal-${size}`]: size },
        modalClasses,
      ]"
    >
      <div
        class="modal-content"
        :class="[
          gradient ? `bg-gradient-${gradient}` : '',
          modalContentClasses,
        ]"
      >
        <div v-if="$slots.header" class="modal-header" :class="[headerClasses]">
          <h6 class="modal-title">
            <slot name="header"> </slot>
          </h6>
          <slot name="close-button">
            <button
              type="button"
              class="btn-close text-dark"
              data-dismiss="modal"
              aria-label="Close"
              @click="onHideModal"
            >
              <span>×</span>
            </button>
          </slot>
        </div>

        <div class="modal-body py-4 px-4" :class="bodyClasses">
          <slot name="body"></slot>
        </div>

        <div v-if="$slots.footer" class="modal-footer" :class="footerClasses">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "",
      validator(value) {
        let acceptedValues = ["", "notice", "mini"];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: 'Modal type (notice|mini|"") ',
    },
    onHideModal: {
      type: Function,
      default: () => {},
    },
    modalClasses: {
      type: [Object, String],
      description: "Modal dialog css classes",
    },
    size: {
      type: String,
      description: "Modal size",
      validator(value) {
        let acceptedValues = ["", "sm", "lg", "xl"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    modalContentClasses: {
      type: [Object, String],
      description: "Modal dialog content css classes",
    },
    gradient: {
      type: String,
      description: "Modal gradient type (danger, primary etc)",
    },
    headerClasses: {
      type: [Object, String],
      description: "Modal Header css classes",
    },
    bodyClasses: {
      type: [Object, String],
      description: "Modal Body css classes",
    },
    footerClasses: {
      type: [Object, String],
      description: "Modal Footer css classes",
      default: "d-flex justify-content-between px-3",
    },
    animationDuration: {
      type: Number,
      default: 500,
      description: "Modal transition duration",
    },
    scrollable: {
      type: Boolean,
      default: false,
      description: "Modal Scrollable",
    },
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add("modal-open");
      } else {
        documentClasses.remove("modal-open");
      }
    },
  },
  methods: {},
};
</script>
<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10000;
}
</style>
