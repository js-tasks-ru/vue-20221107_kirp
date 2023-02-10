<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="getPreviousMonthsDaysList"></button>
        <div class="calendar-view__date">{{dateTitle}}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="getNextMonthsDaysList"></button>
      </div>
    </div>
    <div class="calendar-view__grid" >
      <div class="calendar-view__cell calendar-view__cell_inactive" :tabindex="day" v-for="day in daysPreviousMonth">
        <div class="calendar-view__cell-day">{{ day }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <div class="calendar-view__cell" :tabindex="day" v-for="(data, day) in daysCurrentMonth">
        <div class="calendar-view__cell-day">{{ day }}</div>
        <div class="calendar-view__cell-content" v-if="data.length > 0">
          <a :href="`/meetups/${day}`" class="calendar-event" v-for="meetup in data">{{ meetup.title }}</a>
        </div>
      </div>
      <div class="calendar-view__cell calendar-view__cell_inactive" :tabindex="day" v-for="day in daysNextMonth">
        <div class="calendar-view__cell-day">{{ day }}</div>
        <div class="calendar-view__cell-content"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      date: new Date(),
      daysPreviousMonth: [],
      daysCurrentMonth: [],
      daysNextMonth: [],
      currentMonth: undefined,
      previousMonth: undefined,
      nextMonth: undefined,
      currentYear: undefined,
    };
  },
  methods: {
  getCurrentMonthsDaysList(){
      let currYear = this.date.getFullYear();
      let currMonth = this.date.getMonth();
      this.currentYear = currYear;
      this.currentMonth = currMonth;
      this.previousMonth = new Date(currYear, currMonth, 0).getMonth();
      this.nextMonth = new Date(currYear, currMonth, 32).getMonth();
      let firstDate = new Date(currYear, currMonth, 1);
      let firstDateDay = firstDate.getUTCDay();
      let lastDate = new Date(currYear, currMonth + 1, 0);
      let lastDateDay = lastDate.getUTCDay();
      let numDays = lastDate.getDate();
      let daysPreviousMonth = [];

      for (let step = firstDateDay; step > 0; step--) {
        let date = new Date(currYear, currMonth, -step + 1).getDate();
        daysPreviousMonth.push(date);
      }
      this.daysPreviousMonth = daysPreviousMonth;

      let daysNextMonth = [];
      let startDayNum = 1;

      for (let step = lastDateDay; step < 6; step++) {
        let date = new Date(currYear, currMonth, startDayNum).getDate();
        startDayNum++;
        daysNextMonth.push(date);
      }
      this.daysNextMonth = daysNextMonth;
      let daysCurrentMonth = {};
      for (let step = 1; step <= numDays; step++) {
        let date = new Date(currYear, currMonth, step).getDate();
        daysCurrentMonth[date] = [];
      }
      this.daysCurrentMonth = daysCurrentMonth;
      this.getMeetUpsForShow();
    },

    getPreviousMonthsDaysList() {
      this.date = new Date(this.currentYear, this.currentMonth,0);
      this.getCurrentMonthsDaysList();

    },
     getNextMonthsDaysList() {
      this.date = new Date(this.currentYear, this.currentMonth + 1,1);
      this.getCurrentMonthsDaysList();

    },
    getMeetUpsForShow(){
     for (let i in this.meetups){
       let meetupDate = new Date(this.meetups[i].date);
       let meetupMonth = meetupDate.getMonth();
       let meetupYear = meetupDate.getFullYear();
       if(meetupMonth == this.currentMonth && meetupYear == this.currentYear){
         this.daysCurrentMonth[meetupDate.getDate()].push(this.meetups[i]);
       }
     }
    }

  },
  watch:{
    daysPreviousMonth(newVal, oldVal){
      if (oldVal.length > 0 && newVal != oldVal){
        this.daysPreviousMonth = newVal;
      }
    },
     daysNextMonth(newVal, oldVal){
      if (oldVal.length > 0 && newVal != oldVal){
        this.daysNextMonth = newVal;
      }
    },
    daysCurrentMonth(newVal, oldVal){
      if (oldVal.length > 0 && newVal != oldVal){
        this.daysCurrentMonth = newVal;
      }
    }
  },
  computed:{
    dateTitle: function () {
      let title = this.date.toLocaleDateString(navigator.language, {
  month: 'long',
  year: 'numeric',
})
      return title
    }
  },
  created() {
      this.getCurrentMonthsDaysList()
    }
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
