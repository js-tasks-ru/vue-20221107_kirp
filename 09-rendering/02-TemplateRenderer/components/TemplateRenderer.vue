<script>
import { compile } from 'vue';
import alias from '@rollup/plugin-alias';


export default {
  name: 'TemplateRenderer',
  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
    plugins: [
    alias({
      entries: [
        {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
      ],
    }),
  ],
render() {
    const renderFunction = compile(this.template);
    return compile(this.template);
  },
};
</script>
