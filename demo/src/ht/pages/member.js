import React, { Component } from 'react';
import Left from '../components/Left'
import Head from '../components/Header'
import api from '../api/api'
import { Radio } from 'antd';
class member extends Component {
    state={
        data:[]
    }
    render() {
        return (
            <div className='wrap'>
                <Head></Head>
                <div className='con'>
                    <Left></Left>
                    <div className='right'>
                    <Radio.Group defaultValue="1" buttonStyle="solid">
                        <Radio.Button value="1">Hangzhou</Radio.Button>
                        <Radio.Button value="2">Shanghai</Radio.Button>
                        <Radio.Button value="3">Beijing</Radio.Button>
                        <Radio.Button value="4">Chengdu</Radio.Button>
                    </Radio.Group>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount(){
        let {data}=this.state
        api.group.grouplist().then(res=>{
            console.log(res.data.result)
            data=res.data.result
            this.setState({data})
        })
    }
}

export default member;