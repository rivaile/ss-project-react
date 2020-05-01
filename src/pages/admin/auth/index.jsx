import React, {useState} from 'react';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Menu,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Table,
  Tree,
  Tag
} from 'antd';
import {connect} from 'dva';
import ModuleModal from "@/pages/admin/auth/components/ModuleModal";
import {DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import AuthModal from "@/pages/admin/auth/components/AuthModal";

const {Option} = Select;
const {TreeNode, DirectoryTree} = Tree;

const {confirm} = Modal;

const Auths = ({dispatch, list: dataSource, loading, total, page: current, treeData}) => {

  const [form] = Form.useForm();
  const [nodeInfo, setNodeInfo] = useState({});
  const [authModule, setAuthModule] = useState([]);

  const [action, setAction] = useState('create');
  const [visible, setVisible] = useState(false);


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
              payload: {id: record.id, data, authModule},
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
    setAuthModule(selectedKeys);
    if (info.selected == true) {
      setNodeInfo({
        id: info.node.id,
        parentId: info.node.parentId,
        name: info.node.name,
        seq: info.node.seq,
        status: info.node.status,
        remark: info.node.remark,
      });
    } else {
      setNodeInfo({});
    }

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
      content: '',
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


  function handleMenuClick(e) {
    switch (e.key) {
      case 'create':
        setVisible(true);
        setNodeInfo({});
        setAction('create');
        break;
      case 'update':
        if (authModule.length == 0) {
          notification['error']({
            message: '错误警告!',
            description: '请选择要编辑的权限模块.',
          });
          return;
        }

        setVisible(true);
        setAction('update');
        break;
      case 'delete':
        showDeleteConfirm();
        break;
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="create">新增</Menu.Item>
      <Menu.Item key="update">编辑</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );


  return (

    <Row gutter={24}>

      <Col span={6}>

        <div style={{height: "32px", position: "relative", lineHeight: "32px", marginBottom: "8px"}}>
          <span style={{}}>权限模块</span>
          <span style={{position: "absolute", right: "0px", top: "0px"}}>
            <Dropdown overlay={menu}>
              <Button loading={loading}>
                操作 <DownOutlined/>
              </Button>
            </Dropdown>
          </span>
        </div>

        {visible && <ModuleModal
          visible={visible}
          record={nodeInfo}
          moduleTree={treeData}
          onCancel={() => {
            setVisible(false);
          }}
          onCreate={(values => {
            if (action == 'create') {
              dispatch({
                type: "auths/createAuthModule",
                payload: values
              });
            } else {
              dispatch({
                type: "auths/createAuthModule",
                payload: values
              });
            }
          })}>
        </ModuleModal>}

        <Tree
          defaultExpandedKeys={['0-0']}
          defaultCheckedKeys={['0-0-1']}
          onCheck={onCheck}
          onSelect={onSelect}
          treeData={treeData}
        />
      </Col>

      <Col span={18}>
        <div style={{
          marginBottom: 8,
        }}>
          <AuthModal record={{}}
                     moduleTree={treeData}
                     onCreate={values => {
                       dispatch({
                         type: "auths/createAuth",
                         payload: {data: values, authModule}
                       });
                     }}>
            <Button type="primary">新增</Button>
          </AuthModal>
        </div>

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
