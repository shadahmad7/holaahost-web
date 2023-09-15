import React, { FC, useRef, useState } from "react";

import JoditEditor from "jodit-react";

export interface RichTextEditorProps {
  className?: string;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ className = "" }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("Start writing");
  const config: any = {
    readonly: false,
    height: 500,
    uploader: {
        insertImageAsBase64URI: true
      }
  };
  const handleUpdate = (event: any) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  return (
    <div
      className={`nc-RichTextEditor relative ${className} `}
      data-nc-id="RichTextEditor"
    >
      <div className="App">
        <h2>Start editing to see some magic happen!</h2>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={handleUpdate}
          onChange={(newContent) => {}}
        />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default RichTextEditor;
