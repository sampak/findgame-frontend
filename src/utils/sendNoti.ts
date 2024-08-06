import { toast } from 'react-toastify';

export enum NotiType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export const sendNoti = (message: string, type: NotiType) => {
  toast(message, {
    hideProgressBar: true,
    type: type,
  });
};
