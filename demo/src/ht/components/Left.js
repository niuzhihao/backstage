import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;


        
class Left extends Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  gotoAlluser(){
    let {history}=this.props
    history.push('/alluser')
  }
  grouplist(){
    let {history}=this.props
    history.push('/group')
  }
  member(){
    let {history}=this.props
    history.push('/member')
  }
    render() {
        return (
          <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>用户管理</span>
              </span>
            }
          >
            <Menu.Item key="1" onClick={this.gotoAlluser.bind(this)}>所有用户</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>小组管理</span>
              </span>
            }
          >
            <Menu.Item key="5" onClick={this.grouplist.bind(this)}>小组列表</Menu.Item>
            <Menu.Item key="6" onClick={this.member.bind(this)}>成员管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="setting" />
                <span>投票管理</span>
              </span>
            }
          >
            <Menu.Item key="7" onClick={this.startVote.bind(this)}>发起投票</Menu.Item>
            <Menu.Item key="8" onClick={this.Votelist.bind(this)}>投票列表</Menu.Item>
          </SubMenu>
        </Menu>
        )
    }
    startVote(){
      let {push}=this.props.history
      push('/startvote')
    }
    Votelist(){
      let {push}=this.props.history
      push('/votelist')
    }
}

export default withRouter(Left);