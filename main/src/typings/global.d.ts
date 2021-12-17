import { microWindowType } from '@micro-app/types'

type Window = microWindowType

type MicroAppProps = {
  name: string
  url: string
  data?: Object
  macro?: boolean
  inline?: boolean
  destory?: boolean
  baseroute?: string
  shadowDOM?: boolean
  disableScopecss?: boolean
  disableSandbox?: boolean
}

type LoginUser = {
  name: string
  observerId: number
  employeeNo: string
  departmentId: number | null
  departmentName: string | null
}

interface ApiResponse<T> {
  code: number
  data?: T
  msg: string
  originHeaders?: object
}

declare interface IApiResponse<T> {
  code: number
  data: T | null
  msg: string
  totalCount?: number
  pageIndex?: number
  pageSize?: number
}