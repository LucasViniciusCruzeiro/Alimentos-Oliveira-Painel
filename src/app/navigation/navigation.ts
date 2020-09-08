import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Aplicações',
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
                        url: '/admin/shipping-company'
                    }, {
                        id: 'factory-page',
                        title: 'Fábricas',
                        type: 'item',
                        icon: 'email',
                        url: '/admin/factory',
                    },
                    {
                        id       : 'user-page',
                        title    : 'Usuários',
                        type     : 'item',
                        icon     : 'person',
                        url      : '/admin/user'
                    }, {
                        id: 'vehicle-type',
                        title: 'Tipo de Veículos',
                        type: 'item',
                        icon: 'local_shipping',
                        url: '/admin/vehicle-type',
                    },
                    {
                        id: 'driver',
                        title: 'Motoristas',
                        type: 'item',
                        icon: 'drive_eta',
                        url: '/admin/driver',
                    }, /*{
                        id: 'access-profiles',
                        title: 'Perfis de Acesso',
                        type: 'item',
                        icon: 'email',
                        url: '/admin/access-profiles',

                    }, */{
                        id: 'plaque',
                        title: 'Placas de Veículos e Tanques',
                        translate: 'NAV.ADMINISTRATIVE.SHIPPING.TITLE',
                        type: 'item',
                        icon: 'directions_car',
                        url: '/admin/plaque'
                    },
                ]
            }
        ]
    }
];
