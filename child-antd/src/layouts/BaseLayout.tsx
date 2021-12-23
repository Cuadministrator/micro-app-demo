/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import { useMemo, useCallback } from 'react'
import ProLayout from '@ant-design/pro-layout';
//  import React, { useEffect, useCallback } from 'react';
import { Link, history } from 'umi';
//  import Authorized from '@/utils/Authorized';
import RightContent from '@/components/RightContent';
//  import { BASE_LISTENER, getListener } from '@/utils/listener';
import microApp from '@micro-zoe/micro-app'

import microAppConfigs from '../pages/config'

import logo from '../assets/logo.svg';
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

  const microAppNames = useMemo(() =>
    Object.values(microAppConfigs).map(item => item.name),
    [],
  )

  const onMenuItemPress = useCallback((path) => {
    const base = path.split('/')[1]
    const pathname = window.location.pathname
    if (
      pathname.indexOf(base) > -1 &&
      microAppNames.includes(base)
    ) {
      microApp.setData(base, {
        type: 'ROUTE_PUSH',
        data: path,
      })
    } else {
      history.push(path)
    }
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
