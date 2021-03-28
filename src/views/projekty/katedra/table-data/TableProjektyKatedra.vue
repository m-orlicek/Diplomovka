<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- TableSimpleDense -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Projekt ID</th>
            <th class="text-left">Názov</th>
            <th class="text-left">Začiatok projektu</th>
            <th class="text-left">Koniec projektu</th>
            <th class="text-left">Skratka</th>
            <th class="text-left">Popis</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in zoznam" :key="item.projekt_id">
            <td>{{ item.projekt_id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.month_from }}/{{ item.year_from }}</td>
            <td>{{ item.month_end }}/{{ item.year_end }}</td>
            <td>{{ item.acronym }}</td>
            <td>{{ item.popis }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableSimpleDense",
  props: ['zoznam']
};
</script>
