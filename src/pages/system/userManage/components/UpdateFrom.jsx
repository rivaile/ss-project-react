import { Form, Input, Modal, Select, TreeSelect } from 'antd';
import React from 'react';

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const UpdateForm = ({ visible, onUpdate, onCancel,initValues }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="编辑用户"
            okText="更新"
            cancelText="返回"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onUpdate(values);
                    })
                    .catch(info => {
                        // eslint-disable-next-line no-console
                        console.log('Validate Failed:', info);
                    });
            }}>
            <Form
                {...layout}
                form={form}
                name="form_in_modal"
                initialValues={{
                    username: initValues.username,
                    deptId:1,
                    telephone:initValues.telephone,
                    mail:initValues.mail,
                    status:initValues.status,
                    remark:initValues.remark
                }}>
                <Form.Item label="所有部门" name="deptId">
                    <TreeSelect
                        treeData={[
                            {
                                title: 'Light',
                                value: 'light',
                                children: [
                                    {
                                        title: 'Bamboo',
                                        value: 'bamboo',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the username!',
                        },
                    ]}
                >
                    <Input disabled={false}/>
                </Form.Item>
                <Form.Item
                    name="telephone"
                    label="电话"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the telephone!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="mail"
                    label="邮箱"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="状态" name="status">
                    <Select>
                        <Select.Option value="1">正常</Select.Option>
                        <Select.Option value="0">冻结</Select.Option>
                        <Select.Option value="2">删除</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="remark"
                    label="备注">
                    <Input.TextArea />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default UpdateForm;