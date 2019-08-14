import React, { Component } from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
class register extends Component {
    state={
        userName:'',
        password:'',
        checkpass:'',
        realName:'沐沐恩'
    }
    submitmsg(){
        let {userName,password,realName}=this.state
        let {history} =this.props
        if(userName&&password){
            fetch('/register', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  userName: userName,
                  realName,
                  password: password
                })
          
              })
                .then((res) => res.json())
                .then((res) => {
                  if(res.code===1){
                      history.push('/login')
                      message.success(res.message);
                  }else{
                    message.error(res.message);
                  }
                });

        }else{
            message.warning('不能为空');
        }
    }
    changeusername(e){
        this.setState({userName:e.target.value})
    }
    changepassword(e){
        this.setState({password:e.target.value})
    }
    changecheckpass(e){
        this.setState({checkpass:e.target.value})
    }
    render() {
        let {userName,password,checkpass}=this.state
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    value={userName}
                    onChange={this.changeusername.bind(this)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changepassword.bind(this)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    value={checkpass}
                    onChange={this.changecheckpass.bind(this)}
                    />
                </Form.Item>
                <Form.Item>
                <Button type="primary" onClick={this.submitmsg.bind(this)} htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default register;