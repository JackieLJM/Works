import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import GradeAnaly from '../home/GradeAnaly';
import TimesAnaly from '../home/TimesAnaly';
import WrongCollection from '../home/WrongCollection';
import IExercises from '../home/IExercises';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    _openIndexItem(title, component) {
        this.props.navigator.push({
            title: title,
            component: component
        })
    }
    _banner(){

    }
    _indexItem() {
        return (
            <view>
                <TouchableOpacity onPress={this._openIndexItem.bind('成绩分析', GradeAnaly)}>
                    <View>
                        <Image source={require("../images/menu1-grade")}/>
                        <Text>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._openIndexItem.bind('历次分析', TimesAnaly)}>
                    <View>
                        <Image source={require("../images/menu1-times")}/>
                        <Text>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._openIndexItem.bind('错题本', WrongCollection)}>
                    <View>
                        <Image source={require("../images/menu3-wrong.png")}/>
                        <Text>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._openIndexItem.bind('I习题', IExercises)}>
                    <View>
                        <Image source={require("../images/menu4-iExe.png")}/>
                        <Text>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </view>
        )
    }


    render() {
        return (
            <view>
                {this._banner.bind(this)}
                {this._indexItem.bind(this)}
            </view>
        )

    }
}

const styles = StyleSheet.create({
    indexItem: {
        flex: 1,
    }
});