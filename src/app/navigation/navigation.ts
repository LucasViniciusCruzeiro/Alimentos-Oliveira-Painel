import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'administrative-page',
                title: 'Administrativo',
                translate: 'NAV.ADMINISTRATIVE.TITLE',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'administrative-page',
                        title: 'Trasportadora',
                        translate: 'NAV.ADMINISTRATIVE.SHIPPING.TITLE',
                        type: 'item',
                        icon: 'local_shipping',
                        url: '/auth/admin/shipping-company'
                    }, {
                        id: 'factory-page',
                        title: 'Fábricas',
                        type: 'item',
                        icon: 'email',
                        url: '/auth/admin/factory',
                    },
                    {
                        id: 'user-page',
                        title: 'Usuários',
                        type: 'item',
                        icon: 'person',
                        url: '/auth/admin/user'
                    }, {
                        id: 'vehicle-type',
                        title: 'Tipo de Veículos',
                        type: 'item',
                        icon: 'local_shipping',
                        url: '/auth/admin/vehicle-type',
                    },
                    {
                        id: 'driver',
                        title: 'Motoristas',
                        type: 'item',
                        icon: 'drive_eta',
                        url: '/auth/admin/driver',
                    },
                    {
                        id: 'checklistItem',
                        title: 'Itens do CheckList',
                        type: 'item',
                        icon: 'assignment',
                        url: '/auth/admin/checklistItem',
                    }, /*{
                        id: 'access-profiles',
                        title: 'Perfis de Acesso',
                        type: 'item',
                        icon: 'email',
                        url: '/auth/admin/access-profiles',

                    }, */{
                        id: 'plaque',
                        title: 'Placas de Veículos e Tanques',
                        type: 'item',
                        icon: 'directions_car',
                        url: '/auth/admin/plaque'
                    },
                ]
            },
            {
                id: 'operation-page',
                title: 'Operação',
                translate: 'NAV.OPERATION.TITLE',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'operation-page',
                        title: 'Forecast',
                        type: 'item',
                        icon: 'local_shipping',
                        url: '/auth/operation/forecast'
                    }
                ]
            },
            {
                id: 'logout-page',
                title: 'Sair',
                translate: 'NAV.LOGOUT.TITLE',
                type: 'item',
                icon: 'exit_to_app',
                url: '/not-auth/logout'
            }
        ]
    }
];
