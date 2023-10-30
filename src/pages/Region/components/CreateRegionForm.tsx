/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Lang } from "../../../typing/enums";
import { Input } from "antd";
import { find } from "lodash";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  defaultValues: any;
  setField: any;
  lang: Lang;
}

export const CreateRegionForm: FC<IProps> = ({
  defaultValues,
  setField,
  lang,
}) => {
  const onChange = (val: string, key: string) => {
    setField(
      "translations",
      defaultValues.translations.map((item: any) =>
        item.lang === lang ? { ...item, [key]: val } : item
      )
    );
  };
  return (
    <div>
      <Input
        name="title"
        placeholder="Заголовок"
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.name
        }
        onChange={(e) => onChange(e.target.value, "name")}
      />
      <TextArea
        name="description"
        placeholder="Опис"
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)
            ?.description
        }
        rows={10}
        style={{ marginTop: 20 }}
        onChange={(e) => onChange(e.target.value, "description")}
      />
      {/* <Editor
        apiKey="0q4u8e72jrvy87zmkquxbnf2s4zk5w6kb13l1fpezqcoq2ur"
        initialValue=""
        init={{
          branding: false,
          height: 400,
          menubar: true,
          plugins:
            "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
          toolbar:
            "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          image_advtab: true,
        }}
        onChange={(e) => console.log("val:", e.target.getContent())}
      /> */}
    </div>
  );
};
