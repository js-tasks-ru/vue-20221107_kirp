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
    inject: {
      pagesNumber: {
        from: 'pagesCount',
        default: 'default value'
      }
    },
  computed:{
     getItemsList: function() {
       let itemsForShow = []
         for(let i=0; i<this.items.length;i++){
        itemsForShow.push(i);
      };
      let chunks = [];
      let start = 0;
      let part = Math.ceil(itemsForShow.length / this.pagesNumber);
       for (let i=0; i <= part; i++){
         let chunk = start + part;
          chunks.push(itemsForShow.slice(start, chunk))
         start = chunk;
       }
       let meetupsForPage = this.page-1;
       return chunks[meetupsForPage];
    }
  },
};
</script>

<style></style>
