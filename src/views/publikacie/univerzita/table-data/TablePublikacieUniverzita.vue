<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- TableSimpleDense -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <div class="mt-4">
      <v-simple-table dense class="border">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Ukazovateľ</th>
            <th class="text-left">Hodnotenie</th>
            <th class="text-left">Váha uk.</th>
            <th class="text-left">Priemer pracoviska</th>
            <th class="text-left">Priemer fakulty</th>
            <th class="text-left">Trojročný priemer</th>
            <th class="text-left">2017</th>
            <th class="text-left">2016</th>
            <th class="text-left">2015</th>
            <th class="text-left">2014</th>
            <th class="text-left">2013</th>
            <th class="text-left">2012</th>
            <th class="text-left">Detail ukazovateľa</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in ukazovatele" :key="item.poradie">
            <td>{{ item.poradie }}</td>
            <td>{{ item.nazov }}</td>
            <td>{{ item.hodnotenie }}</td>
            <td>{{ item.vaha }}</td>
            <td>{{ item.priemer_p }}</td>
            <td>{{ item.priemer_f }}</td>
            <td>{{ item.priemer_t }}</td>
            <td>{{ item.rok_2017 }}</td>
            <td>{{ item.rok_2016 }}</td>
            <td>{{ item.rok_2015 }}</td>
            <td>{{ item.rok_2014 }}</td>
            <td>{{ item.rok_2013 }}</td>
            <td>{{ item.rok_2012 }}</td>
            <td>detail</td>
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

  data: () => ({
    ukazovatele: [
      {
        poradie: 1,
        nazov: "Prepočítaný počet publikácií v kat. A2",
        hodnotenie: 845.39,
        vaha: 2536.41,
        priemer_p: 0.20,
        priemer_f: 0.17,
        priemer_t: 0.3333,
        rok_2017: 1,
        rok_2016: 1,
        rok_2015: 0,
        rok_2014: 2.3,
        rok_2013: 2.34,
        rok_2012: 1.5
      },
      {
        poradie: 2,
        nazov: "Prepočítaný počet publikácií vo WoK",
        hodnotenie: 0.00,
        vaha: 1268.21,
        priemer_p: 0.33,
        priemer_f: 0.12,
        priemer_t: 0,
        rok_2017: 0,
        rok_2016: 0,
        rok_2015: 0,
        rok_2014: 0.58,
        rok_2013: 0.34,
        rok_2012: 0
      },
      {
        poradie: 3,
        nazov: "Prepočítaný počet publikácií v Scopus",
        hodnotenie: 0.00,
        vaha: 1268.21,
        priemer_p: 0.30,
        priemer_f: 0.21,
        priemer_t: 0,
        rok_2017: 0,
        rok_2016: 0,
        rok_2015: 0,
        rok_2014: 0,
        rok_2013: 0.34,
        rok_2012: 0
      },
      {
        poradie: 4,
        nazov: "Prepočítaný počet publikácií v kat. D",
        hodnotenie: 0.00,
        vaha: 0,
        priemer_p: 1.48,
        priemer_f: 2.19,
        priemer_t: 0.0500,
        rok_2017: 0.15,
        rok_2016: 0,
        rok_2015: 0,
        rok_2014: 0.58,
        rok_2013: 0.84,
        rok_2012: 1
      }
    ]
  })
};
</script>
