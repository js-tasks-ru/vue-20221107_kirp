import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupInfo from './MeetupInfo.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupAgenda,
    MeetupCover,
    MeetupDescription,
    MeetupInfo,


  },
  props: {
    meetup: {
      type: Object,
      required:true

    },
  },
 data(){
    return {
      withoutAgendaDescription: 'Программа пока пуста...'
    }
  },
//   template: `
//     <div>
//       <!-- meetup cover-->
//         <MeetupCover :title="meetup.title" :image="meetup.image" />
//       <ui-container>
//         <div class="meetup">
//           <div class="meetup__content">
//             <h3>Описание</h3>
//             <!-- meetup description -->
//              <MeetupDescription :description="meetup.description" />
//             <h3>Программа</h3>
//             <!-- meetup agenda -->
//             <MeetupAgenda  v-if="meetup.agenda.length"  :agenda="meetup.agenda" />
// <!--            <ui-alert v-else>Программа пока пуста...</ui-alert>-->
//                 <UiAlert v-else-if="!meetup.agenda.length" :text="withoutAgendaDescription"/>
//           </div>
//           <div class="meetup__aside">
//             <!-- meetup info -->
//             <MeetupInfo  :date="meetup.date" :organizer="meetup.organizer" :place="meetup.place" />
//           </div>
//         </div>
//       </ui-container>
//     </div>`,
  template: `
  <div> {{ meetup }}</div>
  `
});
