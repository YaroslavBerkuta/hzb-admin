/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, Upload, UploadFile, UploadProps, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateProductFrom, SelectCategory } from "./components";
import { Lang } from "../../typing/enums";
import { useForm } from "../../hooks";
import { isEmpty } from "lodash";
import { defaultValues } from "./config";
import { createProduct, updateProduct } from "../../services/domains/product";

export const CreateProduct = () => {
  const [gallery, setGallery] = useState<UploadFile[]>([]);
  const [table, setTable] = useState<UploadFile[]>([]);
  const [removeGallery, setRemoveGallery] = useState<any[]>([]);
  const location = useLocation();
  const { mod, data } = location.state;
  const navigate = useNavigate();

  const { setField, onSubmit, values } = useForm(
    isEmpty(data) ? defaultValues : data,
    () => null
  );

  useEffect(() => {
    data?.cover &&
      setGallery(
        data.cover.map((it: any) => ({ ...it, uid: it.id, url: it.fileUrl }))
      );
  }, [data]);

  useEffect(() => {
    data?.table &&
      setTable(
        data.table.map((it: any) => ({ ...it, uid: it.id, url: it.fileUrl }))
      );
  }, [data]);

  const submit = async () => {
    try {
      if (mod === "create") {
        await createProduct(values, gallery, table[0]);
      } else {
        updateProduct(data.id, values, removeGallery, gallery, table[0]);
      }
      setTimeout(() => navigate(`/products`), 2000);
    } catch (error) {
      console.log(error);
      message.error("Щось пішло не так");
    }
  };

  const items = [
    {
      label: "Українська",
      key: "ua",
      children: (
        <CreateProductFrom
          defaultValues={values}
          setField={setField}
          lang={Lang.UA}
        />
      ),
    },
    {
      label: "Англійська",
      key: "en",
      children: (
        <CreateProductFrom
          defaultValues={values}
          setField={setField}
          lang={Lang.EN}
        />
      ),
    },
  ];

  const handleChangeGallery: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setGallery(newFileList);

  const handleChangeTable: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setTable(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузити</div>
    </div>
  );

  return (
    <div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Категорія:</p>
        <SelectCategory
          defaultValue={String(values.productCategory[0].categoryId)}
          setValue={(val: string) => setField("categoryId", Number(val))}
        />
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Галерея:</p>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          multiple={true}
          fileList={gallery}
          listType="picture-card"
          onRemove={(e) => setRemoveGallery((prev) => [...prev, e.uid])}
          onChange={handleChangeGallery}
        >
          {uploadButton}
        </Upload>
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 20, margin: 20 }}>Таблиця:</p>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          onRemove={(e) => setRemoveGallery((prev) => [...prev, e.uid])}
          onChange={handleChangeTable}
          fileList={table}
        >
          {table.length == 0 && uploadButton}
        </Upload>
      </div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        style={{ marginTop: 30 }}
        items={items}
      />
      <Button
        type="primary"
        size={"large"}
        style={{ marginTop: 30 }}
        onClick={() => onSubmit(submit)}
      >
        Зберегти
      </Button>
    </div>
  );
};
