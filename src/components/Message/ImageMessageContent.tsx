import { ImageMessageProps } from '../../assets/types';
import styles from './style/message.module.css';
import { TextFormatter } from './helpers';
import { MessageContentProps } from './types';

export const ImageMessageContent = ({
  message,
  classes,
}: MessageContentProps & { message: ImageMessageProps }) => {
  return (
    <div className={classes.content}>
      <img className={classes.image} src={message.url} alt={message.url} />
      <p className={styles.messageText}>
        <TextFormatter>{message.caption}</TextFormatter>
      </p>
    </div>
  );
};
