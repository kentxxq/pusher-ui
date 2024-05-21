import type {
  LoginSO,
  LoginRO,
  UpdatePasswordRO,
  User,
  CreateUserRO,
  UpdateUserRoleRO
} from '@/types/pusher/user'
import { HttpMethod } from '@/utils/enums'
import { http } from '@/utils/request'

export function userLoginApi(LoginRO: LoginRO) {
  return http<LoginSO>({
    url: '/User/Login',
    method: HttpMethod.POST,
    data: LoginRO
  })
}

export function userRefreshTokenApi() {
  return http<LoginSO>({
    url: '/User/RefreshToken',
    method: HttpMethod.GET
  })
}

export function userUpdatePasswordApi(updatePasswordRO: UpdatePasswordRO) {
  return http<string>({
    url: '/User/UpdatePassword',
    method: HttpMethod.POST,
    data: updatePasswordRO
  })
}

export function userGetUsersApi() {
  return http<User[]>({
    url: '/User/GetUsers',
    method: HttpMethod.GET
  })
}

export function userDeleteUserApi(userIdList: Array<number>) {
  return http<number>({
    url: '/User/DeleteUser',
    method: HttpMethod.POST,
    data: userIdList
  })
}

export function userCreateUserApi(createUserRO: CreateUserRO) {
  return http<number>({
    url: '/User/CreateUser',
    method: HttpMethod.POST,
    data: createUserRO
  })
}

export function userUpdateUserRoleApi(updateUserRoleRO: UpdateUserRoleRO) {
  return http<string>({
    url: '/User/UpdateUserRole',
    method: HttpMethod.POST,
    data: updateUserRoleRO
  })
}

export function userGetPasswordApi(username: string) {
  return http<string>({
    url: '/User/GetPassword',
    method: HttpMethod.GET,
    params: { username }
  })
}
