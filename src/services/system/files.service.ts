/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { IFile } from "../../typing";

interface Params {
  filename?: string;
  mimetype?: string;
  [key: string]: any;
}

export interface GetPresignedUrlReqResponse {
  presignedUrl: string;
  uploadId: string;
}

type GetPresignedUrlReq = (
  params: any
) => Promise<AxiosResponse<GetPresignedUrlReqResponse>>;

type FinishUploadReq = (payload: { uploadId: string }) => Promise<any>;

class PresignedUploaderService {
  public async upload(
    file: IFile,
    getUrlReq: GetPresignedUrlReq | any,
    finishReq: FinishUploadReq | any
  ): Promise<any> {
    const { presignedUrl, uploadId } = await this.getLink(getUrlReq, {
      filename: file.name,
      type: file.type,
    });

    await this.uploadFile(presignedUrl, file);
    return await this.endUpload(uploadId, finishReq);
  }

  private async getLink(getUrlReq: GetPresignedUrlReq, params: Params) {
    const { data } = await getUrlReq(params);
    return data;
  }

  private async uploadFile(url: string, file: any) {
    await fetch(url, {
      method: "PUT",
      body: file,
    });
  }

  private async endUpload(id: string, finishReq: FinishUploadReq) {
    try {
      await finishReq({ uploadId: id });
    } catch (error) {
      console.log(error);
    }
  }
}

export const presignedUploaderService = new PresignedUploaderService();
