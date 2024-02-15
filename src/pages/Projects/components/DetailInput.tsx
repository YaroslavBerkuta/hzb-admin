import { Button, Input } from "antd";
import { FC } from "react";

interface IProps {
  onRemove: () => void;
  setTitle: (val: string) => void;
  setDesc: (val: string) => void;
  title: string;
  desc: string;
}

export const DetailInput: FC<IProps> = ({
  onRemove,
  setTitle,
  setDesc,
  title,
  desc,
}) => {
  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Input
        name="title"
        placeholder="Заголовок"
        style={{ width: "45%" }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Input
        name="description"
        placeholder="Опис"
        style={{ width: "45%" }}
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <Button type="primary" danger style={{ width: 100 }} onClick={onRemove}>
        Видалити
      </Button>
    </div>
  );
};
