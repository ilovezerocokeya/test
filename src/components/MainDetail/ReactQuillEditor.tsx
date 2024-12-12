import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import "./custom-quill.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ReactQuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const FORMATS = ["size", "bold", "italic", "list", "bullet", "indent", "link", "color", "background", "align"];

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({ value, onChange, className }) => {
  const handleChange = (content: string) => {
    const modifiedContent = content.replace(/<a href="(www\.[^"]+)"/g, '<a href="http://$1"');
    onChange(modifiedContent);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic"],
          [{ align: [] }, { color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      }}
      formats={FORMATS}
      placeholder="상세 내용을 작성해주세요"
      className={className}
    />
  );
};

export default ReactQuillEditor;
