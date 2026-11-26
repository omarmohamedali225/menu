import { Input } from "antd";
import { memo } from "react";

export default memo(function InputSearch({
  onSearch,
}: {
  onSearch: (s: string) => void;
}) {
  console.log('search')
  return (
    <Input
      placeholder="بحث باسم الصنف"
      className="w-50!"
      onChange={(e) => {
        console.log(e.currentTarget.value)
        onSearch(e.currentTarget.value)}}
    />
  );
});
