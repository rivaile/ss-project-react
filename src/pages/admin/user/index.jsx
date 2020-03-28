import React, {useState} from 'react';
// import {Table, Popconfirm, Button} from 'antd';
import {Table, Tag, Button} from 'antd';
import {connect} from 'dva';


import UserModal from "@/pages/admin/user/components/UserModal";

const Users = ({dispatch}) => {

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
      ),
    },
    {
      title: 'Action',
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

  return (
    <div>

      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
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
        dataSource={data}/>

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
