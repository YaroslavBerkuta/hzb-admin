import {
  finishUploadLinkReq,
  getUploadLinkReq,
} from "./../../../api/media/index";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import { awardsApi } from "../../../api/awards";
import { IFile } from "../../../typing";
import { presignedUploaderService } from "../../system/files.service";

export const saveAwards = async (params: any, file: any) => {
  try {
    const { data } = await awardsApi.create(params);

    if (file) {
      await saveFile(file, data.id);
    }
    message.success("Нагороду створено");
  } catch (error) {
    console.log("Awards save error:", error);
    message.error("Щось пішло не так");
  }
};

export const updateAwards = async (id: number, params: any) => {
  try {
    await awardsApi.update(id, params);
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
        getUploadLinkReq({ ...params, directory: "awards", parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
  }
};
