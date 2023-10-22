/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "antd";
import { newsApi } from "../../../api/news";
import { presignedUploaderService } from "../../system/files.service";
import { finishUploadLinkReq, getUploadLinkReq } from "../../../api/media";
import { IFile } from "../../../typing";

export const saveNews = async (params: any, file: any) => {
  try {
    const { data } = await newsApi.store(params);
    if (file) {
      console.log("file:", file);
      await saveFile(file, data.id);
    }
    message.success("Новину створено");
  } catch (error) {
    console.log("news save error:", error);
    message.error("Щось пішло не так");
  }
};

const saveFile = async (file: IFile, parentId: number) => {
  try {
    await presignedUploaderService.upload(
      file,
      (params: any) =>
        getUploadLinkReq({ ...params, directory: "news", parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
  }
};
