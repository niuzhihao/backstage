import React, { Component } from 'react';

const islogin=(Com)=>{
    return class extends Component {
        state={
            islogin:false
        }
        render() {
            let {islogin}=this.state
            return (
                <div>
                    {islogin?<Com></Com>:null}
                </div>
            );
        }
        componentDidMount(){
            let {history}=this.props
            let {islogin}=this.state
            let userName=localStorage.getItem('userName')
            if(userName){
                islogin=true
                this.setState({islogin})
            }else{
                history.push('/login')
            }
        }
    }  
}
export default islogin;