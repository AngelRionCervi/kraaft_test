import React, { ReactElement, useRef } from 'react';
import classNames from 'classnames';
import {
  ImageMessageProps,
  MessageProps,
  TextMessageProps,
  UserProps,
} from '../../assets/types';
import { FALLBACK_USERNAME } from '../../constants';
import { formatDate } from '../../lib';
import styles from './style/message.module.css';
import { useCurrentUser, useUsers } from '../providers';

interface MessageComponentProps {
  key: string;
  message: MessageProps;
}

interface MessageContentProps {
  classes: Record<string, string>;
}

interface TextFormatterProps {
  children: string;
}

const getRecipientClasses = (isFromSelf: boolean) => {
  const {
    container,
    containerSelf,
    containerReply,
    content,
    contentSelf,
    contentReply,
    image,
    imageSelf,
    imageReply,
  } = styles;

  const getClass = (classSelf: string, classReply: string) =>
    isFromSelf ? classSelf : classReply;

  return {
    container: classNames(container, getClass(containerSelf, containerReply)),
    content: classNames(content, getClass(contentSelf, contentReply)),
    image: classNames(image, getClass(imageSelf, imageReply)),
  };
};

const TextFormatter = ({ children: text }: TextFormatterProps) => {
  const users = useUsers();
  console.log('useUsers textFormatter', users)
  for (const match of text.matchAll(/(?<!\w)@\w+/g)) {
    console.log(match);
  }
  return <>{text}</>;
  //return <>{children}</>;
};

const TextMessage = ({
  message,
  classes,
}: MessageContentProps & { message: TextMessageProps }) => {
  return (
    <div className={classes.content}>
      <p className={styles.messageText}>
        <TextFormatter>{message.content}</TextFormatter>
      </p>
    </div>
  );
};

const ImageMessage = ({
  message,
  classes,
}: MessageContentProps & { message: ImageMessageProps }) => {
  return (
    <div className={classes.content}>
      <img className={classes.image} src={message.url} alt={message.url} />
      <p className={styles.messageText}>{message.caption}</p>
    </div>
  );
};

export const Message = ({ message }: MessageComponentProps) => {
  const currentUser = useCurrentUser();

  const isFromSelf = message.senderId === currentUser?.id;
  const classes = getRecipientClasses(isFromSelf);
  const commonProps = { classes };

  const contentMap: Record<MessageProps['type'], ReactElement> = {
    text: (
      <TextMessage message={message as TextMessageProps} {...commonProps} />
    ),
    image: (
      <ImageMessage message={message as ImageMessageProps} {...commonProps} />
    ),
  };

  return (
    <div className={classes.container}>
      <div className={styles.username}>
        {currentUser?.username ?? FALLBACK_USERNAME}
      </div>
      {contentMap[message.type]}
      <div className={styles.createdDate}>{formatDate(message.createdAt)}</div>
    </div>
  );
};
