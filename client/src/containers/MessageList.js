import {connect} from 'react-redux'
import MessageListsComponent from '../components/MessagesList'

export const MessageList = connect(state=>({
    messages: state.messages
}), {})(MessageListsComponent)