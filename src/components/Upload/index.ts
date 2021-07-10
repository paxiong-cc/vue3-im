export type UploadStatus = '' | 'loading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
}
