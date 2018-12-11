import React, { Component } from 'react';
import '../../App.css';
import { message, Table, Input, Button, Popconfirm, Icon } from 'antd';
import EditableCell, { EditableFormRow } from '../EditableCell';
import countryipAPI from '../../apis/countryipAPI';
// import { VariableCardCountryContext } from '../VariableCard';
import ReturnIcon from '../ReturnIcon';
message.config({ top: 40 });
const Search = Input.Search;

class CountryipView extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '国家',
            align: 'center',
            dataIndex: 'country'
        }, {
            title: '...',
            align: 'center',
            dataIndex: '...',
            render: (text, record) => {
                return <span>...</span>
            }
        }];

        this.state = {
            dataSource: [],
            markers: [],
            selectedOptions: '',
            'beSelectedTitle': true
        };
        this.state.count = this.state.dataSource.length;
        // state里的count会以这个datasource的长度为值，以后的过滤更改操作也不会影响到该值的变化
        // 但要是考虑到跨平台操作，多用户同时操作同源数据的情况就需要重新处理这个KEY值的问题
        // 这里使用add和update和delete后再发起请求得到全部数据来更新表格的方式，简单的处理这个问题
        // 但是数据量大的时候应该如何处理
    }

    // 先删除本地数据再将从服务端删除对应数据
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        const index = dataSource.findIndex(item => key === item.key);
        const item = dataSource[index];

        if (item.id !== undefined) {
            countryipAPI.delCIP({ id: item.id }).then((data) => { this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
            return data; })
                .then(
                  (data)=>{
                    console.log(data);
                    if(data.success){
                      message.success("删除成功",2);
                    }
                  }
                )
                .then(
                    // 每次操作都会更新全体数据，不用错误处理
                    () => { countryipAPI.getAllCIP().then((data) => this.setState({ 'dataSource': data.allcountryip })) }
                )
                .catch((err) => { message.error('删除失败', 2) });
        } else {
            // 无id数据处理
            this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
            message.success("删除成功",2);
        };
    }

    // 该函数直接在本地新增一条数据，如果没有编辑此条数据就没有触发传送服务端的操作，该本地数据会丢失
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: `cip-${count}`,
            country: `请更改此项`,
            code: count,
            remark: `请更改此项`,
        };
        this.setState({
            dataSource: [newData, ...dataSource],
            count: count + 1,
        });
    }

    // 先增加本地数据再将本地数据添加到服务端
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        // 根据当前操作的行的key找到当前行在datasource里面对应的数据item
        const item = newData[index];
        // 用当前的row数据去merge混合item的数据，以此更新数据
        const newItem = {
            ...item,
            ...row
        }

        newData.splice(index, 1, newItem);
        this.setState({ dataSource: newData, count: newData.length });
        // 根据id是否是undefined判断此操作的行是否是新增的数据，
        // 如果是新增的数据那就是row，row代表没有Id的行数据，如果不是新增的数据那就是item，item代表有Id的行数据
        if (newItem.country !== "请更改此项" && newItem.remark !== "请更改此项") {
                item.id === undefined ? 
                countryipAPI.addCIP(row).then(
                    // 此处因为在客户端先添加了数据，所以要去服务端查询该数据对应的Id
                    (data) => {
                        countryipAPI.findAddCIPIdFromServer(row).then((data) => {
                            // 此处将服务端获取的Id和本地的item做一次合并操作，更新本地没有Id的数据
                            const newData = [...this.state.dataSource];
                            const index = newData.findIndex(item => row.key === item.key);
                            const item = newData[index];
                            newData.splice(index, 1, {
                                ...item,
                                ...data
                            });
                            this.setState({ dataSource: newData, count: newData.length });
                        })
                        console.log(data);
                        return data;
                    }
                )
                .then(
                  (data)=>{
                    console.log(data);
                    if(data.success){
                      message.success("添加成功",2);
                    }
                  }
                )
                .then(
                    // 每次操作都会更新全体数据，不用错误处理
                    () => { countryipAPI.getAllCIP().then((data) => this.setState({ 'dataSource': data.allcountryip })) }
                ).catch((err) => { message.error("添加失败", 2) })
                :
                countryipAPI.updateCIP(newItem)
                .then(
                  (data)=>{
                    console.log(data);
                    if(data.success){
                      message.success("更新成功",2);
                    }
                  }
                )
                .then(
                    // 每次操作都会更新全体数据，不用错误处理
                    () => { countryipAPI.getAllCIP().then((data) => this.setState({ 'dataSource': data.allcountryip })) }
                ).catch((err) => { message.error("更新失败", 2) });
        }
    }
    // 搜索框里面执行的函数
    handleSearch = (e) => {
        let dataSource = this.props.allCIP.filter((item) => {
            let string = Object.values(item).join();
            if (string.includes(e)) {
                return item;
            }

        })
        this.setState({ 'dataSource': dataSource })
    }

    handleChange = (e) => {
        let dataSource = this.props.allCIP.filter((item, i) => {
            let string = Object.values(item).join();
            if (string.includes(e.currentTarget.value)) {
                return item;
            }

        })

        this.setState({ 'dataSource': dataSource })

    }

    handleSelect = (record, selected, selectedRows, nativeEvent) => {
        // console.log(record, selected, selectedRows, nativeEvent);
        // 设置选择的字符串传到上层组件
        let selectedCountrys = '';
        selectedRows.map((item) => {
            selectedCountrys = selectedCountrys + item.country + ' ';
        })
        this.setState({ selectedOptions: selectedCountrys });
        this.props.selected(selectedCountrys);

    }

    handleSelectAll = (selected, selectedRows, changeRows) => {
        // console.log(selected,selectedRows);
        // 设置选择的字符串传到上层组件
        let selectedCountrys = '';
        selectedRows.map((item) => {
            selectedCountrys = selectedCountrys + item.country + ' ';
        })
        this.setState({ selectedOptions: selectedCountrys });
        this.props.selected(selectedCountrys);

    }
    showSelectedAllOfAll = () => {
        this.setState({ 'beSelectedTitle': !this.state.beSelectedTitle });
    }
    click = () => {
        this.props.selectedAllOfAll();
    }
    // 以下是生命周期函数
    componentWillReceiveProps(nextProps) {
        if (this.props.allCIP.length === 0) {
            this.setState({ dataSource: nextProps.allCIP, count: nextProps.allCIP.length });
        }
    }
    componentDidMount() {
        this.setState({ dataSource: this.props.allCIP, count: this.props.allCIP.length });
    }
    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        if (this.columns[this.columns.length - 1].title === "..." && this.props.shrinked === true) {
            this.columns.pop();
            this.columns.unshift({
                title: '代码',
                align: 'center',
                dataIndex: 'code'
            });
            this.columns.push({
                title: '备注',
                align: 'center',
                dataIndex: 'remark'
            });
            this.columns = this.columns.map((col) => {
                return { ...col, editable: true }
            });
            this.columns.push({
                title: '操作',
                align: 'center',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        this.state.dataSource.length >= 1 ?
                        <div>
                          <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record.key)} cancelText="取消" okText="确定">
                            <a href="#delete">删除</a>
                          </Popconfirm>
                        </div> :
                        null
                    );
                },
            });
            this.columns = this.columns.map((col) => {
                return { ...col, className: 'column-country' }
            });
        } else if (this.columns[this.columns.length - 1].title === "操作" && this.props.shrinked === false) {
            this.columns.splice(2, 2, {
                title: '...',
                align: 'center',
                dataIndex: '...',
                render: (text, record) => {
                    return <span>...</span>
                }
            });
            this.columns.shift();
            this.columns = this.columns.map((col) => { return { ...col, className: '', editable: false } });
        }
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                // fixed:'right',

                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
              {
                this.props.shrinked===false?
                <div style={{display:'inline-block'}}>
                  <p onMouseEnter={this.showSelectedAllOfAll} onMouseLeave={this.showSelectedAllOfAll}>
                    <span style={this.state.beSelectedTitle?{fontSize:'0.8rem',lineHeight:'2.2rem',marginTop:'-2rem'}:{display:'none'}}>已选择的国家：</span>
                    <span style={this.state.beSelectedTitle?{display:'none'}:{fontSize:'0.8rem',lineHeight:'2.2rem',marginTop:'-2rem'}}> 
                      <a style={this.state.beSelectedTitle?{display:'none'}:{color:'#1890ff',lineHeight:'1.5rem'}} onClick={this.click}>
                        <Icon type="pushpin" theme="outlined" style={{fontSize:'1.2rem',marginRight:'0.4rem'}}/>
                        <span>显示所有国家区域</span>
                      </a>
                    </span>
                  </p>
                  <p>
                  {
                    this.state.selectedOptions.split(" ").map((item,i)=><b key={i} style={{color:'#1890ff'}}>{item} </b>)
                  }
                  </p>
                </div>
                :
                <Button onClick={this.handleAdd} style={{marginBottom:'1rem'}} type="primary">
                    添加一行
                </Button>
              }
              <ReturnIcon showShrinkIcon={this.props.returnIconShow} id="1" handleClick={this.props.handleShrink}></ReturnIcon>
              <Search placeholder="支持任意关键字查询或筛选" onChange={this.handleChange} onSearch={this.handleSearch} style={{marginBottom:10}}></Search>
              {
                this.props.shrinked===true?
                <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                size='small'
                />:
                <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                rowSelection={{type:'checkbox',onSelect:this.handleSelect,onSelectAll:this.handleSelectAll}}
                size='small'
                />
              }
          </div>
        );
    }
}

export default CountryipView;