import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
   name:'App',
  data() {
     return{
       numberOne: 0,
       numberTwo: 0,
       operator: ''
     }
  },
  computed: {
    total: function () {
      if (this.operator === 'sum') {
        return this.numberOne + this.numberTwo;
      } else if (this.operator === 'subtract') {
        return this.numberOne - this.numberTwo;
      } else if (this.operator === 'multiply') {
        return this.numberOne * this.numberTwo;
      } else if (this.operator === 'divide') {
        return this.numberOne / this.numberTwo;
      } else {
        return 0
      }

     }
  },
});

const app = createApp(App);
const vm = app.mount('#app');
