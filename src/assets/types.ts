export interface UserProps {
  id: string;
  username: string;
}

interface BaseMessageProps {
  id: string;
  senderId: string;
  createdAt: number;
  type: 'text' | 'image';
}

export interface TextMessageProps extends BaseMessageProps {
  type: 'text';
  content: string;
}

export interface ImageMessageProps extends BaseMessageProps {
  type: 'image';
  url: string;
  caption: string;
}

export type MessageProps = TextMessageProps | ImageMessageProps;
