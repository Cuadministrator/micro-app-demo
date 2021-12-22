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
