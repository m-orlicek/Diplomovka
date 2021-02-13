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
        nazov: "Prepočítaný finančný prínos zo zdrojov SR (mimo UKF)",
        hodnotenie: 2366.28,
        vaha: 0.91,
        priemer_p: 1149.65,
        priemer_f: 2071.87,
        priemer_t: 2600.3066,
        rok_2017: 5508.88,
        rok_2016: 689,
        rok_2015: 1499.4,
        rok_2014: 1192.89,
        rok_2013: 1171.23,
        rok_2012: 684.84
      },
      {
        poradie: 2,
        nazov: "Prepočítaný finančný prínos z iných zdrojov",
        hodnotenie: 625.12,
        vaha: 0.455,
        priemer_p: 301.36,
        priemer_f: 8883.53,
        priemer_t: 1373.8899,
        rok_2017: 4121.67,
        rok_2016: 0,
        rok_2015: 0,
        rok_2014: 0,
        rok_2013: 11205.6,
        rok_2012: 5017.08
      },
      {
        poradie: 3,
        nazov: "Prepočítaný počet medzinárodných projektov",
        hodnotenie: 0.00,
        vaha: 50,
        priemer_p: 0.06,
        priemer_f: 0.03,
        priemer_t: 0,
        rok_2017: 0,
        rok_2016: 0,
        rok_2015: 0,
        rok_2014: 0,
        rok_2013: 0,
        rok_2012: 0
      },
      {
        poradie: 4,
        nazov: "Prepočítaný počet domácich projektov",
        hodnotenie: 1.57,
        vaha: 10,
        priemer_p: 0.23,
        priemer_f: 0.26,
        priemer_t: 0.1566,
        rok_2017: 0.16,
        rok_2016: 0.05,
        rok_2015: 0.2,
        rok_2014: 0.59,
        rok_2013: 0.37,
        rok_2012: 0.2
      }
    ]
  })
};
</script>
