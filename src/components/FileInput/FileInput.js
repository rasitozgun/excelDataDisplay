import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function DragAndDropFileInput({ types, handleChange }) {
  return (
    <div className="form-outline p-2">
      <FileUploader types={types} handleChange={handleChange} />
    </div>
  );
}
