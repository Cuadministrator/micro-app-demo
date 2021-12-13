import { observable, action, configure } from 'mobx'

import { LoginUser } from '../typings/global'

configure({
  enforceActions: 'observed',
})

class Global {
  @observable loginUser?: LoginUser = undefined

  @action
  changeLoginUser (value: LoginUser) {
    this.loginUser = value
  }
}

export default Global
