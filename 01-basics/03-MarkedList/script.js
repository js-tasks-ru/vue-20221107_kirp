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
      marked: false

    }
  },
  computed: {

   filterEmails() {
      let emailsDict = [];
   for (let item of this.emails) {
     let markedClass = false
           if (this.filter.search.length > 0 && item.toLowerCase().includes(this.filter.search.toLowerCase())){
        markedClass = true;
      }
     emailsDict.push({'email': item, 'marked': markedClass})
   }
   return emailsDict
 }
  }
});

const app = createApp(App);
const vm = app.mount('#app');
