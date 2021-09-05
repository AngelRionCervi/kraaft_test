import { TextMessageProps } from '../../assets/types';
import styles from './style/message.module.css';
import { TextFormatter } from './helpers';
import { MessageContentProps } from './types';

export const TextMessageContent = ({
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
