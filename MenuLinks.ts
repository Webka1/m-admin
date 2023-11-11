import {IMenuLinks} from "@/utils/interface";

const MenuLinks:IMenuLinks[] =   [
    {
        name: 'Главная',
        is_single: true,
        url: '/dashboard'
    },
    {
        name: 'Настройки сайта',
        is_single: true,
        url: '/dashboard/site-settings'
    },
    {
        name: 'Пользователи',
        is_single: false,
        links: [
            {
                name: 'Все пользователи',
                url: '/dashboard/customers/'
            },
            {
                name: 'Добавить пользователя',
                url: '/dashboard/customers/new'
            }
        ]
    },
    {
        name: 'Заказы',
        is_single: false,
        links: [
            {
                name: 'Все заказы',
                url: '/dashboard/orders/'
            },
            {
                name: 'Создать заказ',
                url: '/dashboard/orders/new'
            }
        ]
    },
    {
        name: 'Товары',
        is_single: false,
        links: [
            {
                name: 'Все товары',
                url: '/dashboard/items/'
            },
            {
                name: 'Добавить товар',
                url: '/dashboard/items/add'
            }
        ]
    }
]

export default MenuLinks