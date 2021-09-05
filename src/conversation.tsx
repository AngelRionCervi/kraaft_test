import { Message, User } from './assets/types';

interface Props {
  className: string;
  currentUserId: string;
  messages: Message[];
  users: User[];
}

const Conversation = (props: Props) => {
  const { className } = props;

  return <div className={className} />;
};

export default Conversation;
