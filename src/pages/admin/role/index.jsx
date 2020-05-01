import React, {useState} from 'react';
import {Button, Col, Form, Input, Pagination, Popconfirm, Row, Select, Table, Tree, TreeSelect, Tag, Spin} from 'antd';
import {connect} from 'dva';
import RoleModal from "@/pages/admin/role/components/RoleModal";

const {Option} = Select;
const {TreeNode, DirectoryTree} = Tree;

import styles from './index.css';

const Roles = ({dispatch, list: dataSource, loading, total, page: current, auths: auths, checkedKeys}) => {

  const [roleId, setRoleId] = useState();

  const [form] = Form.useForm();

  const columns = [
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
          <RoleModal action="update" record={record} onCreate={editHandler.bind(null, record.id)}>
            <a style={{marginRight: 16}}>编辑</a>
          </RoleModal>
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
      type: 'roles/patch',
      payload: {id, values},
    });
  }

  function authHandler(id) {
    dispatch({
      type: 'roles/auth',
      payload: id,
    });
  }

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    dispatch({
      type: 'roles/setCheckedKeys',
      payload: {
        checkedKeys
      },
    });
  };

  return (
    <div>
      {/*<Spin className={styles.loading}/>*/}
      <Row gutter={24}>
        <Col span={18}>
          <RoleModal
            action="create"
            record={{}}
            onCreate={values => {
              dispatch({
                type: "roles/create",
                payload: values
              });
            }}>
            <Button
              type="primary"
              style={{marginBottom: "8px"}}
            >
              新增
            </Button>
          </RoleModal>

          <Table
            rowKey={record => record.id}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            onRow={record => {
              return {
                onClick: event => {
                  setRoleId(record.id);
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
          <Button
            type="primary"
            style={{marginBottom: "8px"}}
            loading={loading}
            onClick={() => {
              const authKeys = checkedKeys.filter(it => it.startsWith("a-")).map(it => it.substr(it.indexOf("-") + 1));
              const authIds = authKeys.join(',');
              dispatch({
                type: 'roles/changeRoleAuths',
                payload: {
                  id: roleId,
                  values: {
                    authIds: authIds
                  }
                },
              });
            }}>
            保存
          </Button>

          <Tree
            checkable
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            treeData={auths}/>

        </Col>
      </Row>

    </div>

  )
};

function mapStateToProps(state) {
  const {list, total, page, auths, checkedKeys} = state.roles;
  return {
    loading: state.loading.models.roles,
    list,
    total,
    page,
    auths,
    checkedKeys
  }
}

export default connect(mapStateToProps)(Roles);
