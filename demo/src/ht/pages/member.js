import React, { Component } from 'react';
import Left from '../components/Left'
import Head from '../components/Header'
import api from '../api/api'
import { Radio, Table } from 'antd';
class member extends Component {
    state={
        data:[],
        list:[],
        dataindex:0,
        groupId:-1
    }
    render() {
        let {data,list,dataindex}=this.state

        const columns = [
            {
              title: '用户名',
              dataIndex: 'userName',
              key: 'userName',
            },
            {
              title: '姓名',
              dataIndex: 'realName',
              key: 'realName',
            },
            {
              title: '电话',
              dataIndex: 'phoneNum',
              key: 'phoneNum',
            },
            {
                title:"最后动态更新时间",
                dataIndex:"dynamicTime",
                key:"dynamicTime",
                render:()=>{
                    return <span>{new Date().toLocaleString()}</span>
                } 
            }
          ];
        return (
            <div className='wrap'>
                <Head></Head>
                <div className='con'>
                    <Left></Left>
                    <div className='right'>
                    <Radio.Group defaultValue={dataindex} buttonStyle="solid">
                       {
                           data&&data.map((item,index)=> <Radio.Button onClick={this.clickNav.bind(this)}  key={index} value={index}>{item.groupName}</Radio.Button>)
                       }
                    </Radio.Group>
                    <Table dataSource={list} columns={columns} />;
                    </div>
                </div>
            </div>
        );
    }
    clickNav(e){
        this.setState({
            dataindex:e.target.value
        })
        console.log('执行了这个函数')
        this.groupMember()


    }
    componentDidMount(){
        let {data,groupId,dataindex}=this.state
        api.group.grouplist().then(res=>{
            data=res.data.result
            groupId=res.data.result[dataindex].groupId
            this.getgroupmember(groupId)
            this.setState({data,groupId})
        })
        this.groupMember()
        
    }

    groupMember(){
        let {data,dataindex,groupId}=this.state

        if(data[0]){
            groupId=data[dataindex].groupId
            this.setState({
                groupId
            })
        }
        this.getgroupmember(groupId)

    }
    getgroupmember(groupId){
        api.group.member({groupId}).then(res=>{
            let newList=[]
            res.data.result.forEach((item,index)=>{
                newList.push({
                    key:item.userId,
                    address:item.address,
                    phoneNum:item.phoneNum,
                    realName:item.realName,
                    userName:item.userName
                })
            })
            this.setState({
                list:newList
            })
        })
    }



}

export default member;