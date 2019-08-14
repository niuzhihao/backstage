import React, { Component } from 'react';
import Left from '../components/Left'
import api from '../api/api'
import Header from '../components/Header'
import List from '../components/list'
import { Pagination,Row, Col, Modal, message } from 'antd';
class grouplist extends Component {
    state={
        data:[],
        pages:6,
        visible: false,
        groupName:'',
        groupPersonNum:'',
        leaderUserName:''
    }
    addgroup(){
        this.setState({
            visible:true
        })
    }

    handleOk = e => {
        console.log(e);
        let {groupName,leaderUserName}=this.state
        api.group.addgroup({groupName,groupPersonNum:10,leaderUserName,groupIcon:"http://i1.hdslb.com/bfs/archive/9037080061a6e4302690687035fceda42984bbf4.jpg"}).then(res=>{
            console.log(res)
            if(res.data.code===1){
                message.success(res.data.message);
                this.date()
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

      date(){
            let {data}=this.state
            api.group.grouplist().then(res=>{
                data=res.data.result
                this.setState({data})
            })
      }

    render() {
        let {data,pages,groupName,groupPersonNum,leaderUserName}=this.state
        return (
            <div className='wrap'>
                <Header></Header>
                <div className='con'>
                    <Left></Left>
                    <div className='right'>
                        <div className='tit'><span>全部小组</span><span className='active' onClick={this.addgroup.bind(this)}>添加小组</span></div>
                        <div className='grouplist-con'>
                            <div>
                                {
                                    data&&data.map((item,index)=><List Update={this.date.bind(this)} key={index} item={item}></List>)
                                }
                            </div>
                            <div></div>
                        </div>
                        <Row>
                            <Col span={12} offset={8}>
                                <Pagination ref='pages' defaultCurrent={1} total={Math.ceil(data.length/pages)*10} />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>用户名<input type="text" onChange={this.changeVal.bind(this)} name='groupName' value={groupName}/></p>
                    <p>上限人数<input type="text" onChange={this.changeVal.bind(this)} name='groupPersonNum' value={groupPersonNum}/></p>
                    <p>组长用户名<input type="text" onChange={this.changeVal.bind(this)} name='leaderUserName' value={leaderUserName}/></p>
                    </Modal>
                </div>
            </div>
        );
    }
    changeVal(e){
        let value=e.target.value
        let name=e.target.name
        this.setState({
            [name]:value
        })
    }
    componentDidMount(){
        let {data}=this.state
        api.group.grouplist().then(res=>{
            data=res.data.result
            this.setState({data})
        })
    }
}

export default grouplist;