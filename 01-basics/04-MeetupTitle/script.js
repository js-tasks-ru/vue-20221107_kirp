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
       this.getMeetUpFromApi[this.meetupSelected].then(value => {
             this.MeetUpTitle = value.title
       });
    }

  },
  computed: {
     getMeetUpFromApi() {
       let meetUpsList = {};
       for (let item of this.meetupsRange) {
         let data = fetchMeetupById(item);
         meetUpsList[item] = data;
       }
       return meetUpsList
     }
  }
});

const app = createApp(App);
const vm = app.mount('#app');
