import { microWindowType } from '@micro-app/types'

type Window = microWindowType

type MicroApp = {
  name: string
  url: string
  macro?: boolean
  inline?: boolean
  destory?: boolean
  baseroute?: string
  shadowDOM?: boolean
  disableScopecss?: boolean
  disableSandbox?: boolean
}

type MicroAppProps = Omit<MicroApp, 'name' | 'url' | 'baseurl'>