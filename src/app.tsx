import { useRef } from 'react';
import './app.css';
import { store } from './assets/store';
import { TextMessageProps } from './assets/types';
import Conversation from './components/Conversation';
import { useMessages } from './components/providers';

interface MessageInputProps {
  handleAddTextMessage: (content: string) => void;
}

const MessageInput = ({ handleAddTextMessage }: MessageInputProps) => {
  const inputElem = useRef<HTMLInputElement>(null);

  const submitMessage = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const message = new FormData(evt.target as HTMLFormElement).get(
      'message',
    ) as string;
    if (message) {
      handleAddTextMessage(message);
    }
    if (inputElem?.current) inputElem.current.value = '';
  };

  return (
    <div className="messageInputContainer">
      <span className="messageInput">
        <form
          className="messageForm"
          id="message_form"
          onSubmit={submitMessage}>
          <input
            ref={inputElem}
            className="inputMessageForm"
            name="message"
            type="text"
          />
        </form>
      </span>
      <button
        className="messageSendButton"
        type="submit"
        form="message_form"
        tabIndex={0}>
        Envoyer
      </button>
    </div>
  );
};

const App = () => {
  const { messages, dispatch: messageDispatch } = useMessages();

  const addTextMessage = (content: string) => {
    const newMessagePayload: TextMessageProps = {
      id: `newMessage-${messages.length}`,
      type: 'text',
      senderId: store.currentUserId,
      createdAt: new Date().getTime(),
      content,
    };
    messageDispatch({ type: 'newMessage', payload: newMessagePayload });

    // for fun
    if (content === 'hey') {
      const replyPayload = {
        ...newMessagePayload,
        senderId: store.users[2].id,
        id: `newReply-${messages.length}`,
      };
      setTimeout(() => {
        messageDispatch({ type: 'newMessage', payload: replyPayload });
      }, 1000);
    }
  };

  return (
    <div className="app">
      <header>Kraaft</header>
      <Conversation className="conversation" />
      <MessageInput handleAddTextMessage={addTextMessage} />
    </div>
  );
};

export default App;
