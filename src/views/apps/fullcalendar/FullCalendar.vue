<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
          <CalendarEvents></CalendarEvents>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Calendar",

  data: () => ({
    page: {
      title: "Môj kalendár"
    },
    breadcrumbs: [
      {
        text: "Aplikácie",
        disabled: true
      },
      {
        text: "Môj kalendár",
        disabled: true
      }
    ]
  }),
  components: {
    CalendarEvents: () =>
      import("@/components/vuetifyComponents/calendar/CalendarEvents")
  }
};
</script>
