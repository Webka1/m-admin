import {ICustomer} from "@/utils/interface";

export type DarkThemeSwitcherProps = {
    variant: string
}
export type TSearchParams = {
    searchParams: { [key: string]: string | string[] | undefined }
}
export type TBanUser = {
    uid: number,
    is_banned: string,
    setFromBanButton?: any
    setFromUserTable?: any
}
export type TDeleteUser = {
    uid: number,
    is_deleted: boolean,
    setFromBanButton?: any
    setFromUserTable?: any
}
export type TUserTable = {
    customers: ICustomer[]
    setFromUserTable? : any
}