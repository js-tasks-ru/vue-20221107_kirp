import { defineComponent } from './vendor/vue.esm-browser.js';
import CounterButton from './CounterButton.js';

export default defineComponent({
  name: 'App',

  components: {
    CounterButton,
  },

  data() {
    return {
      count: undefined,
    };
  },

  template: `
    <div class="sample container">
      <p>count = {{ count }}</p>
      <p>
        <CounterButton :count="count" @update:count="count = $event"  @update="count" />
      </p>
      <p>
        <CounterButton v-model:count="count" @update:count="count = $event"  @update="count" ></CounterButton>
      </p>
      <p>
        <CounterButton v-model:count="count" @update:count="count = $event"  @update="count"></CounterButton>
      </p>
    </div>
  `,
});
