import {IMenuLinks} from "@/utils/interface";

const MenuLinks:IMenuLinks[] =   [
    {
        name: 'Главная',
        is_single: true,
        url: '/dashboard',
    },
    {
        name: 'Настройки сайта',
        is_single: true,
        url: '/dashboard/site-settings'
    },
    {
        name: 'Пользователи',
        is_single: false,
        prefix: '/customers',
        links: [
            {
                name: 'Все пользователи',
                url: '/'
            },
            {
                name: 'Добавить пользователя',
                url: '/new'
            }
        ]
    },
    {
        name: 'Заказы',
        is_single: false,
        prefix: '/orders',
        links: [
            {
                name: 'Все заказы',
                url: '/'
            },
            {
                name: 'Создать заказ',
                url: '/new'
            }
        ]
    },
    {
        name: 'Товары',
        is_single: false,
        prefix: '/items',
        links: [
            {
                name: 'Все товары',
                url: '/'
            },
            {
                name: 'Добавить товар',
                url: '/add'
            }
        ]
    }
]

export default MenuLinks