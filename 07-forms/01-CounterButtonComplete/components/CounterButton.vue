<template>
  <button type="button" @click="update"> {{ dataCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props:{
    count:{
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      dataCount: this.count
    }
    },
  watch: {
     count:{
       handler(newValue) {
        this.dataCount = newValue;
      },
      deep: true,
      immediate: true
     },
  },
  methods: {
    update(){
      this.$emit('update:count', this.dataCount += 1 );

    },
  }
};
</script>
