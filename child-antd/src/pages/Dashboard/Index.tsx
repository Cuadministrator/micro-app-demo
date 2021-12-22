import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card'

export default (): React.ReactNode => {
  return (
    <PageHeaderWrapper
      content='仪表盘'
    >
      <ProCard wrap gutter={8} ghost>
        <ProCard
          bordered
          hoverable
          headerBordered
          layout="center"
          title="AMP后台管理系统"
          style={{maxWidth: 300, height: 200}}
          onClick={() => {
            window.location.href = '/ampPortal/amp/mp-list'
          }}
        >
          description
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};
