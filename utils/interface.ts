export interface IMenuLink {
    name: string
    is_single: boolean
    url?: string
    prefix?: string
    links?: {
        name: string
        url: string
    }[]
}

export interface IMenuLinks {
    name: string
    is_single: boolean
    url?: string
    prefix?: string
    links?: {
        name: string
        url: string
    }[]
}

export interface ICustomer {
    id: number,
    created_at: string
    user_email: string
    user_firstname: string
    user_lastname: string
    user_birthday: Date
    user_phone: string
    user_city?: string // город юзера необзятельное поле
    user_discount: number // пользовательская скидка)
    user_is_banned: boolean
    user_is_confirmed: boolean // подтвердил чел почту или не)
    user_reg_ip: string
    user_last_ip?: string
    updated_at: string
    registred_date: string
    is_deleted: boolean
}

export interface IOrder {
    id: number
    created_at: Date
    updated_at: Date
    customer_name: string
    customer_email: string
    customer_phone?: string
    purchased_items: JSON

    delivery_city: string
    delivery_district: string
    delivery_house: string
    delivery_floor: string
    delivery_flat: string
    delivery_intercom: string // DOMOFON

    delivery_method: string // pickup | courier | pickup_point
    delivery_status: string // waiting_order_confirm | delivery_process | delivered

    order_status: string // created | confirmed | wait_for_pay | in_process | completed | canceled
    total_order_sum: number // финальная стоимость заказа
}

export interface IItem {
    id: number
}