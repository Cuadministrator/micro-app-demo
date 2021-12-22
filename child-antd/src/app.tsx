import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import microApp from '@micro-zoe/micro-app'

import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BASE_LISTENER } from './utils/listener/base';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await queryCurrentUser();
      if (res.code === 401 && res.data) {
        const { redirectUrl, appRedirectParameter } = (res.data as API.UnLoginResult)
        window.location.href = redirectUrl + `${encodeURIComponent(
          `?${appRedirectParameter}=${encodeURIComponent(window.location.href)}`,
        )}`
        return undefined
      }
      return (res.data as API.CurrentUser);
    } catch (error) {
      return undefined
    }
  };
  const currentUser = await fetchUserInfo();

  microApp.setGlobalData({
    type: BASE_LISTENER.LOGIN_USER,
    data: currentUser,
  })

  return {
    fetchUserInfo,
    currentUser,
    settings: {},
  };
}
