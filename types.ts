
export interface TranscriptionItem {
  id: string;
  text: string;
  sender: 'user' | 'model';
  timestamp: Date;
}

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}
