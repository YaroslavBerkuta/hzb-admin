/* eslint-disable @typescript-eslint/no-explicit-any */

import { message } from "antd";
import { categoriesApi } from "../../../api/categories";
import { IFile } from "../../../typing";
import { presignedUploaderService } from "../../system/files.service";
import {
  finishUploadLinkReq,
  getUploadLinkReq,
  removeMedia,
} from "../../../api/media";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const createCategory = async (
  formData: any,
  price: IFile | undefined,
  catalog: IFile | undefined,
  cover: IFile | undefined
) => {
  try {
    const { data } = await categoriesApi.store(formData);
    if (price) {
      await saveFile(price, data.id, "categoryPrice");
    }
    if (catalog) {
      await saveFile(catalog, data.id, "categoryCatalog");
    }
    if (cover) {
      await saveFile(cover, data.id, "categoryCover");
    }
    message.success("Категорію створено");
  } catch (error) {
    message.error("Щось пішло не так");
  }
};

export const updateCategory = async (
  id: number,
  formData: any,
  price: IFile | undefined,
  catalog: IFile | undefined,
  cover: IFile | undefined,
  removeFile: any[]
) => {
  try {
    await categoriesApi.update(id, formData);
    if (removeFile.length > 0) {
      await removesFile(removeFile);
    }
    if (price) {
      await saveFile(price, id, "categoryPrice");
    }
    if (catalog) {
      await saveFile(catalog, id, "categoryCatalog");
    }
    if (cover) {
      await saveFile(cover, id, "categoryCover");
    }
    message.success("Категорію оновленно");
  } catch (error) {
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
