/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
//  import React, { useEffect, useCallback } from 'react';
import { Link } from 'umi';
//  import Authorized from '@/utils/Authorized';
import RightContent from '@/components/RightContent';
//  import { BASE_LISTENER, getListener } from '@/utils/listener';

import logo from '../assets/logo.svg';
import { useCallback } from '@umijs/renderer-react/node_modules/@types/react';
/**
 * use Authorized check all menu item
 */

//  const menuDataRender = menuList =>
//    menuList.map(item => {
//      const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
//      return Authorized.check(item.authority, localItem, null);
//    });

const footerRender = (_: any) => <></>;

const BasicLayout = (props: any) => {
  const { children, settings } = props;

  const onMenuItemPress = useCallback((path) => {
    console.warn(path)
    window.location.href = path
  }, [])

  return (
    <ProLayout
      logo={logo}
      title="爱回收"
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }

        return <div onClick={() => onMenuItemPress(menuItemProps.path)}>{defaultDom}</div>
        // return <Link to={menuItemProps.path || '/'}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={footerRender}
      //  menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
