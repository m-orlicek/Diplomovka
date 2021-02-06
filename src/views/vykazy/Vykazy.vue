<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard
        >
          <CalendarEvents></CalendarEvents>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Výkazy",

  data: () => ({
    page: {
      title: "Výkazy"
    },
    breadcrumbs: [
      {
        text: "Výkazy",
        disabled: true
      }
    ]
  }),
  components: {
    CalendarEvents: () =>
        import("@/components/vuetifyComponents/calendar/CalendarEvents"),
  }
};
</script>
