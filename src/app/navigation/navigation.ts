import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Aplicações',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            // {
            //     id: 'administrative-page',
            //     title: 'Administrativo',
            //     translate: 'NAV.ADMINISTRATIVE.TITLE',
            //     type: 'collapsable',
            //     icon: 'dashboard',
            //     children: [
            //         {
            //             id: 'administrative-page',
            //             title: 'Clientes',
            //         
            //             type: 'item',
            //             icon: 'local_shipping',
            //             url: '/admin/shipping-company'
            //         }, {
            //             id: 'factory-page',
            //             title: 'Fabricação',
            //             type: 'item',
            //             icon: 'email',
            //             url: '/admin/factory',
            //         },
            //         {
            //             id: 'user-page',
            //             title: 'Usuários',
            //             type: 'item',
            //             icon: 'person',
            //             url: '/admin/user'
            //         }, {
            //             id: 'vehicle-type',
            //             title: 'Vendas',
            //             type: 'item',
            //             icon: 'local_shipping',
            //             url: '/admin/vehicle-type',
            //         },
            //         {
            //             id: 'driver',
            //             title: 'Estoque',
            //             type: 'item',
            //             icon: 'drive_eta',
            //             url: '/admin/driver',
            //         },
            /*{
               id: 'access-profiles',
               title: 'Perfis de Acesso',
               type: 'item',
               icon: 'email',
               url: '/admin/access-profiles',

           }, */
            // {
            //     id: 'plaque',
            //     title: 'Placas de Veículos e Tanques',
            // 
            //     type: 'item',
            //     icon: 'directions_car',
            //     url: '/admin/plaque'
            // },
            //     ]
            // },
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
