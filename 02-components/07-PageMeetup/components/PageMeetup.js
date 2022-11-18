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
      isLoading: true,
      meetUpNotFound: 'Not found'
    }
  },
  mounted: function() {
    this.isLoading = true
      fetchMeetupById(this.meetupId).then((meetup) => {
        this.meetUpData = meetup
         }).catch((error) => {
        this.meetUpData = error
      });
      this.isLoading = false
    },
  watch: {
    meetupId: function() {
      this.isLoading = true
      fetchMeetupById(this.meetupId).then((meetup) => {
        this.meetUpData = meetup
         }).catch((error) => {
        this.meetUpData = error.message
      });
      this.isLoading = false
    }
  },
  template: `
    <div class="page-meetup">
      <!-- meetup view -->
       <MeetupView v-if="typeof meetUpData === 'object'" :meetup="meetUpData" />
      <UiContainer v-else-if="isLoading == true">
        <UiAlert text="Загрузка"> </UiAlert>
      </UiContainer>

      <UiContainer v-else-if="meetUpData == meetUpNotFound">
        <UiAlert text="Возникла ошибка: такого митапа нет"></UiAlert>
      </UiContainer>
    </div>`,
});
