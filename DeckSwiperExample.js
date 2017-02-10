import React, { Component } from 'react';
import { Image,View,Text } from 'react-native';
import DeckSwiper from './DeckSwiper';
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




class DeckSwiperExample extends Component {
    render() {
        return (
                    <DeckSwiper 
                        dataSource={cards}
                        renderItem={(item, onPress) =>
                            <Card item={item} rootState={this.props.rootState} title="Swipe Picture" onPress={onPress} />
                        }
                    />
        );
    }
}
export default DeckSwiperExample;
