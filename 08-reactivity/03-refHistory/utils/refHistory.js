import { ref, watchEffect, watch} from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  let history_values = [];
  watch(
  source,
  (newValue, oldValue) => {
    history_values.push(newValue);
  },
  {
    immediate: true,
    flush: 'sync'
  },
);
const history = ref(history_values);
  return { history };
}


