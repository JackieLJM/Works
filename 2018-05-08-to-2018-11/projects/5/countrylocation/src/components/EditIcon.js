import React from 'react';
import { Icon } from 'antd';

function EditIcon(props) {
    return (
    	props.showShrinkIcon?
        <div id={props.id} style={{display:'inline-block'}} onClick={props.handleClick}>	
			<a style={{display:'inline',fontSize:'1.2rem',marginLeft:'-0.5rem'}}><Icon type="edit" theme="outlined"/> 编辑后台数据</a>
		</div>:<div>&nbsp;</div>
    )
}

export default EditIcon;