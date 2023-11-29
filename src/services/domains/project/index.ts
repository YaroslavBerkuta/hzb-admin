/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "antd";
import { IFile } from "../../../typing";
import { presignedUploaderService } from "../../system/files.service";
import { finishUploadLinkReq, getUploadLinkReq } from "../../../api/media";
import { projectApi } from "../../../api/projects";

export const createProject = async (params: any, file: any) => {
  try {
    const { data } = await projectApi.create(params);

    if (file) {
      await saveFile(file, data.id);
    }
    message.success("Проект створено");
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
        getUploadLinkReq({ ...params, directory: "projects", parentId }),
      (params: any) => finishUploadLinkReq(params)
    );
  } catch (error) {
    console.log("error file:", error);
  }
};

export const updateProject = async (id: number, data: any) => {
  try {
    await projectApi.update(id, data);
  } catch (error) {
    console.log("news save error:", error);
    message.error("Щось пішло не так");
  }
};
