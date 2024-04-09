/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "antd";
import { distributorApi } from "../../../api/regions/intex";

export const createDistributot = async (data: any) => {
  try {
    await distributorApi.store(data);
    message.success("Дистриб\'ютор створений");
  } catch (error) {
    console.log(error);
    message.error("Щось пішло не так");
  }
};

export const updateDistributot = async (id: number, payload: any) => {
  try {
    await distributorApi.update(id, payload);
    message.success("Дистриб\'ютор оновлений");
  } catch (error) {
    console.log(error);
    message.error("Щось пішло не так");
  }
};
