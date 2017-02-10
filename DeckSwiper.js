import React, { Component } from 'react';
import clamp from 'clamp';
import { Image,TouchableOpacity,View } from 'react-native';
import {Animated, PanResponder } from 'react-native';
var SWIPE_THRESHOLD = 120;
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

class DeckSwiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aIndex: 1,
            dropImage: cards.length-1,
            upImage: 0,
            downImage: 1,
            pan: new Animated.ValueXY(),
            fadeAnim: new Animated.Value(0), // init opacity 0
            height:0,
            width:0,
        };
        this._blockSwipe=true;
        this.onPress = this.onPress.bind(this);
        this.onStopAnimated = this.onStopAnimated.bind(this);
        this.swipe = this.swipe.bind(this);
    }
    _resetState(){

    }

onPress(){
    if(this.blockOnPress)
        return;
    this.blockOnPress=true;
    //console.log("Start Animated");
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {toValue: (this.state.fadeAnim._value>0)?this.state.width:-this.state.width,duration: 500}            // Configuration
  ).start(()=>{this.onStopAnimated()});                // Don't forget start!
}
onStopAnimated(){
    this.blockOnPress=false;
    if(this._reverse)
    this.setState( {
        aIndex: this.state.aIndex-1,
        fadeAnim: new Animated.Value(0),
        dropImage: (this.state.dropImage===0) ? cards.length-1 : this.state.dropImage-1,
        upImage: this.state.dropImage,
        downImage: this.state.upImage,
        //fadeAnim: new Animated.Value(0)
    })
    else
    this.setState( {
        aIndex: this.state.aIndex+1,
        fadeAnim: new Animated.Value(0),
        dropImage: this.state.upImage,
        upImage: this.state.downImage,
        downImage: (this.state.downImage===cards.length-1) ? 0 : this.state.downImage+1,
        //fadeAnim: new Animated.Value(0)
    })
}

measureView(event) {
  //console.log('event.nativeEvent.layout.height: ', event.nativeEvent.layout.height);
  this.setState({
          x: event.nativeEvent.layout.x,
          y: event.nativeEvent.layout.y,
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height
      })
  }

    render () {
        return (
            <View ref={c => this._root = c} style={{flex:1, position: 'relative', flexDirection: 'column'}}
                onLayout={(event) => this.measureView(event)}
                {...this._panResponder.panHandlers}
                >
                                <Animated.View
                                    //{...this._panResponder.panHandlers}
                                    key={this.state.aIndex-1}
                                    style={{
                                        position: 'absolute',  top: 0,  right: 0,   left: 0,
                                    //opacity: 1-this.state.fadeAnim,

                                    opacity: this.state.fadeAnim.interpolate({
                                             inputRange: [-this.state.width, 0, this.state.width],
                                             outputRange: [0, 0, 1]  // 0 : 150, 0.5 : 75, 1 : 0
                                           })
                                        }}>
                                    {this.props.renderItem(cards[this.state.dropImage],()=>{this._blockSwipe=false;this.onPress()})}
                                </Animated.View>

                                <Animated.View
                                    //{...this._panResponder.panHandlers}
                                     key={this.state.aIndex+1}
                                    style={{
                                        position: 'absolute',  top: 0,  right: 0,   left: 0,
                                    //opacity: 1-this.state.fadeAnim,

                                    opacity: this.state.fadeAnim.interpolate({
                                             inputRange: [-this.state.width, 0, this.state.width],
                                             outputRange: [1, 0, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                                           })
                                        }}>
                                    {this.props.renderItem(cards[this.state.downImage],()=>{this._blockSwipe=false;this.onPress()})}
                                </Animated.View>
                                <Animated.View
                                    //{...this._panResponder.panHandlers}
                                     key={this.state.aIndex}
                                    style={{
                                                transform : [
                                                    {
                                                        translateX: this.state.fadeAnim.interpolate({
                                                            inputRange: [ -this.state.width, 0, this.state.width ],
                                                            outputRange: [-this.state.width, 0, this.state.width ] // 0 : 150, 0.5 : 75, 1 : 0
                                                        })
                                                    }, {
                                                        rotate: this.state.fadeAnim.interpolate({
                                                            inputRange: [ -320, 0, 320 ],
                                                            outputRange: ['-10deg', '0deg', '10deg']
                                                        })
                                                    } ,
                                                ],
                                           opacity: this.state.fadeAnim.interpolate({
                                             inputRange: [-this.state.width, 0, this.state.width],
                                             outputRange: [0, 1, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                                           })
                                        }}>
                                    {this.props.renderItem(cards[this.state.upImage])}
                                </Animated.View>
                </View>
        );
    }
    swipe(x){
        this.state.fadeAnim=(x/this.state.width);
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({

            onStartShouldSetResponder: (evt) => true,
            onMoveShouldSetResponderCapture: () => this._swipeOn,
            onResponderRelease: () => {
                //console.log("onResponderRelease");
                this._swipeOn=true;
            },
            onResponderGrant: () => {
                if(!this._swipeOn)
                    return false;
                //console.log("onResponderGrant");
            },
            onResponderMove: (event) => {
                //console.log("onResponderMove");
            },
            onPanResponderStart: (event,gestureState) => {
             //console.log("onPanResponderStart");
             this._swipeOn=true
             this._gestureStartDx=gestureState.dx;
            },
            onPanResponderEnd: () => {
                //console.log("onPanResponderEnd");
                this._swipeOn=false;
                this._gestureStartDx=0;
            },

            //onShouldBlockNativeResponder: () => {return false},
            onStartShouldSetPanResponder: () => {return true},
            onMoveShouldSetPanResponder: () => {return this._swipeOn},
            // onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            //     return Math.abs(gestureState.dx) > 5;
            //     //return !this._blockSwipe;
            // },
            //
            // onStartShouldSetResponder: (evt) => true,
            // onMoveShouldSetResponderCapture: () => false,
            // onResponderRelease: () => {//console.log("onResponderRelease");},
            // onResponderGrant: () => {//console.log("onResponderGrant");},
            ////


            onPanResponderGrant: (e, gestureState) => {
                //console.log("onPanResponderGrant");
                //this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                //this.state.pan.setValue({x: 0, y: 0});
                // this.state.pan.addListener((pVal)=>{//console.log("11111:"+pVal);});
            },


            onPanResponderMove: (e, gestureState) => {
                if(!this._swipeOn)
                    return;
                var dx=gestureState.dx-this._gestureStartDx
                //console.log("onPanResponderMove ",gestureState.dx," ",this._gestureStartDx," ",dx);

                let val = dx;//*.0013//Math.abs((gestureState.dx*.0013));
                if(val>0)
                    this._reverse=true
                else
                    this._reverse=false
                //let opa = Math.abs((gestureState.dx*.0022));
                ////console.log("val:"+val);
                if (val>0.2) {
                    val = 0.2;
                }
                //this.state.pan._x=val;

                // Animated.timing(
                //     this.state.fadeAnim,
                //     {toValue: 0+val}
                // ).start();
                // Animated.spring(
                //     this.state.enter,
                //     { toValue: 0.8+val, friction: 7 ,tension: -10,}
                // ).start();
                Animated.event([
                    null, {dx: this.state.fadeAnim},
                ])(e, {dx:dx});
                //])(e, gestureState)
            },

            onPanResponderRelease: (e, {vx, vy}) => {
                //console.log("onPanResponderRelease");
                // this._blockSwipe=true;
                // if(this.props.onSwiping)
                //   this.props.onSwiping(null);
                // var velocity;
                //
                // if (vx >= 0) {
                //     velocity = clamp(vx, 4.5, 10);
                // } else if (vx < 0) {
                //     velocity = clamp(vx * -1, 4.5, 10) * -1;
                // }

                //if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
                ////console.log("this.state.fadeAnim: "+this.state.fadeAnim._value);
                    if (Math.abs(this.state.fadeAnim._value/this.state.width) >= 0.2) {
                    this.onPress()
                    // Animated.timing(
                    //     this.state.fadeAnim,
                    //     {toValue: (velocity<0)? -1 : 1,duration: 500}
                    // ).start(this._resetState.bind(this));
                    //]).start(this._resetState.bind(this));
                } else {
                    Animated.spring(this.state.fadeAnim, {
                        toValue: 0,
                        friction: 4,
                    }).start()
                }
            }
        })
    }
}

export default DeckSwiper;
