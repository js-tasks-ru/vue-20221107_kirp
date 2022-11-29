<template>
 <uiToast v-if="toastList.length != 0" :listForShow="toastList"></uiToast>
</template>

<script>

import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: {UiToast },

  data(){
    return {
      toastList: []
    };
  },
  methods: {
    success(message){
      this.toastList.push({ message, 'toastSuccess': true, 'iconType': 'check-circle' } )
  setTimeout(() => {
    this.toastList.shift();
  }, 5000);
    },
    error(message){
     this.toastList.push({ message, 'toastSuccess': false, 'iconType': 'alert-circle' } )
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
</style>
