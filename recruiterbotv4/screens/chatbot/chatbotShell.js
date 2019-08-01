import React, { Component } from 'react'
import { View, StyleSheet, WebView, Text} from 'react-native';
import { MessageRequest } from './chatbot'
import WatsonIcon from './WatsonIcon'
import { GiftedChat } from 'react-native-gifted-chat';
import CountDown from 'react-native-countdown-component';
import firebase from 'firebase';
import '@firebase/firestore';

const styles = StyleSheet.create({
  container: { flex: 1 },
})
export class chatbotShell extends Component {
  constructor (props) {
    super (props);

    //Dont get rid of this one
    let testingUser = firebase.auth().currentUser
    console.log("chtbotshell! CHecking if testing user exists 1")
    console.log(testingUser)
    console.log("chatbotshell! ENd of test")

    this.ref = firebase.firestore().collection('users').doc(testingUser.uid).collection('tasks')

    this.state = {
      messages: [],
      conversationID: null,
      context: null,
      docIDMAIN: props.navigation.state.params.docIDMain
    }
  }

  componentDidMount () {
    this.initialMessage();
  }

  endOfTimer() {
    this.ref.doc(this.state.docIDMAIN).update({
      completed: true,
    })
    this.props.navigation.navigate('chatbotHoldingPage', {messagesPass: this.state.messages, docIDTask: this.state.docIDMAIN})
  }

  CollateMessages() {
    let messagesCollated = []
    for( i in this.state.messages) {
      messagesCollated.push(i.text)
    }
    console.log("Checking messages collated ")
  }

  render() {
    // console.log("CHecking if docIDMAIN works, chatbotshell.js")
    // console.log(this.state.docIDMAIN)
    // console.log("End of docidmain check")

    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel='main'
      >
        <CountDown style={{marginTop: 80}}
            until={40}
            size = {20}
            timeToShow={['M','S']}
            onFinish={() => {this.endOfTimer()}}
        />

        <GiftedChat 
          placeholder="Send your message"
          //renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderAvatar={this.renderAvatar}
          multiline={false}
          user={{
            _id: '1',
          }}
        />
      </View>
    

    );
  }

  //do i need this?
  renderCustomView = (props) => {
    console.log(props.currentMessage.text)
      return (
        <View>   


          <Text>Welcome to your interview for the role, role.
          The interview will consist of questionNumber questions. Each question will last 4 minutes. Please do not attempt to copy and paste your answer as this will be flagged. 
          Treat this as a real interview as the Recruiter will be able to watch your responses back.  </Text>
        </View>
      );
    }


  onSend = (message = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }), () => {
      this.getMessage(message[0].text.replace(/[\n\r]+/g, ' '), );
    });
  }

  initialMessage = async () => {
    let response = await MessageRequest("");
    this.setState({
      context: response.context,
    })
    let mainText = ['Welcome to your interview', 'This will be line 2', 'this will be line 3',"\n\n"]
    let message = {
      _id: Math.round(Math.random() * 1000000).toString(),
      text: mainText.join("\n") + response.output.text.join(' '),
      createdAt: new Date(),
      user: {
        _id: '2',
        name: 'Watson Assistant',
      },
      //image: 'https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/d4IAAOSw-CpX~8b~/$_35.JPG',
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  }

  getMessage = async (text) => {
    let response = await MessageRequest(text, this.state.context);
      this.setState({
        context: response.context,
      })
    let message = {
      _id: Math.round(Math.random() * 1000000).toString(),
      text: response.output.text.join(' '),
      createdAt: new Date(),
      user: {
        _id: '2',
        name: 'Watson Assistant',
      },
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  }

  renderAvatar = () => {
    return (
      <WatsonIcon />
    );
  }
}

export default chatbotShell

