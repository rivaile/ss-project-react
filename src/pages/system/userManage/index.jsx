import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryUserList,queryRule } from './service';

const UserList = () =>{
    const [sorter, setSorter] = useState('');

    const columns = [
        {
          title: '用户名',
          dataIndex: 'username'
        //   rules: [
        //     {
        //       required: true,
        //       message: '规则名称为必填项',
        //     },
        //   ],
        },
        {
          title: '电话',
          dataIndex: 'telephone'
        },
        {
            title: '邮箱',
            dataIndex: 'mail'
          },
          
        {
          title: '部门名称',
          dataIndex: 'deptId',
          sorter: true,
          hideInForm: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          hideInForm: true,
          valueEnum: {
            0: {
              text: '关闭',
              status: 'Default',
            },
            1: {
              text: '运行中',
              status: 'Processing',
            },
            2: {
              text: '已上线',
              status: 'Success',
            },
            3: {
              text: '异常',
              status: 'Error',
            },
          },
        },
        {
          title: 'remark',
          dataIndex: 'remark',
          sorter: true,
          hideInForm: true,
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            sorter: true,
            hideInForm: true,
          },

          {
            title: '操作时间',
            dataIndex: 'operateTime',
            sorter: true,
            valueType: 'dateTime',
            hideInForm: true,
          },

        // {
        //   title: '操作',
        //   dataIndex: 'option',
        //   valueType: 'option',
        //   render: (_, record) => (
        //     <>
        //       <a
        //         onClick={() => {
        //           handleUpdateModalVisible(true);
        //           setStepFormValues(record);
        //         }}
        //       >
        //         配置
        //       </a>
        //       <Divider type="vertical" />3
        //       <a href="">订阅警报</a>
        //     </>
        //   ),
        // },
      ];

    
    
    return (
        <PageHeaderWrapper>
            <ProTable

                headerTitle="用户列表"
                columns={columns}

                request={params => queryUserList(params)}

                rowSelection={{}}

            />
        </PageHeaderWrapper>
    )
}

export default UserList;
