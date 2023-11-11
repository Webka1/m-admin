export interface IMenuLink {
    name: string,
    is_single: boolean,
    url?: string,
    prefix?: string
    links?: {
        name: string,
        url: string
    }[]
}

export interface IMenuLinks {
    name: string,
    is_single: boolean,
    url?: string,
    prefix?: string
    links?: {
        name: string,
        url: string
    }[]
}