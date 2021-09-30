export type UserLoginData = {
  email: string
  password?: string
}

export interface UserData extends UserLoginData {
    name: string
}

export type UserWithToken = {
    user: UserData,
    token: string
}
