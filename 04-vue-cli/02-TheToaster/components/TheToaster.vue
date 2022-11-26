<template>
 <uiToast v-if="toastList != []" :listForShow="toastList"></uiToast>
</template>

<script>

import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: {UiToast },

  data(){
    return {
      message: undefined,
      toastSuccess: undefined,
      iconType: undefined,
      toastList: []
    };
  },
  methods: {
    success(message){
      this.message = message;
      this.toastSuccess = true;
      this.iconType = 'check-circle';
      this.toastList.push({"message": this.message, 'toastSuccess': this.toastSuccess, 'iconType': this.iconType} )
      setTimeout(() => {
        this.toastList.shift();
      }, 5000);
    },
    error(message){
      this.message = message;
      this.toastSuccess = false;
      this.iconType = 'alert-circle';
      this.toastList.push({"message": this.message, 'toastSuccess': this.toastSuccess, 'iconType': this.iconType} )
      setTimeout(() => {
        this.toastList.shift();
      }, 5000);
    },
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

:deep(.toast) {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

:deep(.toast__icon) {
  margin-right: 12px;
}

:deep(.toast_success) {
  color: var(--green);
}

:deep(.toast_error) {
  color: var(--red);
}
</style>
