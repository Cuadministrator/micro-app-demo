import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  title: '爱回收',
  pwa: false,
  logo: 'https://sr.aihuishou.com/c2b/zy-fe/public/micro-app/logo.svg',
  iconfontUrl: '',
};

export default Settings;
