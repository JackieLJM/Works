import React, { Component } from 'react';
import '../App.css';
import { Button,Switch,notification } from 'antd';
import Texty from 'rc-texty';
// import world from '../../world-50m.json';
// import {baseUrl} from "../utils/global.js";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker
} from 'react-simple-maps';
// import geographyObject from './world-50m.json';

const wrapperStyles = {
    width: "90%",
    // maxWidth: 980,
    margin: "0 auto",
}

// const include = [
//   "ARG", "BOL", "BRA", "CHL", "COL", "ECU",
//   "GUY", "PRY", "PER", "SUR", "URY", "VEN",
// ]

// const markers = [
//     { markerOffset: -35, name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
//     { markerOffset: -35, name: "La Paz", coordinates: [-68.1193, -16.4897] },
//     { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
//     { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
//     { markerOffset: 15, name: "Bogota", coordinates: [-74.0721, 4.7110] },
//     { markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807] },
//     { markerOffset: -35, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
//     { markerOffset: -35, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
//     { markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.8520] },
//     { markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
//     { markerOffset: -35, name: "Caracas", coordinates: [-66.9036, 10.4806] },
// ]

class Footer extends Component {
	state={
		// Y:false,
		style:'',
		chinamap:false
	}
	returnMain = () => {
		// this.setState({Y:false});
		this.props.returnMain(false);
	}
	componentWillReceiveProps(nextProps){

	}
	handleClick=(e)=>{
		// 打印出点击的国家的属性
		console.log(e);
		notification.open({message:e.properties.NAME,description:`具体位置在 ${e.properties.SUBREGION}`});

	}
	changeSwitch=(check)=>{
		this.setState({chinamap:check})
	}
    render() {
    	// window.addEventListener('scroll',()=>{
    	// 	// console.log(window.scrollY);
    	// 	// console.log(window.innerHeight);
    	// 	if(window.scrollY>=window.innerHeight/2-100){
    	// 		this.setState({
    	// 			Y:true,
    	// 			style:{}
    	// 		});
    	// 		this.props.hideMain();
    	// 		// this.props.returnMain(true);
    	// 	}
    	// 	// console.log(this.state.style)
    	// });
    	// let map=(this.state.chinamap?
    	// {
    	// 	scale:900,
    	// 	center:[100,40]
    	// }:{
    	// 	scale:205,
    	// 	center:[0,20]
    	// })
        return (
            <div className="App-footer" style={this.props.showCompleteFooter}>
            	{/*判断该组件传进来的style对象是不是空值，如果是空值就设置该按钮显示，不是就隐藏该按钮*/}
            	{(Object.keys(this.props.showCompleteFooter).length===0)?<Texty interval="100" id="country" delay={100} style={window.innerWidth<=1400?{fontSize:'1.8rem',marginTop:'1.5rem',marginBottom:'-1.5rem'}:{fontSize:'1.5rem',marginTop:'3.5rem',marginBottom:'-1.5rem'}}>坐标位置分布图</Texty>:null}
            	{(Object.keys(this.props.showCompleteFooter).length===0)?<Button style={{marginTop:'3rem',marginBottom:'2rem'}} onClick={this.returnMain}>返回编辑菜单界面</Button>:null}
	     		{/*(Object.keys(this.props.showCompleteFooter).length===0)?<Switch size="small" style={{fontSize:'0.5rem'}} checkedChildren="中国" unCheckedChildren="全球" onChange={this.changeSwitch}/>:null*/}
	     		<div style={wrapperStyles}>
			        <ComposableMap
			          projectionConfig={{ 
			          	// 世界地图
			          	scale: 205,
			          	// 中国地图
			          	// scale:900,
			            rotation: [-11,0,0],  }}
			          width={1000}
			          height={551}
			          style={window.innerWidth>1400?{
			            width: "80%",
			            maxWidth:1400,
			            height: "auto",
			          }:{width:"100%",
			          maxWidth:1400,height:"auto"}}
			          >
			          {/*世界地图*/}
			          <ZoomableGroup center={[0,20]} disablePanning>
			          {/*中国地图*/}
			          {/*<ZoomableGroup center={[ 100, 40 ]} disablePanning>*/}
			            <Geographies geography="/static/react/world-50m.json">
				            {			   
				              	(geographies, projection) =>
				                geographies.map((geography, i) =>
				                 // 调试geography
				                 	{
				                 	 	// console.log(geography)
				                 // 中国地图
				                    	// geography.properties.NAME==="China" &&(
				                    return 	(<Geography
							                      key={i}
							                      geography={geography}
							                      projection={projection}
							                      onClick={this.handleClick}
							                      style={{
								                        default: {
								                          fill: "#ECEFF1",
								                          stroke: "#607D8B",
								                          strokeWidth: 0.75,
								                          outline: "none",
								                        },
								                        hover: {
								                          fill: "#CFD8DC",
								                          stroke: "#607D8B",
								                          strokeWidth: 0.75,
								                          outline: "none",
								                        },
								                        pressed: {
								                          fill: "#FF5722",
								                          stroke: "#607D8B",
								                          strokeWidth: 0.75,
								                          outline: "none",
								                        }
							                      }}
				                    		/>)
				                	}
				                )
				            }
			            </Geographies>
			            <Markers>
			              {this.props.markers.map((marker, i) => (
			                <Marker
			                  key={i}
			                  marker={marker}
			                  style={{
			                    default: { stroke: "#1890ff" },
			                    hover: { stroke: "#FF5722" },
			                    pressed: { stroke: "#FF5722" },
			                  }}
			                  >
			                  <g transform="translate(-12, -24)">
			                    <path
			                      fill="none"
			                      strokeWidth="2"
			                      strokeLinecap="square"
			                      strokeMiterlimit="10"
			                      strokeLinejoin="miter"
			                      d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
			                    />
			                    <circle
			                      fill="none"
			                      strokeWidth="2"
			                      strokeLinecap="square"
			                      strokeMiterlimit="10"
			                      strokeLinejoin="miter"
			                      cx="12"
			                      cy="9"
			                      r="3"
			                    />
			                  </g>
			                  <text
			                    textAnchor="middle"
			                    y={marker.markerOffset}
			                    style={{
			                      fontFamily: "Roboto, sans-serif",
			                      fill: "#607D8B",
			                      stroke: "none",
			                    }}
			                    >
			                    {/*marker.name*/}
			                  </text>
			                </Marker>
			              ))}
			            </Markers>
			          </ZoomableGroup>
			        </ComposableMap>
	     		</div>
      		</div>
        )
    }
}
export default Footer;