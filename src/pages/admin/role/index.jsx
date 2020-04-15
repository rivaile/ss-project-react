import React, {useState} from 'react';
import {Button, Col, Form, Input, Pagination, Popconfirm, Row, Select, Table, Tree, TreeSelect} from 'antd';
import {connect} from 'dva';
import UserModal from "@/pages/admin/user/components/UserModal";

const {Option} = Select;
const {TreeNode, DirectoryTree} = Tree;

const Roles = ({dispatch, list: dataSource, loading, total, page: current, auths: auths}) => {

  const [form] = Form.useForm();

  const treeData = [

    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              checked: true,
              // disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'ss',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];


  const columns = [
    {
      title: '角色ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },


    {
      title: '操作者',
      dataIndex: 'operator',
      key: 'operator',
    },

    {
      title: '操作时间',
      dataIndex: 'operateTime',
      key: 'operateTime',
    },

    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <UserModal record={record} onCreate={editHandler.bind(null, record.id)}>
            <a style={{marginRight: 16}}>编辑</a>
          </UserModal>
          <Popconfirm title="确定删除该用户嘛?"
                      onConfirm={deleteHandler.bind(null, record.id)}>
            <a>删除</a>
          </Popconfirm>
      </span>
      ),
    },
  ];

  const deleteHandler = (id) => {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  };

  const createHandler = values => {
    dispatch({
      type: "users/create",
      payload: values
    });
  };

  function pageChangeHandler(page) {
    dispatch({
      type: "users/fetch",
      payload: {
        current: page
      }
    })
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = values => {
    console.log('Success:', values);
    dispatch({
      type: "users/fetch",
      payload: {
        ...values
      }
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: {id, values},
    });
  }

  function authHandler(id) {
    dispatch({
      type: 'roles/auth',
      payload: id,
    });
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };


  return (

    <div>
      <Form
        className="ant-advanced-search-form"
        {...layout}
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="用户名"
              name="username">
              <Input placeholder="请输入用户名"/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="电话号码"
              name="telephone">
              <Input placeholder="请输入电话号码"/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="邮箱"
              name="mail">
              <Input placeholder="请输入邮箱"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="部门"
              name="deptId">

              <TreeSelect
                placeholder="请选择部门"
                treeData={[
                  {
                    title: '技术部',
                    value: '0',
                    children: [
                      {
                        title: 'android',
                        value: '1',
                      },
                      {
                        title: 'java',
                        value: '2',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="状态"
              name="status">
              <Select
                placeholder="请选择状态"
                allowClear>
                <Option value="0">冻结</Option>
                <Option value="1">正常</Option>
                <Option value="2">删除</Option>

              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button
              style={{
                marginLeft: 8,
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Col>
        </Row>
      </Form>

      <div>
        <UserModal
          record={{}}
          onCreate={createHandler}>
          <Button
            type="primary">
            新增
          </Button>
        </UserModal>

        <Button type="primary" loading={loading}
                style={{
                  marginLeft: 8,
                }}>
          Reload
        </Button>

      </div>

      <Row gutter={24}>

        <Col span={18}>

          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            rowKey={record => record.id}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            onRow={record => {
              return {
                onClick: event => {
                  authHandler(record.id);
                },
              };
            }}

          />

          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={10}
            onChange={pageChangeHandler}
          />

        </Col>

        <Col span={6}>

          <Tree
            checkable
            // defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultExpandedKeys={['0-0']}
            defaultCheckedKeys={['0-0-1']}
            onCheck={onCheck}
            treeData={treeData}
          />

        </Col>
      </Row>


    </div>
  )
};

function mapStateToProps(state) {
  const {list, total, page, auths} = state.roles;
  return {
    loading: state.loading.models.roles,
    list,
    total,
    page,
    auths
  }
}

export default connect(mapStateToProps)(Roles);
