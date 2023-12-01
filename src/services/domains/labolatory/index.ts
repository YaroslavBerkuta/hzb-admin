/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import { presignedUploaderService } from "../../system/files.service";
import { IFile } from "../../../typing";
import {
  finishUploadLinkReq,
  getUploadLinkReq,
  removeMedia,
} from "../../../api/media";
import { labolatoryApi } from "../../../api/labolatory";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const labolatoryCreate = async (param: any, files: any[]) => {
  try {
    const { data } = await labolatoryApi.create(param);
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
        getUploadLinkReq({ ...params, directory: "labolatory", parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
  }
};

export const updateLabolatory = async (
  id: number,
  data: any,
  removeFile: any[],
  files: any[]
) => {
  try {
    await labolatoryApi.update(id, data);
    if (removeFile.length > 0) {
      await removesFile(removeFile)
    }
    if (files.length > 0) {
      for await (const i of files) {
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
