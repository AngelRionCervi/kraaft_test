import { ReactElement } from 'react';
import {
  ImageMessageProps,
  MessageProps,
  TextMessageProps,
} from '../../assets/types';
import { FALLBACKS } from '../../constants';
import { formatDate } from '../../lib';
import styles from './style/message.module.css';
import { useCurrentUser, useUsers } from '../providers';
import { TextMessageContent, ImageMessageContent } from '.';
import { getClasses } from './helpers';

interface MessageComponentProps {
  message: MessageProps;
}

export const Message = ({ message }: MessageComponentProps) => {
  const currentUser = useCurrentUser();
  const users = useUsers();

  const isFromSelf = message.senderId === currentUser?.id;
  const classes = getClasses(isFromSelf);
  const messageAuthor =
    users?.find((user) => user.id === message.senderId)?.username ??
    FALLBACKS.username;

  const contentMap: Record<MessageProps['type'], ReactElement> = {
    text: (
      <TextMessageContent
        message={message as TextMessageProps}
        classes={classes}
      />
    ),
    image: (
      <ImageMessageContent
        message={message as ImageMessageProps}
        classes={classes}
      />
    ),
  };

  return (
    <div className={classes.container}>
      <div className={styles.username}>{messageAuthor}</div>
      {contentMap[message.type]}
      <div className={styles.createdDate}>{formatDate(message.createdAt)}</div>
    </div>
  );
};
