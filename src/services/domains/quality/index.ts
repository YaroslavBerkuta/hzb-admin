/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import { qualityApi } from "../../../api/quality";
import { presignedUploaderService } from "../../system/files.service";
import { IFile } from "../../../typing";
import {
  finishUploadLinkReq,
  getUploadLinkReq,
  removeMedia,
} from "../../../api/media";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const createQuality = async (param: any, files: any[]) => {
  try {
    const { data } = await qualityApi.create(param);
    if (files.length > 0) {
      for await (const i of files) {
        await saveFile(i.originFileObj, data.id);
      }
    }
    message.success("Створено");
  } catch (error) {
    message.error("Щось пішло не так");
  }
};

const saveFile = async (file: IFile, parentId: number) => {
  try {
    await presignedUploaderService.upload(
      file,
      (params: any) =>
        getUploadLinkReq({ ...params, directory: "quality", parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
  }
};

export const updateQuality = async (
  id: number,
  data: any,
  removeFile: any[],
  file: any[]
) => {
  try {
    await qualityApi.update(id, data);
    if (removeFile.length > 0) {
      await removesFile(removeFile);
    }
    if (file.length > 0) {
      for await (const i of file) {
        await saveFile(i.originFileObj, data.id);
      }
    }
  } catch (error) {
    message.error("Щось пішло не так");
  }
};

const removesFile = async (ids: any[]) => {
  try {
    await removeMedia(ids);
  } catch (error) {
    console.log("news save error:", error);
    message.error("Щось пішло не так");
  }
};
