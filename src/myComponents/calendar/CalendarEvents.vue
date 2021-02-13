<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn color="#28b8ce" rounded dark @click.stop="dialog = true">Pridať záznam</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Dnes</v-btn>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Deň</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Týždeň</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mesiac</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="Názov"></v-text-field>
              <v-text-field v-model="details" type="text" label="Detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="Dátum"></v-text-field>
              <v-text-field v-model="timeStart" type="time" label="Začiatok"></v-text-field>
              <v-text-field v-model="timeEnd" type="time" label="Koniec"></v-text-field>
              <v-text-field v-model="color" type="color" label="Farba"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">Pridať záznam</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <v-sheet height="600">
        <v-calendar
            locale="sk"
            first-interval="7"
            show-week="true"
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" :width="350" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">{{ selectedEvent.details }}</form>
              <form v-else>
                <v-textarea v-model="selectedEvent.details" type="text" style="width: 100%" :min-height="100" placeholder="add note"></v-textarea>
              </form>
            </v-card-text><v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">Zavrieť</v-btn>
            <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">Upraviť</v-btn>
            <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">Uložiť</v-btn>
          </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "CalendarEvents",

  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Mesiac',
      week: 'Týždeň',
      day: 'Deň',
    },
    name: null,
    start: null,
    details: null,
    timeStart: null,
    timeEnd: null,
    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
  }),
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)

      const startYear = start.year

      const startDay = start.day + this.nth(start.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    async getEvents(){
      try {
        const { data } = await axios.get('/api/events'); // Fetch the data
        this.events = data.events;
      } catch(e) {
        console.error(e);
      }
    },
    async addEvent () {
      if (this.name && this.start && this.timeEnd && this.timeStart) {
        try {
          const { data } = await axios.post('/api/events', { data: {
              name: this.name,
              details: this.details,
              start: this.start + " " + this.timeStart,
              end: this.start + " " + this.timeEnd,
              color: this.color
            } });
          this.events.push(data);
        } catch(e) {
          console.error(e);
        }
        await this.getEvents()
        this.name = '',
            this.details = '',
            this.start = '',
            this.timeStart = '',
            this.timeEnd = '',
            this.color = ''
      } else {
        alert('Musíte vyplniť všetky polia!')
      }
    },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },/*
    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details
      })
      this.selectedOpen = false,
          this.currentlyEditing = null
    },
    async deleteEvent (ev) {
      await db.collection("calEvent").doc(ev).delete()
      this.selectedOpen = false,
          this.getEvents()
    },*/
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },/*
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        })
      }

      this.start = start
      this.end = end
      this.events = events
    },*/
    nth (d) {
      return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    formatDate (a, withTime) {
      return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    },
  },
  async created() {
    try {
      const { data } = await axios.get('/api/events'); // Fetch the data
      this.events = data.events;
    } catch(e) {
      console.error(e);
    }
  }
};
</script>
