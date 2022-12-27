<template>

    <ui-input :type="inputType"  v-model="customModel" v-bind="$attrs" :modelModifiers="sendModify">
        <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },
  props: {
    ...UiInput.props,
    type:String,
    modelValue: undefined,
    step: undefined

  },
  inheritAttrs: false,
  data(){
    return{
      dataValue: this.modelValue
    }
  },
  computed: {
    customModel: {
      get() {
        let result;
        if(this.modelValue == null){
          return result = ''
        } else {

        let date = new Date(this.modelValue);
        let hours = String(date.getUTCHours()).padStart(2, "0");
        let minutes = String(date.getUTCMinutes()).padStart(2, "0");
        let seconds = String(date.getUTCSeconds()).padStart(2, "0");
        let inputDate = date.toISOString().split('T')[0];
        let inputDateTime = date.toISOString().split('.')[0];
        if (this.type === 'time' && (this.step != '30' || this.step == undefined)){
        result = hours + ':' + minutes;
      }else if (this.type === undefined || this.inputType == 'date') {
        result = inputDate;
      } else if (this.type === 'time' && this.step === '30') {
        result = hours + ':' + minutes + ':' + seconds;
      } else if (this.type === 'datetime-local'){
       result = inputDateTime;

      }

        return result;
        }
      },

      set(value) {
        if(value.includes(":") && !value.includes("T")){
          value = '1970-01-01T' + value;
        }
        let dateAsNumber = new Date(value+'Z').getTime();
        this.$emit('update:modelValue', dateAsNumber);
      },
    },
    inputType: {
      get() {
        let value = this.type;
         if (this.type == undefined) {
                value = 'date';
              }
        return value;
      },
    },
    sendModify(){
          let modelModify = this.modelModifiers
          if(this.type === 'datetime-local'){
            modelModify.lazy = true;
          }
          return modelModify;
        }
  },
  emits: {
    ...UiInput.emits,
    'update:modelValue': null
  }
};
</script>
