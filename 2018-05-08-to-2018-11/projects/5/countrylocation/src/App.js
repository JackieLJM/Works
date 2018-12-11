import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
// import { Anchor } from 'antd';
// const { Link } = Anchor;
// import { scrollScreen } from 'rc-scroll-anim';
// import ScrollAnim from 'rc-scroll-anim';
// import TweenOne from 'rc-tween-one';
// import Animate from 'rc-animate';
// import QueueAnim from 'rc-queue-anim';
// const ScrollOverPack = ScrollAnim.OverPack;

class App extends Component {

    state = {
        'topbar': false,
        'markers': [],
        'countries': '',
        'showfooter': false,
        'allMarkers':[],
        'allCountries':[],
        'main':true
    }

    handleOnScroll = () => { 
      this.setState({ 'topbar': true }); 
      // document.getElementById()
      // console.log(this.refs.app)
      // window.scrollTo(0,0)
      // console.log(window.scrollY)
      // window.scrollY=0;
      // console.log(window.scrollY);
    }

    hideMain=()=>{
      this.setState({
        main:false,
        // showfooter:true
      })
    }

    handleClick = (booleon) => { this.setState({ 'topbar': booleon }) }

    handleMarkers = (markers) => { this.setState({ 'markers': markers }); }

    showFooter = (booleon) => { this.setState({ 'showfooter': booleon })}
    showShowFooter = (booleon) => { this.setState({ 'showfooter': booleon,'markers':[],'countries':"" })}

    handleCountries = (countries) => { this.setState({ 'countries': countries }) }

    handleAllMarkers=(allGeoData)=>{
      let allMarkers=allGeoData.map((item)=>{
        let target='';
        if(item.city===undefined){
          if(item.province===undefined){
            target=item.country;
          }else{
            target=item.province;
          }
        }else{
          target=item.city;
        }
        let targetStr='';
        targetStr=(item.country===undefined?'':item.country)+(item.province===undefined?'':item.province)+(item.city===undefined?'':item.city);
        return {markerOffset:-35,name:target,coordinates:[item.longitude,item.latitude],key:item.key,targetStr:targetStr}
      })
      this.setState({allMarkers:allMarkers});
    }

    handleAllCountries=(allCIPData)=>{ 
      let allCountries=allCIPData.map((item)=>{return {name:item.country}});
      this.setState({allCountries:allCountries});
    }

    handleHeaderSearchInput=(e)=>{
      // console.log(this.state.allCountries);
      // console.log(this.state.allMarkers);
      var filterMarkers=this.state.allMarkers.filter((item,i)=>{
        // console.log(item.name);
        if(item.targetStr.includes(e)){
          return item;
        }
      })
      // console.log(filterMarkers);
      this.setState({'markers':filterMarkers});
      if(filterMarkers.length!==0){
        this.setState({'topbar':true,'main':false,'showfooter':true})
      }
    }
    componentWillUpdate(nextProps, nextState) {
      if(nextState.topbar===true){
        // console.log(window.scrollY,window.scrollX)
        // setTimeout(()=>{
        // console.log(window.scrollY);
        // if(window.scrollY>0){
          // setTimeout(()=>{
          //   // requestAnimationFrame()
          //   window.scrollTo(0,0)
          // },500)
          // setInterval(()=>{
          //   // requestAnimationFrame()
          //   window.scrollTo(0,0)
          // },5000)
        // }
      // },500)
        // window.scrollTo(0,0);
      }
    }
    componentDidMount() {
      // if(this.state.topbar===true){
        
      // }
     
    }

    render() {
      // console.log(this.state.showfooter)
      var style = this.state.showfooter?{}:{marginTop:-window.innerHeight};
      // console.log(style);
      return (

        <div ref="app" className="App" onWheel={this.state.topbar===false?this.handleOnScroll:()=>{
          // console.log(window.scrollX);console.log(window.scrollY)
        }}>
        {/*<ScrollOverPack hideProps={{tweenOne:{reverse:true}}}>
        <QueueAnim key='QueueAnim'>
          <div key='a'>依次进入</div>
          <div key='b'>依次进入</div>
          <div key='b'>依次进入</div>
        </QueueAnim>
        <TweenOne key='tweenOne' vars={{x:100}}>单元素动画</TweenOne>
        <Animate key='rc-animate' transitionName='fade' transitionAppear>
          rc-animate示例
        </Animate>
        </ScrollOverPack>*/}
        {/*  <Anchor affix={true}>
            <Link href="#world" title="world"/> 
            <Link href="#world" title="world"/> 
            <Link href="#world" title="world"/> 
          </Anchor>*/}
          <Header topbar={this.state.topbar} buttonClick={this.handleClick} selectedMarkers={this.handleHeaderSearchInput}/>
          <Main topbar={this.state.topbar} selectedMarkers={this.handleMarkers} allCIP={this.handleAllCountries} allGeo={this.handleAllMarkers} selectedCountries={this.handleCountries} hideMain={this.showFooter} main={this.state.main} showMain={!this.state.showfooter}/>
          {/*showCompleteFooter属性决定是否要显示完全的footer地图*/}
          
          <Footer markers={this.state.markers} countrys={this.state.countries} showCompleteFooter={style} hideMain={this.hideMain} returnMain={this.showShowFooter}/>
      </div>
      );
    }
}

export default App;