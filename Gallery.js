/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';

import {AppRegistry} from 'react-native';
import DeckSwiperExample from "./DeckSwiperExample";
import ListDownExample from "./ListDownExample";
import variables from "./ext/variables";


const activeBStyle = {
//flex:1,
color: variables.tabBarActiveTextColor,
//fontSize: variables.tabBarTextSize,
lineHeight: 16,
}
const bStyle = {
//flex:1,
color: variables.tabBarTextColor,
//fontSize: variables.tabBarTextSize,
lineHeight: 16,
}

class Gallery extends Component {
    constructor(props){
        super(props);
        this.state={
            viewNum: 1,
        }
        this.onSelectExample = this.onSelectExample.bind(this);
        this.onLayout = this.onLayout.bind(this);
        // this.view1 = <DeckSwiperExample/>;
        // this.view2 = <ListDownExample/>;
    }

    onSelectExample(val){
        console.log("onSelectExample ",val);
        this.setState({viewNum: val})
    }

onLayout(event) {
    width = event.nativeEvent.layout.width;
    height = event.nativeEvent.layout.height;
    if (this.state.width !== width || this.state.height !== height)
        this.setState({width: width, height: height});
    }

    render() {
        var view = <Text></Text>;
        if(this.state.viewNum===1) view = <DeckSwiperExample rootState={this.state} />;
        if(this.state.viewNum===2) view = <ListDownExample rootState={this.state} />;
        return (
            <View  style={{flex:1,alignItems: "stretch",flexDirection: "column"}} onLayout={this.onLayout}>
                <View style={{flex:10,  alignItems: "stretch",justifyContent: 'center'}}>
                    {view}
                </View>
                <View style={{zIndex :2, flex:1, alignItems:"stretch",flexDirection: "row"
                }}>
                    <TouchableOpacity activeOpacity={0.7} style={{flex:1,alignItems:"center",justifyContent: 'center',
                            backgroundColor: variables.footerDefaultBg,
                            borderColor: variables.btnDisabledBg,
                            borderWidth: (this.state.viewNum===1)?variables.borderWidth * 2:0,
                        }}  onPress={ () => {this.onSelectExample(1)} } >
                        <Text  style={(this.state.viewNum===1)?activeBStyle:bStyle} >Swipe Left-Righ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={{flex:1,alignItems:"center",justifyContent: 'center',
                            backgroundColor: variables.footerDefaultBg,
                            borderColor: variables.btnDisabledBg,
                            borderWidth: (this.state.viewNum===2)?variables.borderWidth * 2:0,
                        }} onPress={ () => {this.onSelectExample(2)} } >
                            <Text  style={(this.state.viewNum===2)?activeBStyle:bStyle} >Click it</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default  Gallery;
