import React from 'react';
import { Icon } from 'antd';

function ReturnIcon(props) {
    return (
        <div id={props.id} style={props.showShrinkIcon?{display:'inline-block',marginLeft:window.innerWidth<1082?window.innerWidth/5:200,marginRight:window.innerWidth<1082?-window.innerWidth/5:-200}:{display:'none'}} onClick={props.handleClick} >
			<a style={{display:'inline',fontSize:'1.2rem'}}><Icon type="check-square" theme="outlined"/> 返回选择</a>
		</div>
    )
}

export default ReturnIcon;