import { message } from "antd";
import { IFile } from "../../../typing";
import { presignedUploaderService } from "../../system/files.service";
import { finishUploadLinkReq, getUploadLinkReq } from "../../../api/media";
import { productionApi } from "../../../api/production";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createProduction = async (param: any, files: any[]) => {
  try {
    const { data } = await productionApi.store(param);

    if (files.length > 0) {
      for await (const i of files) {
        await saveFile(i.originFileObj, data.id);
      }
    }
  } catch (error) {
    message.error("Щось пішло не так");
  }
};

const saveFile = async (file: IFile, parentId: number) => {
  try {
    await presignedUploaderService.upload(
      file,
      (params: any) =>
        getUploadLinkReq({ ...params, directory: "productions", parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
  }
};
