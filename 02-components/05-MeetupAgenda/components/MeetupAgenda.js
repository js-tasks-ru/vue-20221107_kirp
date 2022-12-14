import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
 components: {
    MeetupAgendaItem,
  },
  props: {
    agenda: {
      type: Array
    }
  },

  template: `

    <ul class="agenda">
      <li v-for='meetup in agenda' :key="meetup.id" class="agenda__item">
        <!-- meetup agenda item -->
        <MeetupAgendaItem :agenda-item="meetup" />
      </li>
    </ul>`,
});
