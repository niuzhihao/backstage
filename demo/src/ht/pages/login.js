import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message} from 'antd';
import api from '../api/api'
class login extends Component {
    state={
        userName:'',
        password:''
    }
    submitmsg(){
        let {userName,password}=this.state
        let {history} =this.props
        if(userName&&password){
            console.log(123)
            
            api.user.login({userName,password}).then(res=>{
                console.log(res)
                if(res.data.code===1){
                    message.success(res.message);
                    window.localStorage.setItem('userName',userName)
                    window.localStorage.setItem('token',res.data.token)
                    history.push('/alluser')
                }else{
                    message.error(res.message);
                }
            })
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
    render() {
        let {userName,password}=this.state
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
                <Checkbox>Remember me</Checkbox>
                <Button type="primary" onClick={this.submitmsg.bind(this)} htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default login;