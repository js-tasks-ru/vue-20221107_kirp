
<template>
   <div class="toasts">
    <div v-for="item in listForShow" class="toast"  :class="{toast_success: item['toastSuccess'], toast_error: !item['toastSuccess']}">
      <ui-icon class="toast__icon" :icon="item['iconType']" />
      <span> {{ item['message'] }}</span>
    </div>
       </div>

</template>


<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',
  components: { UiIcon},
  props: ['listForShow']
  }
</script>
<style>
.toast + .toast{
  margin-top: 20px;
}
</style>
