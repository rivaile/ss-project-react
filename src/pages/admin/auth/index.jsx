import React, {useState} from 'react';
import {Button, Col, Form, Input, Pagination, Popconfirm, Row, Select, Table, Tree, TreeSelect, Modal} from 'antd';
import {connect} from 'dva';
import ModuleModal from "@/pages/admin/auth/components/ModuleModal";

const {Option} = Select;
const {TreeNode, DirectoryTree} = Tree;
import {ExclamationCircleOutlined} from '@ant-design/icons';
import AuthModal from "@/pages/admin/auth/components/AuthModal";

const {confirm} = Modal;

const Auths = ({dispatch, list: dataSource, loading, total, page: current, treeData}) => {

  const [form] = Form.useForm();
  const [nodeInfo, setNodeInfo] = useState({});

  const columns = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '权限模块',
      dataIndex: 'authModuleId',
      key: 'authModuleId',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '顺序',
      dataIndex: 'seq',
      key: 'seq',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <AuthModal record={record} onCreate={data => {
            dispatch({
              type: 'auths/patchAuth',
              payload: {id: record.id, data},
            });
          }}>
            <a style={{marginRight: 16}}>编辑</a>
          </AuthModal>

          <Popconfirm title="确定删除该权限嘛?"
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
      type: "auths/createAuthModule",
      payload: values
    });
  };

  const updateHandler = values => {
    console.dir(values);
    dispatch({
      type: "auths/patchAuthModule",
      payload: {
        id: values.id,
        values: values
      }
    });
  };

  const pageChangeHandler = (page) => {
    dispatch({
      type: "users/fetch",
      payload: {
        current: page
      }
    })
  };

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
      type: 'auths/fetchAuth',
      payload: id,
    });
  }


  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);

    setNodeInfo({
      id: info.node.id,
      parentId: info.node.parentId,
      name: info.node.name,
      seq: info.node.seq,
      status: info.node.status,
      remark: info.node.remark,
    });

    dispatch({
      type: 'auths/fetchAuth',
      payload: {
        id: info.node.id
      },
    });
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };


  function showDeleteConfirm() {
    confirm({
      title: '确定要删除该权限嘛?',
      icon: <ExclamationCircleOutlined/>,
      content: 'Some descriptions',
      okText: '确定删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: "auths/removeAuthModule",
          payload: {
            id: nodeInfo.id,
          }
        });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (

    <Row gutter={24}>

      <Col span={6}>
        <span>权限模板列表</span>

        <div>
          <ModuleModal
            record={{}}
            moduleTree={treeData}
            onCreate={createHandler}>
            <Button
              type="primary" size="default">
              新增
            </Button>
          </ModuleModal>

          <ModuleModal
            record={nodeInfo}
            moduleTree={treeData}
            onCreate={updateHandler}>
            <Button type="primary" size="default"
                    style={{
                      marginLeft: 8,
                    }}>
              修改
            </Button>
          </ModuleModal>

          <Button onClick={showDeleteConfirm} type="dashed">
            删除
          </Button>

        </div>

        <Tree
          // defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultExpandedKeys={['0-0']}
          defaultCheckedKeys={['0-0-1']}
          onCheck={onCheck}
          onSelect={onSelect}
          treeData={treeData}
        />
      </Col>

      <Col span={18}>

        <AuthModal record={{}}
                   moduleTree={treeData}
                   onCreate={values => {
                     dispatch({
                       type: "auths/createAuth",
                       payload: {...values}
                     });
                   }}>
          <Button>新增</Button>
        </AuthModal>

        <Table
          rowKey={record => record.id}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={false}/>

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
  const {auth: {list: list, total: total, page: page}, module: {data: treeData}} = state.auths;
  return {
    loading: state.loading.models.auths,
    list: list,
    total: total,
    page: page,
    treeData: treeData,
  }
}

export default connect(mapStateToProps)(Auths);
