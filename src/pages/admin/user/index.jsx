import React, {useState} from 'react';
import {Table, Form, Button, Pagination, Input, Select, Checkbox} from 'antd';
import {connect} from 'dva';
import {PAGE_SIZE} from '@/constants';
import {routerRedux} from 'dva/router';

import UserModal from "@/pages/admin/user/components/UserModal";

const Users = ({dispatch, list: dataSource, loading, total, page: current}) => {

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        <a style={{marginRight: 16}}>Invite {record.name}</a>
        <a>Delete</a>
      </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];


  const onCreate = values => {
    console.log('Received values of form: ', values);

    dispatch({
      type: "users/create",
      payload: {
        values
      }
    });

    setVisible(false);
  };

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
          pathname: '/admin1/users',
          query: {page},
        }
      )
    )
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
        values
      }
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        style={{height: 100}}
        {...layout}
        form={form}
        layout="inline"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>

        <Form.Item
          label="用户名"
          name="username">
          <Input placeholder="请输入用户名"/>
        </Form.Item>

        <Form.Item
          label="电话号码"
          name="telephone">
          <Input placeholder="请输入电话号码"/>
        </Form.Item>

        <Button type="primary" htmlType="submit">查询</Button>
        <Button htmlType="button" onClick={onReset}>重置</Button>

      </Form>

      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}>
        新增
      </Button>

      <UserModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />

      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
      />

    </div>
  )
};

function mapStateToProps(state) {
  const {list, total, page} = state.users;
  return {
    list,
    total,
    page
  }
}

export default connect(mapStateToProps)(Users);
