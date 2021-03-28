export default [
    {
        icon: 'mdi-view-dashboard',
        title: 'Prehľad',
        to: '/prehlad'
    },
    {
        group: '/projekty',
        model: false,
        icon: 'mdi-clipboard-text',
        title: 'Projekty',
        children: [
            {
                icon: 'mdi-account',
                title: 'Osobné',
                to: 'osobne',
            },
            {
                icon: 'mdi-school',
                title: 'Katedra',
                to: 'katedra',
            },
            {
                icon: 'mdi-home',
                title: 'Fakulta',
                to: 'fakulta',
            },
        ]
    },
    {
        group: '/publikacie',
        model: false,
        icon: 'mdi-book-open',
        title: 'Publikácie',
        children: [
            {
                icon: 'mdi-account',
                title: 'Osobné',
                to: 'osobne',
            },
            {
                icon: 'mdi-school',
                title: 'Katedra',
                to: 'katedra',
            },
            {
                icon: 'mdi-home',
                title: 'Fakulta',
                to: 'fakulta',
            },
        ]
    },
    {
        icon: 'mdi-calendar-clock',
        title: 'Výkazy',
        to: '/vykazy'
    }
]
