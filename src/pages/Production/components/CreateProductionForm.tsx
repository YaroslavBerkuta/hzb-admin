/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Lang } from "../../../typing/enums";
import { Input } from "antd";
import { find } from "lodash";
import { Editor } from "@tinymce/tinymce-react";

interface IProps {
  defaultValues: any;
  setField: any;
  lang: Lang;
}

export const CreateProductionForm: FC<IProps> = ({
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
        style={{ marginBottom: 20 }}
        defaultValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.name
        }
        onChange={(e) => onChange(e.target.value, "name")}
      />
      <Editor
        apiKey="0q4u8e72jrvy87zmkquxbnf2s4zk5w6kb13l1fpezqcoq2ur"
        initialValue={
          find(defaultValues.translations, (el) => el.lang === lang)?.data
        }
        init={{
          branding: false,
          height: 530,
          menubar: false,
          plugins:
            "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
          toolbar:
            "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
          image_advtab: true,
        }}
        onChange={(e) => onChange(e.target.getContent(), "data")}
      />
    </div>
  );
};
