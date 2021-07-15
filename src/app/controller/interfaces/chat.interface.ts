export interface ChatRoom {
  docId: string;
  chatName: string;
  timestamp: Timestamp;
  carerUid: string;
  read: boolean;
  elderlyUsername: string;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface ContentMessage {
  message: MessageElderly[];
  timestamp: Timestamp;
}

export interface MessageElderly {
  imageUrl: string;
  pictogramCarerId: number;
  name: string;
  helperId?: number;
  position: number;
  pictogramId: number;
  color: string;
  subcategoryId?: number;
}
