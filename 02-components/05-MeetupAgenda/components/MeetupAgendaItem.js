import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  components:{
    agendaItemIcons,
    agendaItemDefaultTitles
  },
  data(){
    return {
      itemDefaultTitles: agendaItemDefaultTitles,
      itemIcons: agendaItemIcons
    }
  },
  props: {
   agendaItem: {
     type: Object,
     required: true
   }
    },
    methods:{
    getTitle: function() {
      return this.itemDefaultTitles[this.agendaItem.type];
     },
     getIcon: function() {
      let iconUrl = "/assets/icons/icon-" + this.itemIcons[this.agendaItem.type] + ".svg";
      console.log(iconUrl)
      return iconUrl
     }
    },
  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="getIcon()" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title" v-if="agendaItem.title != null">{{ agendaItem.title }}</h3>
        <h3 class="agenda-item__title" v-else>{{ getTitle() }}</h3>
        <p class="agenda-item__talk" v-if="agendaItem.type == 'talk'">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description != null">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
