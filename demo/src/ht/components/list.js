import React, { Component } from 'react';
import {Icon,Popconfirm, message} from 'antd'
import api from '../api/api'
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
    render() {
        let {item,Update}=this.props
        return (
            <dl>
                <dt>
                    <img src={item.groupIcon} alt=""/>
                </dt>
                <dd>{item.groupName}</dd>
                <dd>
                    <Icon type="tool" />
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
            </dl>
        );
    }
}

export default list;