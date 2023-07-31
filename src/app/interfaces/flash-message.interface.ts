import { FlashMessageTypeEnum } from '../enums/flash-message-type.enum';

export interface FlashMessageInterface {
  text: string,
  type: FlashMessageTypeEnum,
}
