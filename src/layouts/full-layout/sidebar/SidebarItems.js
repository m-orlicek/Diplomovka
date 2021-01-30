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
                to: 'projekty-osobne',
            },
            {
                icon: 'mdi-school',
                title: 'Katedra',
                to: 'projekty-katedra',
            },
            {
                icon: 'mdi-home',
                title: 'Fakulta',
                to: 'projekty-fakulta',
            },
            {
                icon: 'mdi-home-modern',
                title: 'Univerzita',
                to: 'projekty-univerzita',
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
                to: 'publikacie-osobne',
            },
            {
                icon: 'mdi-school',
                title: 'Katedra',
                to: 'publikacie-katedra',
            },
            {
                icon: 'mdi-home',
                title: 'Fakulta',
                to: 'publikacie-fakulta',
            },
            {
                icon: 'mdi-home-modern',
                title: 'Univerzita',
                to: 'publikacie-univerzita',
            },
        ]
    }
]
