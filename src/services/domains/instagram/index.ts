import { message } from "antd";
import { instagramApi } from "../../../api/instagram";
import { presignedUploaderService } from "../../system/files.service";
import { IFile } from "../../../typing";
import {
  finishUploadLinkReq,
  getUploadLinkReq,
  removeMedia,
} from "../../../api/media";

export const createInstagram = async (param: any, file: any) => {
  try {
    const { data } = await instagramApi.create(param);

    if (file) {
      await saveFile(file.originFileObj, data?.id, "instagram");
    }
  } catch (error) {
    console.log(error);
    message.error("Щось пішло не так");
  }
};

export const updateInstagram = async (
  id: number,
  data: any,
  file: any,
  removeFile: any[]
) => {
  try {
    await instagramApi.update(id, data);
    if (file) {
      await saveFile(file.originFileObj, data?.id, "instagram");
    }
    if (removeFile.length > 0) {
      await removesFile(removeFile);
    }
  } catch (error) {
    console.log(error);
    message.error("Щось пішло не так");
  }
};

const saveFile = async (file: IFile, parentId: number, directory: string) => {
  try {
    await presignedUploaderService.upload(
      file,
      (params: any) => getUploadLinkReq({ ...params, directory, parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
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
