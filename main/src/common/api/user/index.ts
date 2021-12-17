import Http from "../../request/instance"

export const getCurrentUser = () => Http({
  url: `/erp-gateway/get-login-user`,
  method: 'GET',
})
