import React, { Component } from 'react';
import {Icon,Popconfirm, message} from 'antd'
import api from '../api/api'
import {Modal} from 'antd'
function confirm(groupId,Update) {
    console.log(groupId);
    api.group.removegroup({groupId}).then(res=>{
        console.log(res)
        if(res.data.code===1){
            message.success('删除成功');
            Update()
        }
    })
  }
  
  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }


class list extends Component {
    
    state={
        visible: false,
        groupName:'',
        groupPersonNum:10,
        leaderUserName:'',
        groupId:null
    }

    handleOk = e => {
        let {changeDate}=this.props
        let {groupId,groupName,groupPersonNum,leaderUserName}=this.state
        api.group.undate({ groupId,groupName,groupPersonNum,leaderUserName}).then(res=>{
            if(res.data.code===1){
                message.success(res.data.message)
                changeDate()
            }else{
                message.error(res.data.message)
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

    ModalAlert(){
        this.setState({
            visible:true,
        })
    }

    render() {
        let {item,Update}=this.props
        let {groupName,groupPersonNum,leaderUserName}=this.state
        return (
            <dl>
                <dt>
                    <img src={item.groupIcon} alt=""/>
                </dt>
                <dd>{item.groupName}</dd>
                <dd>
                    <Icon type="tool" onClick={this.ModalAlert.bind(this)}/>
                    <Popconfirm
                        title="Are you sure delete this task?"
                        onConfirm={confirm.bind(this,item.groupId,Update)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <i> <Icon type="delete"/></i>
                    </Popconfirm>
                </dd>


                <>
                    <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>小组名字<input onChange={this.changeItem.bind(this)} value={groupName} name="groupName" type="text"/></p>
                    <p>上线人数<input onChange={this.changeItem.bind(this)} value={groupPersonNum} name="groupPersonNum" type="text"/></p>
                    <p>组长id<input onChange={this.changeItem.bind(this)} value={leaderUserName} name="leaderUserName" type="text"/></p>
                    </Modal>
                </>
            </dl>
        );
    }
    changeItem(e){
        let name=e.target.name
        this.setState({
            [name]:e.target.value
        })
    }
    componentDidMount () {
        let {item}=this.props
        this.setState({
            groupName:item.groupName,
            groupPersonNum:item.groupPersonNum,
            leaderUserName:item.leaderUserName,
            groupId:item.groupId
        })
        api.group.member({groupId:1025}).then(res=>{
            console.log(res)
        })
    }
}

export default list;