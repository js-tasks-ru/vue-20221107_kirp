<template>
  <ui-input :type="inputType"  v-model="dataTimeValue" @update:modelValue="$emit('update:modelValue', handleEvent($event))" >
    <template #right-icon>
       <slot name="right-icon" />
    </template>
    <template #left-icon>
       <slot name="left-icon" />
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
  data(){
    return{
      dataTimeValue: undefined,
      inputType: undefined,
      showIcons: false,
      dataValue: this.modelValue,
      inputDate: null,
      inputTime: null
    }
  },
  mounted() {
    let result;
    let date = new Date(this.dataValue);
        let hours = date.getHours();
        let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    this.inputDate = date.toISOString().split('T')[0];
    this.inputTime = date.toISOString().split('T')[1];


      if (this.type === 'time' && this.step === undefined){
        result = hours + ':' + minutes;
        this.inputType = this.type;
      }else if (this.type === undefined && this.step === undefined) {
        this.inputType = 'date';
        result = date.toISOString().split('T')[0];
      } else if (this.type === 'time' && this.step != undefined) {
        this.inputType = this.type;
        result = hours + ':' + minutes + ':' + seconds;
      } else if (this.type === 'datetime-local'){
        this.inputType = this.type;
       result = date.toISOString().split('.')[0];
      }
      this.dataTimeValue = result
    },
  methods:{
    handleEvent(event) {
      let getdate
       let date = event.includes("-");
      let time = event.includes(":")
      let dateTime = event.includes("T");
      if (date && dateTime != true){
        getdate = new Date(event);
        this.inputDate = event
      } else if (time && dateTime != true){
        this.inputTime = event
        getdate = new Date(this.inputDate);
      } else if (dateTime == true){
        getdate = new Date(event);
      }
      this.dataValue = getdate.getTime()
      return getdate.getTime()

    },
  },
  // computed:{
  //   setDataValue(){
  //
  //     let result
  //   let date = new Date(this.dataValue)
  //       let hours = date.getHours()
  //       let minutes = date.getMinutes()
  //   let seconds = date.getSeconds()
  //
  //     if (this.type === 'time' && this.step === undefined){
  //       result = hours + ':' + minutes;
  //       this.inputType = this.type;
  //     }else if (this.type === undefined && this.step === undefined) {
  //       this.inputType = 'date';
  //       result = date.toISOString().split('T')[0];
  //     } else if (this.type === 'time' && this.step != undefined) {
  //       this.inputType = this.type;
  //       result = hours + ':' + minutes + ':' + seconds;
  //     } else if (this.type === 'datetime-local'){
  //       this.inputType = this.type;
  //      result = date.toISOString().split('.')[0];
  //     }
  //     return result
  //   }
  // },
  emits: [...UiInput.emits]


};
</script>
