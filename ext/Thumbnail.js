import React, { Component } from 'react';
import { Image } from 'react-native';

import variable from './variables';


class Thumbnail extends Component {

  render() {
    return (
      <Image ref={c => this._root = c} style={{
          width: (this.props.size) ? this.props.size : 36,
          height: (this.props.size) ? this.props.size : 36,
          borderRadius: (this.props.size) ? ((this.props.square) ? 0
          : (this.props.size / 2)) : ((this.props.square) ? 0 : 18),
      }} source={this.props.source} />
    );
  }
}


export default Thumbnail;
