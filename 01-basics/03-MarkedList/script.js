import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

const App = defineComponent({
   name:'App',
  data() {
    return {
      emails,

      filter: {
        search: ''
      },
      marked: false,
      filteredEmails: []

    }
  },
  watch: {
     filteredEmails: {
       immediate: true,
      handler() {
        this.filteredEmails = this.filterEmails
      }
     }
  },
  computed: {
    markedItem() {
    for (let item of this.filteredEmails) {
      if (this.filter.search.length > 0 && item['email'].toLowerCase().includes(this.filter.search.toLowerCase())){
        item['marked'] = true;
      } else {
        item['marked'] = false;
      }
    }
    return this.filteredEmails;
  },
   filterEmails() {
      let emailsDict = [];
   for (let item of this.emails) {
     emailsDict.push({'email': item, 'marked': false})
   }
   return emailsDict
 }
  }
});

const app = createApp(App);
const vm = app.mount('#app');
