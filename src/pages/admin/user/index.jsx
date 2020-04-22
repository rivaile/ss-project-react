import React, {useState} from 'react';
import {Button, Col, Form, Input, Pagination, Popconfirm, Row, Select, Table, Tag, TreeSelect, Tree} from 'antd';
import {connect} from 'dva';
import UserModal from "@/pages/admin/user/components/UserModal";
import DeptModal from "@/pages/admin/user/components/DeptModal";

const {Option} = Select;

const Users = ({dispatch, list: dataSource, loading, total, page: current, deptTree}) => {

  const [form] = Form.useForm();


  const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            {title: '0-0-0-0', key: '0-0-0-0'},
            {title: '0-0-0-1', key: '0-0-0-1'},
            {title: '0-0-0-2', key: '0-0-0-2'},
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {title: '0-0-1-0', key: '0-0-1-0'},
            {title: '0-0-1-1', key: '0-0-1-1'},
            {title: '0-0-1-2', key: '0-0-1-2'},
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {title: '0-1-0-0', key: '0-1-0-0'},
        {title: '0-1-0-1', key: '0-1-0-1'},
        {title: '0-1-0-2', key: '0-1-0-2'},
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电话',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: '邮箱',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: '部门',
      dataIndex: 'deptId',
      key: 'deptId',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: status => {

        switch (status) {
          case 0:
            return <Tag color="default">冻结</Tag>;
            break;
          case 1:
            return <Tag color="success">正常</Tag>;
            break;
          case 2:
            return <Tag color="error">删除</Tag>;
            break;
          default:
            return <Tag color="default">其他</Tag>;
            break;
        }
      }
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <div>
      <Form
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
        <Row gutter={24}>
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

          <Col
            span={8}
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
              }}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>


      <Row gutter={24}>

        <Col span={6}>

          <span>部门列表</span>

          <div>
            {/*<ModuleModal*/}
            {/*  record={{}}*/}
            {/*  moduleTree={treeData}*/}
            {/*  onCreate={createHandler}>*/}
            {/*  <Button*/}
            {/*    type="primary" size="default">*/}
            {/*    新增*/}
            {/*  </Button>*/}
            {/*</ModuleModal>*/}

            <DeptModal record={{}} onCreate={() => {
            }}>
              <a style={{marginRight: 16}}>编辑</a>
            </DeptModal>


            {/*  <ModuleModal*/}
            {/*    record={nodeInfo}*/}
            {/*    moduleTree={treeData}*/}
            {/*    onCreate={updateHandler}*/}
            {/*  >*/}
            {/*    <Button type="primary" size="default"*/}
            {/*            style={{*/}
            {/*              marginLeft: 8,*/}
            {/*            }}>*/}
            {/*      修改*/}
            {/*    </Button>*/}
            {/*  </ModuleModal>*/}

            {/*  <Button onClick={showDeleteConfirm} type="dashed">*/}
            {/*    删除*/}
            {/*  </Button>*/}

          </div>

          <Tree
            // defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultExpandedKeys={['0-0']}
            defaultCheckedKeys={['0-0-1']}
            // onCheck={onCheck}
            // onSelect={onSelect}
            treeData={deptTree}
          />
        </Col>

        <Col span={18}>
          <div style={{
            marginBottom: 8,
          }}>
            <UserModal
              record={{}}
              onCreate={createHandler}>
              <Button
                type="primary">
                新增
              </Button>
            </UserModal>

            <Button loading={loading}
                    style={{
                      marginLeft: 8,
                    }}>
              Reload
            </Button>
          </div>
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
          />

          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={10}
            onChange={pageChangeHandler}
          />

        </Col>
      </Row>

    </div>
  )
};

function mapStateToProps(state) {
  const {list, total, page, deptTree} = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
    deptTree
  }
}

export default connect(mapStateToProps)(Users);
