import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';
import meetups from "../../06-MeetupView/api/meetups";

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
props:{
  meetupId: {
    type: Number
  }
},
  data(){
    return {
      meetUpData: undefined,
      meetUpNotFound: undefined
    }
  },
  methods: {
    geetMeetUpData() {
      this.meetUpData = undefined
      fetchMeetupById(this.meetupId).then((meetup) => {
        this.meetUpData = meetup
        this.meetUpNotFound = undefined
         }).catch((error) => {
        this.meetUpNotFound = error.message
      });
  }
  },
  mounted: function() {
      this.geetMeetUpData()
    },
  watch: {
    meetupId: function() {
      this.geetMeetUpData()
    }
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
       <MeetupView v-if="typeof meetUpData === 'object' && meetUpNotFound == undefined" :meetup="meetUpData" />
      <UiContainer v-else-if="meetUpData == undefined && meetUpNotFound == undefined">
        <UiAlert text="Загрузка..."> </UiAlert>
      </UiContainer>
      <UiContainer v-else-if="meetUpNotFound != undefined">
        <UiAlert :text="meetUpNotFound"></UiAlert>
      </UiContainer>
    </div>`,
});
