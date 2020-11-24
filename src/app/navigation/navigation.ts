import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Aplicações',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'exit-page',
                title: 'Página Inicial',
                type: 'item',
                icon: 'input',
                exactMatch: true,
                url: '/dashboard/home-screen'
            },
            {
                id: 'stock-page',
                title: 'Estoque',
                type: 'item',
                icon: 'storage',
                url: '/stock'
            },
            {
                id: 'production-page',
                title: 'Produção',
                type: 'item',
                icon: 'event_note',
                url: '/production'
            },
            {
                id: 'sales-page',
                title: 'Vendas',
                type: 'item',
                icon: 'shopping_cart',
                url: '/sales'
            },
        ]
    },
    {
        id: 'registrations',
        title: 'Cadastros',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'clients-page',
                title: 'Clientes',
                type: 'item',
                icon: 'contact_mail',
                url: '/clients'
            },
            {
                id: 'product-page',
                title: 'Cidades',
                type: 'item',
                icon: 'location_city',
                url: '/city'
            },
            {
                id: 'ingredients-page',
                title: 'Estados',
                type: 'item',
                icon: 'domain',
                url: '/state'
            },
            {
                id: 'ingredients-page',
                title: 'Tipos de Ingredientes',
                type: 'item',
                icon: 'art_track',
                url: '/ingredients'
            },
            {
                id: 'product-page',
                title: 'Tipos de Produtos',
                type: 'item',
                icon: 'list_alt',
                url: '/products'
            },
        ],
    }
];
