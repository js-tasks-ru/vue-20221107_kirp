<script>
import { isVNode } from 'vue';
import { h } from 'vue';
export default {
  name: 'VNode',

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (value) => (Array.isArray(value) ? value.every((item) => isVNode(item)) : isVNode(value)),
    },
  },
  render(){
    if (this.vnode.length > 1){
       const list_elements = [];
    for (let item in this.vnode){
      let vnode = h(this.vnode[item].type, this.vnode[item].props, this.vnode[item].children);
      list_elements.push(vnode);
    }
    return list_elements;

    } else {
          let vnode = h(this.vnode.type, this.vnode.props, this.vnode.children);
    return vnode;
    }


  }
};
</script>
