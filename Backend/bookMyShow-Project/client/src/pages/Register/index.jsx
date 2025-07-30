import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from "react-router-dom";
import { RegisterUser } from '../../api/users';

const Register = () => {
  const onFinish = async(value) => {
    try{
      const response = await RegisterUser(value);
      if(response.success){
        message.success(response.message);
      }else{
        message.error(response.message);
      }
    }catch(err){
      message.error(err.message);
    }
  }
  return (
    <main className="App-header">
          <h1>Register to BookMyShow</h1>
          <section className="mw-500 text-center px-3">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                name="name"
                className="d-block"
                rules={[
                  { required: true, message: "Name is required" }
                ]}
              >
                <Input type="text" placeholder="Enter your Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" }
                ]}
              >
                <Input type="email" placeholder="Enter your Email" />
              </Form.Item>
    
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input type="password" placeholder="Enter your Password" />
              </Form.Item>
    
              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
            <p>
              Existing User? <Link to="/login">Login Here</Link>
            </p>
          </section>
        </main>
  )
}
export default Register;