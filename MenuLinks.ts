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
                name: 'Подтвержденные пользователи',
                url: '/confirmed?is_confirmed=true'
            },
            {
                name: 'Неподтвержденные пользователи',
                url: '/confirmed?is_confirmed=false'
            },
            {
                name: 'Забаненные пользователи',
                url: '/banned'
            },
            {
                name: 'Добавить пользователя',
                url: '/new'
            },
            {
                name: 'Поиск пользователя',
                url: '/search'
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
                name: 'Созданные заказы',
                url: '/created'
            },
            {
                name: 'Подтвержденные заказы',
                url: '/confirmed'
            },
            {
                name: 'Ожидающие оплаты',
                url: '/wfp'
            },
            {
                name: 'Активные заказы',
                url: '/process'
            },
            {
                name: 'Выполненные заказы',
                url: '/completed'
            },
            {
                name: 'Создать заказ',
                url: '/new'
            },
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
                name: 'Товары в продаже',
                url: '/stock'
            },
            {
                name: 'Нет в наличии',
                url: '/out-of-stock'
            },
            {
                name: 'Добавить товар',
                url: '/add'
            }
        ]
    }
]

export default MenuLinks