// @ts-ignore
/* eslint-disable */

type ResponseResult<T> = {
  code: number
  data: T
  message?: string
  resultMessage?: string
}
declare namespace API {
  type CurrentUser = {
    name?: string;
    observerId: number
    employeeNo?: string
    departmentId?: number
    departmentName?: string
  };

  type UnLoginResult = {
    appRedirectParameter?: string
    appSecurityUrl?: string
    casLoginUrl?: string
    casServiceParameter?: string
    redirectUrl?: string
  }

  
}
