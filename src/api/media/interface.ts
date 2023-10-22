import { IMedia } from "../../typing/interfaces/media.interface";

export interface IGetMediaListResponse {
  items: IMedia[];
  count: number;
}

export class GetLinkToUploadFilePayload {
  filename: string | undefined;
  type: string | undefined;
}

export class FinishFileUploadPayload {
  uploadId: string | undefined;
}
