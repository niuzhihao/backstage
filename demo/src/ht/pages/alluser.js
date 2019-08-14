import React, { Component } from 'react';
import islogin from '../components/islogin'
import Left from '../components/Left'
import Head from '../components/Header'
import api from '../api/api'
import {Table, Modal, message } from 'antd'

class alluser extends Component {
    state={
        alluser:[],
        visible: false,
        userName:"",
        password:"",
        phoneNum:'',
        realName:'',
        address:'',
        key:'',
        userIcon:'',
        userType:''
    }


    // showModal = () => {
    //     this.setState({
    //       visible: true,
    //     });
    //   };
    
      handleOk = e => {
        console.log(e);
        let {alluser,key,userName,password,phoneNum,realName,address,userIcon,userType}=this.state
        alluser.forEach((item,index)=>{
            if(item.key===key){

                api.user.upuser({userId:key,address,realName,password,phoneNum,userType}).then(res=>{
                    console.log(res.data)
                    if(res.data.code===1){
                        message.success(res.data.message);
                        alluser[index]={
                            userName,
                            password,
                            phoneNum,
                            realName,
                            address,
                            key,
                            userIcon,
                            userType
                        }
                        this.setState({
                            alluser
                        })
                    }else{
                        message.error("修改失败");
                    }
                })

                
            }
        })

        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    changealert(record){
        console.log(record)
        let {userName,password,phoneNum,realName,address,key,userIcon,userType}=this.state
        userName=record.userName
        password=record.password
        phoneNum=record.phoneNum
        realName=record.realName
        address=record.address
        key=record.key
        userIcon=record.userIcon
        userType=record.userType
        this.setState({
            visible:true,
            userName,
            password,
            phoneNum,
            realName,
            address,
            userIcon,
            key,
            userType
        })
    }
    removeusers(record){
        let {alluser}=this.state
        alluser.forEach((item,index)=>{
            if(item.key===record.key){
                api.user.removeuser({userId:record.key}).then(res=>{
                    if(res.data.code===1){
                        message.success(res.data.message);
                        alluser.splice(index,1)
                        this.setState({
                            alluser
                        })
                    }else{
                        message.error("删除失败");
                    }
                })
            }
        })
    }
    render() {
        let {userName,password,phoneNum,realName,address,userType}=this.state
        const columns=[
            {
                title:'姓名',
                dataIndex:"userName",
                key:"userName"
            },{
                title:"头像",
                dataIndex:"userIcon",
                key:"userIcon",
                render:(text)=>{
                    return (
                        <img src={text} alt=''></img>
                    )
                }
            },
            {
                title:"action",
                dataIndex:"action",
                key:"action",
                render:(text,record)=>{
                    return <span>
                        <span onClick={this.changealert.bind(this,record)}>详情</span>
                        <span>设置管理</span>
                        <span onClick={this.changealert.bind(this,record)}>编辑</span>
                        <span onClick={this.removeusers.bind(this,record)}>删除</span>
                    </span>
                }
            }
        ]
        let {alluser}=this.state
        return (
            <div className='wrap'>
                <Head></Head>
                <div className='con'>
                <Left></Left>
                    <div className='right'>
                        <div className='tit'>所有用户</div>
                        <Table columns={columns} dataSource={alluser}></Table>
                    </div>
                </div>
                <div>
                    <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>用户名：<input onChange={this.changeusermessage.bind(this)} name="userName" type="text" value={userName}/></p>
                    <p>姓名：<input onChange={this.changeusermessage.bind(this)} name="realName" type="text" value={realName}/></p>
                    <p>密码(最少六位)：<input onChange={this.changeusermessage.bind(this)} name="password" type="password" value={password}/></p>
                    <p>权限：
                        
                        <select onChange={this.changeusermessage.bind(this)} value={userType} name="userType">
                            <option value="1">菜单</option>
                            <option value="2">用户</option>
                            <option value="3">小组</option>
                        </select>
                    
                    </p>
                    <p>电话：<input onChange={this.changeusermessage.bind(this)} name="phoneNum" type="tel" value={phoneNum}/></p>
                    <p>地址：<input onChange={this.changeusermessage.bind(this)} name="address" type="text" value={address}/></p>

                    </Modal>
                </div>
            </div>
        );
    }
    changeusermessage(e){
        const value=e.target.value
        const name=e.target.name
        this.setState({
            [name]:value
        })
    }

    componentDidMount(){
        api.user.alluser().then(res=>{
            let alluserNew=[]

            res.data.result.forEach(item=>{
                alluserNew.push({
                    key:item.userId,
                    phoneNum:item.phoneNum,
                    userIcon:item.userIcon,
                    userName:item.userName,
                    userType:item.userType,
                    address:item.address,
                    password:item.password,
                    realName:item.realName
                })
            })

            this.setState({
                alluser:alluserNew
            })
        })
    }
}

export default islogin(alluser);




