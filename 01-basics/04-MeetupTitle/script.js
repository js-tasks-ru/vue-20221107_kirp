import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = defineComponent({
   name:'App',
  data() {
     return {
       meetupsRange: [1,2,3,4,5],
       MeetUpTitle: 'MEETUP_TITLE',
       meetupSelected: null
     }
  },
  watch: {
    meetupSelected: function() {
      fetchMeetupById(this.meetupSelected).then((meetup) => {
        return this.MeetUpTitle = meetup.title
        }
      )
    }
  }
});

const app = createApp(App);
const vm = app.mount('#app');
