import React, { PropTypes } from 'react'
import Thumbnail from "./ext/Thumbnail"

import { Image,View,Text,TouchableWithoutFeedback,Dimensions } from 'react-native';
import variables from "./ext/variables"

const cStyle ={
    marginVertical: 5,
    marginHorizontal: 2,
    flex: 1,
    borderWidth: variables.borderWidth,
    borderRadius: 2,
    borderColor: variables.cardBorderColor,
    flexWrap: 'wrap',
    backgroundColor: variables.cardDefaultBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    justifyContent: "flex-start",
};

const ciStyle ={
flex: 1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-around',
paddingTop:10
}

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgHeight:this.calcHeight()
        }
        this.measureView = this.measureView.bind(this);
        this.calcHeight = this.calcHeight.bind(this);
        console.log("create Card "+props.item.name);
    }

    measureView(event) {
      console.log('event.nativeEvent.layout.width: ', event.nativeEvent.layout.width);
      console.log('event.nativeEvent.layout.height: ', event.nativeEvent.layout.height);
      var w = event.nativeEvent.layout.width;
      var h = event.nativeEvent.layout.height;
      if(this.state.imgHeight!==this.calcHeight())
      this.setState({
            imgHeight: this.calcHeight(),
            //h: Dimensions.get('window').height,
            //   x: event.nativeEvent.layout.x,
            //   y: event.nativeEvent.layout.y,
            //   width: event.nativeEvent.layout.width,
            //   height: event.nativeEvent.layout.height
          })
      }

     calcHeight(){
         var w = Dimensions.get('window').width
         var h = Dimensions.get('window').height

         return ((w>h)?h:w)-100;
     }

    render () {
        var item=this.props.item;
        return(
            <View key={"dv-"+item.name} style={cStyle} >
                <View style={ciStyle}>
                    <Thumbnail source={item.image} />
                    <Text style={{marginRight: 20}}>     {item.text}</Text>
                    <Text note>{this.props.title}</Text>
                </View>
                <View style={ciStyle}>
                    <Image key={"dvi"+this.props.item.name} style={{ resizeMode: 'contain', width: null, flex: 1,
                        height: (this.props.rootState.width>this.props.rootState.height)?this.props.rootState.height-100 : this.props.rootState.width-100
                    }} source={this.props.item.image} />
                </View>
            </View>
        )
    }
}

export default Card;
