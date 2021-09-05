import { useEffect, useRef } from 'react';
import { Message } from './Message';
import { useMessages } from './providers';

interface ConversationProps {
  className: string;
}

const Conversation = ({ className }: ConversationProps) => {
  const conversationElem = useRef<HTMLDivElement>(null);
  const { messages } = useMessages();

  useEffect(() => {
    if (conversationElem?.current) {
      conversationElem.current.scrollTop =
        conversationElem.current.scrollHeight;
    }
  }, [conversationElem, messages]);

  return (
    <div ref={conversationElem} className={className}>
      {messages
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((message) => (
          <Message key={message.id} message={message} />
        ))}
    </div>
  );
};

export default Conversation;
