
export type Message = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  // Additional fields for future enhancements
  isMarkdown?: boolean;
  attachments?: string[];
  referencedLinks?: string[];
};
