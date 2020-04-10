import React, {useState} from 'react';
import {Button, Col, Form, Input, Pagination, Popconfirm, Row, Select, Table, Tree, TreeSelect} from 'antd';
import {connect} from 'dva';
import UserModal from "@/pages/admin/user/components/UserModal";

const {Option} = Select;
const {TreeNode, DirectoryTree} = Tree;

const Auths = ({dispatch, list: dataSource, loading, total, page: current, data, auth, module}) => {

  const [form] = Form.useForm();
  //
  // const treeData = [
  //
  //   {
  //     title: 'parent 1',
  //     key: '0-0',
  //     children: [
  //       {
  //         title: 'parent 1-0',
  //         key: '0-0-0',
  //         children: [
  //           {
  //             title: 'leaf',
  //             key: '0-0-0-0',
  //             checked: true,
  //             // disableCheckbox: true,
  //           },
  //           {
  //             title: 'leaf',
  //             key: '0-0-0-1',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'parent 1-1',
  //         key: '0-0-1',
  //         children: [
  //           {
  //             title: 'ss',
  //             key: '0-0-1-0',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];


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


    <Row gutter={24}>

      <Col span={6}>
        <span>权限模板列表</span>

        <div>
          <UserModal
            record={{}}
            onCreate={createHandler}>
            <Button
              type="primary" size="default">
              新增
            </Button>
          </UserModal>

          <Button type="primary" loading={loading} size="default"
                  style={{
                    marginLeft: 8,
                  }}>
            修改
          </Button>

          <Button type="primary" loading={loading} size="default"
                  style={{
                    marginLeft: 8,
                  }}>
            删除
          </Button>

        </div>

        <Tree
          // defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultExpandedKeys={['0-0']}
          defaultCheckedKeys={['0-0-1']}
          onCheck={onCheck}
          treeData={module.data}
        />
      </Col>

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
    </Row>
  )
};

function mapStateToProps(state) {
  const {auth, module} = state.auths;
  return {
    loading: state.loading.models.auths,
    auth,
    module,
  }
}

export default connect(mapStateToProps)(Auths);
