export type User = {
  id: number,
  last_login?: string,
  is_superuser: boolean,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  is_stuff: boolean,
  is_active: boolean,
  date_joined: string,
  user_type: string,
  phone: string,
  description: string,
  date_birth: string,
  discount: string,
}

export type UserRegistrationRequest = {
  password: string,
  password_confirm: string,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  description?: string,
  date_birth: string,
  history: any,
}

export type UserLoginRequest = {
  username: string,
  password: string,
}

export type UserLoginResponse = {
  Token: string,
}