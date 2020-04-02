import React, {useState} from 'react';
import {Button, Form, Input, Pagination, Table, Tag} from 'antd';
import {connect} from 'dva';
import {PAGE_SIZE} from '@/constants';

import UserModal from "@/pages/admin/user/components/UserModal";

const Users = ({dispatch, list: dataSource, loading, total, page: current}) => {

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'telephone',
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
        if (status == '0') {
          return <Tag color="default">冻结</Tag>;
        }
        if (status == '1') {
          return <Tag color="success">正常</Tag>;
        }
        if (status == '2') {
          return <Tag color="error">删除</Tag>;
        }
        return <Tag color="default">其他</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        <a style={{marginRight: 16}}>编辑</a>
        <a>删除</a>
      </span>
      ),
    },
  ];

  const onCreate = values => {
    dispatch({
      type: "users/create",
      payload: {
        ...values
      }
    });

    setVisible(false);
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
