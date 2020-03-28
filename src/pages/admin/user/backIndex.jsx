import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {Divider, message, Popconfirm, Button, Dropdown, Menu} from 'antd';
import React, {useState} from 'react';
import UpdateFrom from './components/UpdateFrom';
import CreateForm from './components/CreateForm';
import {queryUserList, updateUserById, deleteUserById, addUser, getDept} from '../../../services/users';

const UserList = () => {

  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});

  const [deptValues, setDeptValues] = useState([]);


  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInForm: true
    },
    {
      title: '用户名',
      dataIndex: 'username',
      rules: [
        {
          required: true,
          message: '用户名称为必填项',
        },
      ],
    },
    {
      title: '电话',
      dataIndex: 'telephone',
      rules: [
        {
          required: true,
          message: '用户名称为必填项',
        },
      ]
    },
    {
      title: '邮箱',
      dataIndex: 'mail',
      rules: [
        {
          required: true,
          message: '用户名称为必填项',
        },
      ]
    },

    {
      title: '部门名称',
      dataIndex: 'deptId',
      sorter: true,
      rules: [
        {
          required: true,
          message: '用户名称为必填项',
        },
      ]
    },
    {
      title: '状态',
      dataIndex: 'status',
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
      rules: [
        {
          required: true,
          message: '用户名称为必填项',
        },
      ]
    },
    {
      title: '备注',
      dataIndex: 'remark',
      sorter: true
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
              setUpdateFormValues(record);

              getDept().then((data) => {
                setDeptValues(data)
              })
            }}
          >
            修改
          </a>
          <Divider type="vertical"/>

          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => {
              deleteUserById(record.id);
            }}
            okText="Yes"
            cancelText="No">
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const onUpdate = async value => {

    const hide = message.loading('正在修改...');
    try {
      await updateUserById(value);
      hide();
      message.success("修改成功!")
      return true;
    } catch (error) {
      hide();
      message.error("修改失败!");
      return false;
    }

  }

  const handleAdd = async fields => {
    const hide = message.loading('正在添加');

    try {
      await addUser({...fields});
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };


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
        toolBarRender={(action, {selectedRows}) => [
          <Button type="primary" onClick={() => {

            handleModalVisible(true)
          }}>
            <PlusOutlined/> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      // await handleRemove(selectedRows);
                      // action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作
                <DownOutlined/>
              </Button>
            </Dropdown>
          ),
        ]}

      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async value => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              // if (actionRef.current) {
              //   actionRef.current.reload();
              // }
            }
          }}
          type="form"
          columns={columns}
          rowSelection={{}}/>
      </CreateForm>

      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateFrom
          values={updateFormValues}
          deptValues={deptValues}
          visible={updateModalVisible}
          onUpdate={onUpdate}
          onCancel={() => {
            setUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
        />
      ) : null}

    </PageHeaderWrapper>
  )
}

export default UserList;
