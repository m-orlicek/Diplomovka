<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
          <VykazyCards> </VykazyCards>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Výkazy",

  data: () => ({
    events: [],
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
    VykazyCards: () =>
        import("@/myComponents/vykazy/VykazyCards"),
  }
};
</script>
