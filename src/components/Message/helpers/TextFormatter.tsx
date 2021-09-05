import React from 'react';
import { MESSAGE_TAG_START } from '../../../constants';
import styles from '../style/message.module.css';
import { useUsers } from '../../providers';

interface TextFormatterProps {
  children: string;
}

const formatTextWithTags = (text: string, usernamesOriginal: string[]) => {
  const usernames = [...usernamesOriginal].sort((a, b) => b.length - a.length);
  const textWithTags = text.split(MESSAGE_TAG_START);

  if (textWithTags.length === 1) return text;

  return textWithTags.reduce(
    (textWithTagsAcc: (string | React.ReactElement)[], textSplit, index) => {
      const taggedUsername = usernames.find(
        (username) => textSplit.indexOf(username) === 0,
      );

      if (taggedUsername) {
        const newString = textSplit.replace(taggedUsername, '');

        return [
          ...textWithTagsAcc,
          <span
            key={textWithTagsAcc.join('')}
            className={
              styles.taggedUsername
            }>{`${MESSAGE_TAG_START}${taggedUsername}`}</span>,
          newString,
        ];
      }

      return [
        ...textWithTagsAcc,
        `${index !== 0 ? MESSAGE_TAG_START : ''}${textSplit}`,
      ];
    },
    [],
  );
};

export const TextFormatter = ({ children: text }: TextFormatterProps) => {
  const users = useUsers();
  const usernames = users?.map((user) => user.username) ?? [];
  const textWithTags = formatTextWithTags(text, usernames);

  return <>{textWithTags}</>;
};
