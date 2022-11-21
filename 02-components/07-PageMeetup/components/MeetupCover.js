import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',
  props: {
    title: {
        type: String
      },
      image: {
        type: String
      }

    },
  computed: {
    backgroundImage(){
      if (this.image != null){
        return '--bg-url: url('+ this.image +')';
      } else {
        return '';
      }

    }
  },

  template: `
    <div class="meetup-cover" :style="backgroundImage">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
