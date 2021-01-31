export default [
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
            {
                icon: 'mdi-home-modern',
                title: 'Univerzita',
                to: 'univerzita',
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
            {
                icon: 'mdi-home-modern',
                title: 'Univerzita',
                to: 'univerzita',
            },
        ]
    },
    {
        group: '/aplikacie',
        model: false,
        icon: 'mdi-apps',
        title: 'Aplikácie',
        children: [
            {
                icon: 'mdi-calendar',
                title: 'Kalendár',
                to: 'kalendar',
            },
        ]
    },
]
