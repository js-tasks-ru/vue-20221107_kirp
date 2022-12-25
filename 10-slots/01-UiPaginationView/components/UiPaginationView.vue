<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
<slot v-for="item in itemsForShow" :item="localItem[item]"> item </slot>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    }
  },
  data(){
    return {
      localItem: {...this.items},
      itemsForShow: [0,1]
    }
  },
  watch:{
     page: function() {
      if (this.page == 1) {
        return this.itemsForShow = [0, 1];
      } else if (this.page == 2) {
        return this.itemsForShow = [2, 3];
      } else {
        return this.itemsForShow = [4];
      }
    }
  }
};
</script>

<style></style>
