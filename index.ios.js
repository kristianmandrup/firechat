/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var NativeLayout = require('react-native-layout');

var {
  BorderLayout,
	Center,
  Footer,
	Header,
	HorizontalLinearLayout,
	LinearLayout,
	VerticalLinearLayout
} = NativeLayout;

var { Fill, Top, Left, Right, Bottom } = BorderLayout;

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

// 'https://nanochat.firebaseio.com/chat'
const chatEndPoint = 'https://tecla-firechat.firebaseio.com/';

var FireChatNative = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      items: [],
      userName: 'Kris'
    };
  },
  componentWillMount: function() {
    Firebase.enableLogging(true);
    this.ref = new Firebase(chatEndPoint);
    this.ref.on('value', function(snapshot) {
      var items = [];
      snapshot.forEach(function(child) {
        items.push(child.val());
      });
      this.setState({ 'items': items });
    }.bind(this));
  },
  _onPressButton: function() {
    this.ref.push({ name: this.state.userName, message: this.state.text || '' });
  },
  _onChangeName: function(value, x) {
    console.log('name', value, x);
  },
  render: function() {
    return (
      <Fill>
        <Top>
          <View style={styles.toolbar}>
              <Text style={styles.toolbarButton}>Menu</Text>
              <Text style={styles.toolbarTitle}>Fire Chat</Text>
              <Text style={styles.toolbarButton}>Settings</Text>
          </View>     
          <Left style={styles.nameContainer}>
            <Text style={styles.nameLabel}>
              Name
            </Text>
          </Left>
          <Right>
            <TextInput style={styles.nameInput}
                        placeholder={"Your name"}
                        value={this.state.userName}
                        onChangeText={ (text) => this.setState({ userName: text }) } 
                        clearButtonMode={"always"}
                        clearTextOnFocus={true}
                        maxLength={20}
                        enablesReturnKeyAutomatically={true}
                        returnKeyType={"go"}
            />
          </Right>
        </Top>
        <View>
          {this.state.items.map(createItem)}
        </View>
        <Bottom>
          <Left>
            <TextInput style={styles.messageInput}
                        value={this.state.text} 
                        onChangeText={ (text) => this.setState({ text: text}) }
                        onSubmitEditing={this._onPressButton}
                        clearButtonMode={"always"}
                        clearTextOnFocus={true}
                        maxLength={100}
                        multiline={true}
                        numberOfLines={2}
                        placeholder={"Your message"}
                        enablesReturnKeyAutomatically={true}
                        returnKeyType={"send"}
            />
          </Left>
          <Right>
            <TouchableHighlight onPress={this._onPressButton} style={styles.sendButton}>
              <Text style={styles.sendButtonLabel}>Send</Text>
            </TouchableHighlight>
          </Right>
        </Bottom>
      </Fill>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  toolbar:{
      backgroundColor:'#81c04d',
      paddingTop:30,
      paddingBottom:10,
      flexDirection:'row'    //Step 1
  },
  toolbarButton:{
      width: 50,            //Step 2
      color:'#fff',
      textAlign:'center'
  },
  toolbarTitle:{
      color:'#fff',
      textAlign:'center',
      fontWeight:'bold',
      flex:1                //Step 3
  },  
  nameContainer: {
    flexDirection:'row',
    borderColor: 'red',
    borderWidth: 1
    
  },           
  nameLabel: {
    flex: 1
  },
  nameInput: {
    flex: 4,
    width: 200,
    borderWidth: 1,
    borderColor: "#00f",
    height: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  },  
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  messageContainer: {
    flexDirection:'row',
    borderColor: 'green',
    borderWidth: 1
  },  
  messageInput: {
    flex: 4,
    width: 200,    
    borderWidth: 1,
    borderColor: "#666",
    height: 40,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  sendButton: {
    flex: 1,    
    borderWidth: 2,
    backgroundColor: "#00f",   
    borderRadius: 10,
    padding: 4
  },
  sendButtonLabel: {
    color: '#fff',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('FireChatNative', () => FireChatNative);
