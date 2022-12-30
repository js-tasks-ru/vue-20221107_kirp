<template>
    <slot name="fulfilled" :result="meetUpFulfilled" v-if ="slotName=='fulfilled'" />
  <slot name="rejected" :error="meetupRejected" v-else-if ="slotName=='rejected'" />
  <slot name="pending" v-else />

</template>

<script>
import {fetchMeetupById} from "../../../02-components/07-PageMeetup/meetupService";

export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },
  data(){
    return {
      meetUpFulfilled: undefined,
      meetupRejected: undefined,
      slotName: 'pending'
    }
  },
  methods:{
    getResult() {
      this.slotName = "pending";
      this.promise.then(
    result => {
      this.slotName = "fulfilled";
      this.meetUpFulfilled = result;
    },
    error => {
      this.slotName = "rejected";
      this.meetupRejected = error;
    }
  );
    }

  },
  watch:{
    promise(){
      this.getResult();
    }
  },
  mounted() {
      this.getResult();
    }
};
</script>
