import React, { Component } from 'react';
import { Image,TouchableWithoutFeedback,View,Text } from 'react-native';
import {Animated, PanResponder } from 'react-native';
import Card from "./Card";

const cards = [
    {
        text: 'Card 1',
        name: '1',
        image: require('./img/1.jpg'),
    },
    {
        text: 'Card 2',
        name: '2',
        image: require('./img/2.jpg'),
    },
    {
        text: 'Card 3',
        name: '4',
        image: require('./img/3.jpg'),
    },
    {
        text: 'Card 4',
        name: '4',
        image: require('./img/4.jpg'),
    },
    {
        text: 'Card 5',
        name: '5',
        image: require('./img/5.jpg'),
    },
];

class ListDownExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aIndex:0,
            upImage: 0,
            downImage: 1,
            fadeAnim: new Animated.Value(0), // init opacity 0
            height: props.rootState.height,
            width:0,
        };
        this.onPress = this.onPress.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onStopAnimated = this.onStopAnimated.bind(this);
    }
    // componentDidMount() {
    //       Animated.timing(          // Uses easing functions
    //         this.state.fadeAnim,    // The value to drive
    //         {toValue: 1}            // Configuration
    //       ).start();                // Don't forget start!
    //   }

onPress(){
    if(this.blockOnPress)
        return;
    this.blockOnPress=true;
    //console.log("Start Animated");
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {toValue: 1,duration: 500}            // Configuration
  ).start(()=>{this.onStopAnimated()});                // Don't forget start!
}
onStopAnimated(){
    this.blockOnPress=false;
    this.setState( {
        aIndex: this.state.aIndex+1,
        fadeAnim: new Animated.Value(0),
        upImage: this.state.downImage,
        downImage: (this.state.downImage===cards.length-1) ? 0 : this.state.downImage+1,
        //fadeAnim: new Animated.Value(0)
    },()=>{
//Animated.timing(this.state.fadeAnim, {toValue: 0,duration: 0}).start()
    })
}

componentWillReceiveProps(props){
    //console.log("new props:",props);
    this.setState({
        height: props.rootState.width,
    });
}

measureView(event) {
  // //console.log('event.nativeEvent.layout.height: ', event.nativeEvent.layout.height);
  // this.setState({
  //         aIndex: 1,
  //         x: event.nativeEvent.layout.x,
  //         y: event.nativeEvent.layout.y,
  //         width: event.nativeEvent.layout.width,
  //         height: event.nativeEvent.layout.height
  //     })
  }

  renderItem(i,onPress){
      var item=cards[i]
      return(
        <Card key={i} rootState={this.props.rootState} item={item} title="Click Picture"/>

  );
  }

    render () {
        //console.log("!!!! RENDER");
        return (
            <View  ref={c => this._root = c} style={{flex:1,alignSelf:"stretch",justifyContent:'center',position: 'relative',  flexDirection: 'column'}}
                onStartShouldSetResponder={(evt) => true}
                onMoveShouldSetResponderCapture={() => false}
                onResponderRelease={() => {}}
                onResponderGrant={() => {
                    //console.log("onResponderGrant");
                    this.onPress();
                }}
                >
                            <View style={{flex:1,position: 'relative', flexDirection: 'column',alignSelf:"stretch",justifyContent:'center'}}>
                                <View key={this.state.aIndex+1} >
                                <Animated.View key={this.state.downImage}
                                    style={{
                                    position: 'absolute',  top: 0,  right: 0,   left: 0,
                                    opacity: this.state.fadeAnim,
                                    transform: [{
                                             translateY: this.state.fadeAnim.interpolate({
                                               inputRange: [0, 1],
                                               outputRange: [this.state.height,0]  // 0 : 150, 0.5 : 75, 1 : 0
                                             }),
                                           }],
                                        }}>
                                    {this.renderItem(this.state.downImage,null)}
                                </Animated.View>
                                </View>
                                <View key={this.state.aIndex}>
                                <Animated.View key={this.state.upImage}
                                    style={{
                                    opacity: this.state.fadeAnim.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [1, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                                    }),
                                    transform: [{
                                             translateY: this.state.fadeAnim.interpolate({
                                               inputRange: [0, 1],
                                               outputRange: [0, -this.state.height]  // 0 : 150, 0.5 : 75, 1 : 0
                                             }),
                                           }],
                                        }}>
                                    {this.renderItem(this.state.upImage,this.onPress)}
                                </Animated.View>
                                </View>

                            </View>
                </View>
        );
    }
}

export default ListDownExample;
