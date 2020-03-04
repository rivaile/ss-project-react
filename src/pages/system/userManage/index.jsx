import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Divider } from 'antd';
import React, { useState } from 'react';
import UpdateFrom from './components/UpdateFrom';
import { queryUserList } from './service';

const UserList = () => {

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});

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
          text: '冻结',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Processing',
        },
        2: {
          text: '删除',
          status: 'Success',
        }
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
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setUpdateModalVisible(true);
              console.log("record" + record);
              setUpdateFormValues(record);
            }}
          >
            修改
              </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  const onUpdate = (value) => {
    console.dir(value);
  }
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="用户列表"
        columns={columns}
        request={params => queryUserList(params)}
        rowSelection={{}}
        pagination={{
          defaultPageSize: 3
        }}
      />

      {updateFormValues && Object.keys(updateFormValues).length ? (

        <UpdateFrom
        initValues={updateFormValues}
          visible={updateModalVisible}
          onUpdate={onUpdate}
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
        />
      ) : null}


    </PageHeaderWrapper>
  )
}

export default UserList;
