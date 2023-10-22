import { http } from "../http.service";
import {
  GetLinkToUploadFilePayload,
  IGetMediaListResponse,
  FinishFileUploadPayload,
} from "./interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getMediaListReq = (params: any) => {
  return http.get<IGetMediaListResponse>("/admin/media", params);
};

export const getUploadLinkReq = (payload: GetLinkToUploadFilePayload) => {
  return http.put<any>("/file-store/start-upload-file", payload);
};
export const finishUploadLinkReq = (payload: FinishFileUploadPayload) => {
  return http.put("/file-store/finish-upload-file", payload);
};
