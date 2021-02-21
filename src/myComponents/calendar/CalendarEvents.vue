<template>
  <div>
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
        <v-dialog v-model="dialog" max-width="650">
          <v-card>
            <v-container>
              <v-form @submit.prevent="addEvent">
                <v-text-field v-model="name" type="text" label="Názov"></v-text-field>
                <v-text-field v-model="details" type="text" label="Detail"></v-text-field>
                <v-text-field v-model="start" type="date" label="Dátum"></v-text-field>
                <v-time-picker
                    v-model="timeStart"
                    label="Začiatok"
                    format="24hr"
                    min="6:00"
                    max="22:00"
                    :allowed-minutes="allowedStep"
                ></v-time-picker>
                <v-time-picker
                    v-model="timeEnd"
                    label="Koniec"
                    format="24hr"
                    min="6:00"
                    max="22:00"
                    :allowed-minutes="allowedStep"
                ></v-time-picker>
                <v-color-picker
                    dot-size="20"
                    mode="hexa"
                    swatches-max-height="155"
                    v-model="color"
                    label="Farba"
                ></v-color-picker>
                <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">Pridať záznam</v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>
        <v-sheet height="600">
          <v-calendar
              locale="sk"
              :weekdays="weekdays"
              first-interval="7"
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
                <v-btn v-if="currentlyEditing !== selectedEvent.id" icon @click.prevent="editEvent(selectedEvent)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
                <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-spacer>
                </v-spacer>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form v-if="currentlyEditing !== selectedEvent.id">{{ selectedEvent.details }}</form>
                <form v-else>
                  <v-textarea v-model="selectedEvent.details" type="text" style="width: 100%" :min-height="100" placeholder="add note"></v-textarea>
                </form>
              </v-card-text><v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Zavrieť</v-btn>
            </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="fill-height">
      <v-col>
        <v-row>
          <v-col cols="12" sm="12">
            <BaseCard heading="Mesačný prehľad">
              <v-simple-table dense class="border">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">Názov činnosti</th>
                    <th class="text-left">Počet hodín</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in groupedEvents" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.hours }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </BaseCard>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CalendarEvents",

  data: () => ({
    weekdays:[1, 2, 3, 4, 5, 6, 0],
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
    eventsInMonth: [],
    groupedEvents:[],
    dialog: false,
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    allowedStep: m => m % 5 === 0,
    async getEvents(){
      try {
        const { data } = await axios.get('/api/events'); // Fetch the data
        this.events = data.events;
        this.eventsInMonth = [];
        for (let i = 0; i < this.events.length; i++) {
          if ((this.events[i].start.substring(5,7)) === this.focus.substring(5,7)){
            var startDate = new Date(this.events[i].start);
            var endDate   = new Date(this.events[i].end);
            this.eventsInMonth = this.eventsInMonth.concat([{"name" : this.events[i].name, "hours":(endDate-startDate)/1000/3600}]);
          }
        }
        this.sumOfEventsInMonth();
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
        this.name = ''
        this.details = ''
        this.start = ''
        this.timeStart = ''
        this.timeEnd = ''
        this.color = ''
      } else {
        alert('Musíte vyplniť všetky polia!')
      }
    },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },
    async updateEvent (ev) {
      const url = `/api/events/${ev.id}`
      axios.put(url, {
        details: ev.details
      }).catch(err => {
        console.log(err);
      });
      this.selectedOpen = false
      this.currentlyEditing = null
    },
    async deleteEvent (ev) {
      const url = `/api/events/${ev}`
      await axios.delete(url).catch(err => {
        console.log(err);
      });
      this.selectedOpen = false
      this.getEvents()
    },
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
    sumOfEventsInMonth(){
      let sumsArray = {}
      let sums;
      this.eventsInMonth.forEach(item => {
        console.log(item.name)
        sums = sumsArray[item.name]
        if (sums) {
          sums.hours += item.hours
        } else {
          sumsArray[item.name] = {
            name: item.name,
            hours: item.hours
          }
        }
      })
      this.groupedEvents = sumsArray;
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
    for (let i = 0; i < this.events.length; i++) {
      if ((this.events[i].start.substring(5,7)) === this.focus.substring(5,7)){
        var startDate = new Date(this.events[i].start);
        var endDate   = new Date(this.events[i].end);
        this.eventsInMonth = this.eventsInMonth.concat([{"name" : this.events[i].name, "hours":(endDate-startDate)/1000/3600}]);
      }
    }
    this.sumOfEventsInMonth();
  } catch(e) {
    console.error(e);
  }
},
watch: {
  focus: function () {
    this.getEvents();
  }
}
};
</script>
