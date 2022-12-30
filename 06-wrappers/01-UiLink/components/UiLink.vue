<template>
  <component :is="tag" class="link" v-bind="$attrs" :to="to"><slot></slot></component>
</template>

<script>
export default {
  name: 'UiLink',
  inheritAttrs: false,
  props:{
    tag: {
      default: 'RouterLink'

    },
    to: {
    }
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
