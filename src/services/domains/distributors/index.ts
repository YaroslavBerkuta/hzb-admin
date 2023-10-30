/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "antd";
import { distributorApi } from "../../../api/regions/intex";

export const createDistributot = async (data: any) => {
  try {
    await distributorApi.store(data);
    message.success("Дистрибюьор створений");
  } catch (error) {
    console.log(error);
    message.error("Щось пішло не так");
  }
};
