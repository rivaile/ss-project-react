import React, {useState} from 'react';
import {Table, Form, Button, Pagination, Input, Radio} from 'antd';
import {connect} from 'dva';
import {PAGE_SIZE} from '@/constants';
import {routerRedux} from 'dva/router';


import UserModal from "@/pages/admin/user/components/UserModal";

const Users = ({dispatch, list: dataSource, loading, total, page: current}) => {

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

  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
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

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({layout}) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

  return (
    <div>
      <div style={{height: 100}}>

        <Form
          {...formItemLayout}
          layout="inline"
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}>

          <Form.Item label="Field A">
            <Input placeholder="input placeholder"/>
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>

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
