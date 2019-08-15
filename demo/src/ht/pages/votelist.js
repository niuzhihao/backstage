import React, { Component } from 'react';
import Left from '../components/Left'
import Header from '../components/Header'
class votelist extends Component {
    render() {
        return (
            <div className='wrap'>
                <Header></Header>
                <div className='con'>
                    <Left></Left>
                    <div className='right'>
                        投票列表
                    </div>
                </div>
            </div>
        );
    }
}

export default votelist;