import React, { Component } from 'react';
import axios from 'axios';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../index.css'

class Login extends Component {

  onFinish = async (values) => {
    const pass = values.password
    const user = values.username
    const encodedData = btoa(`${user}:${pass}`)
    const { data } = await axios.get('https://voldemort.klustera.com/login', {
      headers: {
        'Authorization': `Basic ${encodedData}`
      }
    })
    const { token } = data
    this.props.history.push("/kpi")
    localStorage.setItem("token", token)
  };

  render() {
    return (
      <div className="container_login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
     </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;