import { message } from "antd";
import { partnerApi } from "../../../api/partners";
import { presignedUploaderService } from "../../system/files.service";
import { IFile } from "../../../typing";
import {
  finishUploadLinkReq,
  getUploadLinkReq,
  removeMedia,
} from "../../../api/media";

export const savePartner = async (params: any, file: any) => {
  try {
    const { data } = await partnerApi.store(params);
    if (file) {
      await saveFile(file, data.id);
    }
    message.success("Партнера створено");
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
        getUploadLinkReq({ ...params, directory: "partner", parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
  }
};

export const updatePartner = async (
  id: number,
  params: any,
  removeFile: any[],
  file: any
) => {
  try {
    await partnerApi.update(id, params);
    if (removeFile.length > 0) {
      await removesFile(removeFile)
    }
    if (file) {
      await saveFile(file, id);
    }
  } catch (error) {
    console.log("news save error:", error);
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
