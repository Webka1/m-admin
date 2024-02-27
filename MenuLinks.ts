import { IMenuLinks } from "@/utils/interface";

const MenuLinks: IMenuLinks[] = [
    {
        name: 'Главная',
        is_single: true,
        url: '/dashboard',
    },
    {
        name: 'Настройки АИС',
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
                url: '/confirmed'
            },
            {
                name: 'Неподтвержденные пользователи',
                url: '/unconfirmed'
            },
            {
                name: 'Забаненные пользователи',
                url: '/banned'
            },
            {
                name: 'Удаленные пользователи',
                url: '/deleted'
            },
            {
                name: 'Поиск пользователя',
                url: '/search'
            },
            {
                name: 'Добавить пользователя',
                url: '/new'
            },
        ]
    },
    {
        name: 'Интернет-заказы',
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
                name: 'Рецептурные',
                url: '/recipe'
            },
            {
                name: 'Добавить товар',
                url: '/add'
            }
        ]
    },
    {
        name: 'Cклад',
        is_single: false,
        prefix: '/storage',
        links: [
            {
                name: 'Список складов',
                url: '/all'
            },
            {
                name: 'Добавить склад',
                url: '/new'
            },
        ]
    },
    {
        name: 'Поставки',
        is_single: false,
        prefix: '/arrivals',
        links: [
            {
                name: 'Все поставки',
                url: '/all'
            },
            {
                name: 'Новые поставки',
                url: '/new'
            },
            {
                name: 'Непринятые поставки',
                url: '/notaccepted'
            },
            {
                name: 'Приемка поставки',
                url: '/acceptance'
            },
        ]
    },
    {
        name: 'Продажи',
        is_single: false,
        prefix: '/sales',
        links: [
            {
                name: 'Все продажи',
                url: '/all',
            },
            {
                name: 'Новая продажа',
                url: '/new'
            },
        ]
    }
]

export default MenuLinks