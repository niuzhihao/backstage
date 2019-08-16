import React, { Component } from 'react';
import islogin from '../components/islogin'
import Left from '../components/Left'
import Head from '../components/Header'
import api from '../api/api'
import {Table, Modal, message, Input, Popconfirm } from 'antd'

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
        let {key,userName,password,phoneNum,realName,address,userType}=this.state
        console.log(userName)
                api.user.upuser({userId:key,address,realName,password,phoneNum,userType}).then(res=>{
                    console.log(res.data)
                    if(res.data.code===1){
                        api.user.alluser().then(res=>{
                            this.changeList(res)
                        })
                        message.success(res.data.message);
                    }else{
                        message.error("修改失败");
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

     confirm(record) {
         console.log(record)
        this.removeusers(record)
      }
      
     cancel(e) {
        console.log(e);
        message.error('Click on No');
      }





    changealert(record){
        console.log(record)
        let {userName,password,phoneNum,realName,address,key,userIcon,userType}=this.state
        userName=record.userName
        password=record.password
        phoneNum=record.phoneNum
        realName=record.realName
        address=record.address?record.address:''
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
    searchuser(e){
        let value=e.target.value
        api.user.search(value).then(res=>{
            console.log(res.data)
            this.changeList(res)
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
                    return <img src={text} alt=''></img>
                }
            },
            {
                title:"真实姓名",
                dataIndex:"realName",
                key:"realName"
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
                        <Popconfirm
                        title="Are you sure delete this task?"
                        onConfirm={this.confirm.bind(this,record)}
                        onCancel={this.cancel.bind(this)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span>删除</span>
                    </Popconfirm>
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
                        <Input placeholder="searchuser" onInput={this.searchuser.bind(this)}/>
                        <div className='tit'>所有用户</div>
                        <Table columns={columns} dataSource={alluser}></Table>
                    </div>
                </div>
                <>
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
                </>
            </div>
        );
    }
    changeusermessage(e){
        let value=e.target.value
        let name=e.target.name
        this.setState({
            [name]:value
        })
    }

    componentDidMount(){
        api.user.alluser().then(res=>{
            this.changeList(res)
        })
    }

    changeList(res){
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
    }
}

export default islogin(alluser);




