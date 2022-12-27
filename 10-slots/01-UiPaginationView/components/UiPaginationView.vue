<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
<slot v-for="item in getItemsList" :item="items[item]"> </slot>
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
  computed:{
     getItemsList: function() {
       let itemsForShow = []
         for(let i=0; i<this.items.length;i++){
        itemsForShow.push(i);
      };
      let itemsArray = itemsForShow;
      const firstPart = itemsArray.slice(0, this.perPage);
      const secondPart = itemsArray.slice(this.perPage, this.perPage + this.perPage);
      const thirdPart = itemsArray.slice(this.perPage * 2);

      if (this.page == 1) {
        return firstPart;
      } else if (this.page == 2) {
        return secondPart;
      } else {
        return thirdPart;
      }
    }
  }
};
</script>

<style></style>
