import { Form, Input, Modal, Select, TreeSelect } from 'antd';
import React from 'react';
import { useState } from 'react';

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const UpdateForm = ({ visible, onUpdate, onCancel, values }) => {
    const [formVals, setFromVals] = useState({
        username: values.username,
        deptId: values.deptId,
        telephone: values.telephone,
        mail: values.mail,
        status: values.status,
        remark: values.remark
    })
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
                    .then(value => {
                        form.resetFields();
                        onUpdate(value);
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
                    id: values.id,
                    username: values.username,
                    deptId: values.deptId,
                    telephone: values.telephone,
                    mail: values.mail,
                    status: values.status,
                    remark: values.remark
                }}>

                <Form.Item
                    name="id"
                    label="id"
                    hidden>
                    <Input hidden />
                </Form.Item>

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
                    <Input disabled />
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