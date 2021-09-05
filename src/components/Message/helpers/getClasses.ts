import classNames from 'classnames';
import styles from '../style/message.module.css';

export const getClasses = (isFromSelf: boolean) => {
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
