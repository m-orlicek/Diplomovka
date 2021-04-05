<template>
  <div>
    <div class="mt-4">
      <v-data-table
          :headers="headers"
          :items="zoznam"
          :items-per-page="5"
          class="elevation-1"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TablePublikacie",
  props: ['zoznam'],
  data: () => ({
    headers: [
      { text: 'Názov', align: 'start', sortable: false, value: 'nazov'},
      { text: 'Autori', value: 'autori' },
      { text: 'Rok vydania', value: 'rok_vydania' },
      { text: 'Rok vykazovania', value: 'rok_vykazovania' },
      { text: 'Kategória', value: 'kategoria' },
      { text: 'Zdroj', value: 'zdroj' },
      { text: 'Citačný záznam', value: 'citacny_zaznam' },
      { text: 'ISBN', value: 'isbn' },
      { text: 'ISSN', value: 'issn' },
    ],
    preklad: {
      en: { badge: 'Odznak',
        close: 'Zavrieť',
        dataIterator: {
          noResultsText: 'Neboli nájdené žiadne záznamy',
          loadingText: 'Načítavam položky...',
        },
        dataTable: {
          itemsPerPageText: 'Počet riadkov na stránku:',
          ariaLabel: {
            sortDescending: 'Zoradené zostupne.',
            sortAscending: 'Zoradené vzostupne.',
            sortNone: 'Nezoradené.',
            activateNone: 'Aktivujte na zrušenie triedenia.',
            activateDescending: 'Aktivujte na zoradenie zostupne.',
            activateAscending: 'Aktivujte na zoradenie vzostupne.',
          },
          sortBy: 'Zoradiť podľa',
        },
        dataFooter: {
          itemsPerPageText: 'Počet položiek na stránku:',
          itemsPerPageAll: 'Všetko',
          nextPage: 'Ďalšia stránka',
          prevPage: 'Predchádzajúca stránka',
          firstPage: 'Prvá stránka',
          lastPage: 'Posledná stránka',
          pageText: '{0}–{1} z {2}',
        },
        datePicker: {
          itemsSelected: '{0} vybrané',
          nextMonthAriaLabel: 'Ďalší mesiac',
          nextYearAriaLabel: 'Ďalší rok',
          prevMonthAriaLabel: 'Predchádzajúci mesiac',
          prevYearAriaLabel: 'Predchádzajúci rok',
        },
        noDataText: 'Nie sú dostupné žiadne dáta',
        carousel: {
          prev: 'Predchádzajúci obrázok',
          next: 'Další obrázok',
          ariaLabel: {
            delimiter: 'Snímka {0} z {1}',
          },
        },
        calendar: {
          moreEvents: '{0} ďalších',
        },
        fileInput: {
          counter: '{0} súborov',
          counterSize: '{0} súborov ({1} celkom)',
        },
        timePicker: {
          am: 'AM',
          pm: 'PM',
        },
        pagination: {
          ariaLabel: {
            wrapper: 'Navigácia stránkovania',
            next: 'Ďalšia stránka',
            previous: 'Predchádzajúca stránka',
            page: 'Ísť na stránku {0}',
            currentPage: 'Aktuálna stránka, stránka {0}',
          },
        },
        rating: {
          ariaLabel: {
            icon: 'Hodnotenie {0} z {1}',
          },
        },
      }
    }
  }),
  created() {
    this.$vuetify.lang.locales = this.preklad;
  }
};
</script>
