import React from 'react';
import { Button, Checkbox, Form, Input, message, Radio } from 'antd';
import { Link } from "react-router-dom";
import { RegisterUser } from '../../api/users';
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const onFinish = async(value) => {
    try{
      const response = await RegisterUser(value);
      console.log(response);
      if(response.success){
        message.success(response.message);
        navigate("/login");
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

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                className="d-block"
                rules={[{ required: true, message: "Confirm Password is required" }]}
              >
                <Input type="password" placeholder="Re-enter your Password" />
              </Form.Item>

              <Form.Item
                label="Register as a Partner"
                htmlFor="role"
                name="role"
                className="d-block text-center"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option!" }]}
              >
                <div className="d-flex justify-content-start">
                  <Radio.Group name="radiogroup" className="flex-start">
                    <Radio value={"partner"}>Yes</Radio>
                    <Radio value={"user"}>No</Radio>
                  </Radio.Group>
                </div>
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