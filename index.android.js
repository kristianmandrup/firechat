/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} = React;

var createItem = function(item, index) {
  return <Text>{item.name}: {item.message}</Text>
};

var CoolProject = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      items: []
    };
  },
  componentWillMount: function() {
    Firebase.enableLogging(true);
    this.ref = new Firebase('https://nanochat.firebaseio.com/chat');
    this.ref.on('value', function(snapshot) {
      var items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.setState({ 'items': items });
    }.bind(this));
  },
  _onPressButton: function() {
    this.ref.push({ name: 'puf', message: this.state.text });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native and Firebase!
        </Text>
        {this.state.items.map(createItem)}
        <View style={styles.horizontal}>
          <TextInput onChangeText={(text) => this.setState({ text: text})} value={this.state.text} />
          <TouchableHighlight onPress={this._onPressButton}>
            <Text>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CoolProject', () => CoolProject);


'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class FireChatNative extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FireChatNative', () => FireChatNative);
