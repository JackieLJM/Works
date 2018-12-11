import React, { Component } from 'react';
import '../App.css';
import logo from '../svg/logo.svg';
import { Input, Icon, Modal } from 'antd';
// import Animate from 'rc-animate';
import TweenOne from 'rc-tween-one';

const Search = Input.Search;
class Header extends Component {

    state = {
        show: false,
        visible:false
    }
    mainSearch = (e) => {
        // console.log(e);
        this.props.selectedMarkers(e);
        this.setState({visible:false});
    }
    showSearch = () => {
        this.setState({ show: true })
    }
    handleClick = () => {
        let booleon = true;
        this.props.buttonClick(booleon);
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
    }
    handleCancel=()=>{
      this.setState({
        visible:false
      })
    }
    render() {

        return (
        <header className={this.props.topbar===true?"App-topbar":"App-header"} style={this.props.topbar===true?{'width':window.innerWidth,'zIndex':99}:{}}>
          <div onMouseEnter={this.showSearch}>
          {
            this.props.topbar===false?<img src={logo} className={"App-logo"} alt="logo"/>:
            <img src={logo} className={"App-topbar-logo"} alt="logo" onClick={this.showModal}/>
          }
          {/*<a
            className="App-link"
            href="#world"
            target="_blank"
            rel="noopener noreferrer"
          >
            点击获取更多资讯*/}
          {/*</a>*/}
          </div>
          {
            this.props.topbar===true?
            <Modal
            title="搜索"
            centered={true}
            onCancel={this.handleCancel}
            visible={this.state.visible}
            keyboard={true}
            footer={null}
            >
              <Search placeholder='直接搜索指定的国家、地区、县市' onSearch={this.mainSearch} size='large'></Search>
            </Modal>
            :null
          }
          {
            this.state.show===true&&this.props.topbar===false?
            <TweenOne style={{position:'relative'}} animation={{top:0,height:'3rem'}}>
              <p>
                全球国家地理位置分布，坐标显示
              </p>
            </TweenOne>
            :null
          }
          {
            this.props.topbar===false?
            <div className='MainSearch' style={{marginTop:'1rem'}}>
              <Search placeholder='直接搜索指定的国家、地区、县市' onFocus={this.showSearch} onBlur={this.showSearch} onSearch={this.mainSearch} size='large'></Search>
            </div>
            :null
          }
          {
            this.props.topbar===false?
            <div style={{position:'absolute',top:window.innerHeight-80}} onClick={this.handleClick}>
              <p style={{'fontSize':'1rem',marginBottom:'-0.6rem'}}>向下滚动显示编辑菜单界面</p>
              <TweenOne animation={{ type:'to',duration:2000,top:1000,repeat:-1}}>          
                <Icon type='down' style={{fontSize:'1rem'}}/>
              </TweenOne>
            </div>:null
          }
        </header>
        )
    }
}
export default Header;