/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "antd";

import { productApi } from "../../../api/products";
import { IFile } from "../../../typing";
import { presignedUploaderService } from "../../system/files.service";
import {
  finishUploadLinkReq,
  getUploadLinkReq,
  removeMedia,
} from "../../../api/media";

export const createProduct = async (param: any, gallery: any[], table: any) => {
  try {
    const { data } = await productApi.create(param);
    if (gallery.length > 0) {
      for await (const i of gallery) {
        await saveFile(i.originFileObj, data.id, "products");
      }
    }
    if (table) {
      console.log("table:", table);
      await saveFile(table.originFileObj, data.id, "productsTable");
    }
    message.success("Товар створено");
  } catch (error) {
    message.error("Щось пішло не так");
  }
};

export const updateProduct = async (
  id: number,
  params: any,
  removeFile: any[],
  gallery: any[],
  table: any
) => {
  try {
    await productApi.update(id, params);
    if (removeFile.length > 0) {
      await removesFile(removeFile);
    }
    if (gallery.length > 0) {
      for await (const i of gallery) {
        await saveFile(i.originFileObj, id, "products");
      }
    }
    if (table) {
      await saveFile(table.originFileObj, id, "productsTable");
    }
    message.success("Товар Оновлено");
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
