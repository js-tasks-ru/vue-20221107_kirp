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
      meetUpData: '',
      isMeetUpUpdated: false
    }
  },
  computed: {
    getMeetUpData: function() {
      fetchMeetupById(this.meetupId).then((meetup) => {
        console.log(meetup)
        this.meetUpData = meetup
         }).catch((error) => {
        this.meetUpData = null
      });
      return this.meetUpData;
    }
  },
  watch: {
    deep: true,
    immediate:true,
    meetUpData: function(newVal, oldVal){
      if (newVal == oldVal){
        return this.isMeetUpUpdated = false
      } else {
        return this.isMeetUpUpdated = true
      }

    }
  },
  template: `
    <div class="page-meetup">
      <!-- meetup view -->
       <MeetupView v-if="typeof meetUpData === 'object' && meetUpData!=null " :meetup="meetUpData" />
      <UiContainer v-else-if="isMeetUpUpdated==false">
        <UiAlert text="Загрузка"> </UiAlert>
      </UiContainer>

      <UiContainer v-else-if="meetUpData==null">
        <UiAlert text="Возникла ошибка: такого митапа нет"></UiAlert>
      </UiContainer>
    </div>`,
});
