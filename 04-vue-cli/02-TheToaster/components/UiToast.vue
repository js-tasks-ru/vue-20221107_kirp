
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
.toast {
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

.toast__icon {
  margin-right: 12px;
}

.toast_success {
  color: var(--green);
}

.toast_error {
  color: var(--red);
}
</style>
