<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" class="py-0">
        <TheRevenueCards></TheRevenueCards>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TheRevenueCards from "@/views/prehlad/revenue-cards/KartyPrehladu";

export default {
  name: "Prehlad",
  components: {
    TheRevenueCards
  },
  data: () => ({
    page: {
      title: "Prehľad"
    },
    elementVisible: false,
    breadcrumbs: [
      {
        text: "Celkový prehľad",
        disabled: true
      }
    ]
  })
};
</script>
