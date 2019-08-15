import React, { Component } from 'react';
import Header from '../components/Header'
import Left from '../components/Left'
import {Icon, DatePicker, Switch, Button} from 'antd'
class startvote extends Component {
    state={
        startValue: null,
        endValue: null,
        endOpen: false,
        title:'',//投票标题
        userId:'',//投票人
        chooseList:[],//昵称
        anonymity:1,//是否匿名 0:匿名 1:不匿名
        isSingle:1,//是否单选 0 单选 1:多选
        startTime:'',//开始时间
        endTime:'',//结束时间
    }

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      };
    
      disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      };
    
      onChange = (field, value) => {
        this.setState({
          [field]: value,
        });
      };
    
      onStartChange = value => {
        let {startTime}=this.state
        startTime=value._d.toString()
        this.setState({
          startTime
        })
        this.onChange('startValue', value);
      };
    
      onEndChange = value => {
        let {endTime}=this.state
        endTime=value._d.toString()
        this.setState(endTime)
        this.onChange('endValue', value);
      };
    
      handleStartOpenChange = open => {
        if (!open) {
          this.setState({ endOpen: true });
        }
      };
    
      handleEndOpenChange = open => {
        this.setState({ endOpen: open });
      };

      anonymityvote(checked) {
        let {anonymity}=this.state
        anonymity=checked?0:1
        this.setState({
          anonymity
        })
        console.log(`switch to ${checked}`);
      }
      isradio(checked) {
        let {isSingle}=this.state
        isSingle=checked?0:1
        this.setState({
          isSingle
        })
        console.log(`switch to ${checked}`);
      }

      changeCon(e){
        let name=e.target.name

        this.setState({
          [name]:e.target.value
        })
      }
      addoption(){

      }

    render() {
        const { startValue, endValue, endOpen, title, chooseList } = this.state;
        return (
            <div className='wrap'>
                <Header></Header>
                <div className='con'>
                    <Left></Left>
                    <div className='right'>
                        <ul className='startvote-list'>
                            <li><b>投票标题：</b><input value={title} onChange={this.changeCon.bind(this)} type="text" placeholder="你对自己的定位是什么"/></li>
                            <li><span>补充描述(选填)</span><input type="text" placeholder="描述"/></li>
                            <li><Icon type="plus-circle" /><span onClick={this.addoption.bind(this)} style={{color:'skyblue'}}>添加选项</span><input onChange={this.changeCon.bind(this)} type="text" placeholder="选项"/></li>
                            <li>
                                <DatePicker
                                disabledDate={this.disabledStartDate.bind(this)}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={startValue}
                                placeholder="开始时间"
                                onChange={this.onStartChange.bind(this)}
                                onOpenChange={this.handleStartOpenChange.bind(this)}
                                />
                                <DatePicker
                                disabledDate={this.disabledEndDate.bind(this)}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={endValue}
                                placeholder="结束时间"
                                onChange={this.onEndChange.bind(this)}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange.bind(this)}
                                />
                            </li>
                            <li><span>匿名投票</span><Switch defaultChecked onChange={this.anonymityvote.bind(this)} /></li>
                            <li><span>是否单选</span><Switch defaultChecked onChange={this.isradio.bind(this)} /></li>
                            <li><Button>重置</Button><Button type='danger'>发布</Button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default startvote;