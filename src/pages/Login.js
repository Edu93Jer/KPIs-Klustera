import React, { Component } from 'react';
import axios from 'axios';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../index.css'

class Login extends Component {

  onFinish = async (values) => {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        this.props.history.push("/err401")
      }
      return error;
    });
    const pass = values.password
    const user = values.username
    const encodedData = btoa(`${user}:${pass}`)
    const { data } = await axios.get('https://voldemort.klustera.com/login', {
      headers: {
        'Authorization': `Basic ${encodedData}`
      }
    })
    const { token } = data
    localStorage.setItem("token", token)
    this.props.history.push("/kpi")
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
          <div className='login-inputs'>Please input your credentials</div>
          <Form.Item
            className='login-inputs'
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
            className='login-inputs'
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