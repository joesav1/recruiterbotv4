import React, { Component } from 'react'
import { StyleSheet, WebView} from 'react-native';
import { MessageRequest } from './chatbot'
import WatsonIcon from './WatsonIcon'
import { GiftedChat } from 'react-native-gifted-chat';

export class chatbotShell extends Component {
  constructor (props) {
    super (props);

    this.state = {
      messages: [],
      conversationID: null,
      context: null,
    }
  }

  componentDidMount () {
    this.initialMessage();
  }

  render() {
    return (
      <GiftedChat
        placeholder="Send your message"
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        renderAvatar={this.renderAvatar}
        multiline={false}
        user={{
          _id: '1',
        }}
      />
    );
  }

  renderCustomView = (props) => {
    if (props.currentMessage.text.includes('Welcome')) {
      return (
        <View style={styles.container}>
          <Text>Welcome to your interview for the role, role.
          The interview will consist of questionNumber questions. Each question will last 4 minutes. Please do not attempt to copy and paste your answer as this will be flagged. 
          Treat this as a real interview as the Recruiter will be able to watch your responses back.  </Text>
        </View>
      );
    }
    return null;
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

const styles = StyleSheet.create({
});