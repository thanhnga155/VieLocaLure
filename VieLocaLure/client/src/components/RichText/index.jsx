import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadToCloudinary } from '../../services/ImageApi';

const RichText = ({ onTextChange, content }) => {
    const [editorValue, setEditorValue] = useState();
    
    const handleChange = (value) => {
        setEditorValue(value);
        onTextChange(value);
    }

    const reactQuillRef = useRef(null);
      

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          if (input !== null && input.files !== null) {
            const file = input.files[0];
            const url = await UploadToCloudinary(file);
            const quill = reactQuillRef.current;
            if (quill) {
              const range = quill.getEditorSelection();
              range && quill.getEditor().insertEmbed(range.index, "image", url);
            }
          }
        };
    }, []);


    return (
        editorValue ?
        <ReactQuill
            ref={reactQuillRef}
            style={{minHeight: '100px', marginBottom: '3rem'}}
            value={editorValue}
            onChange={handleChange}
            modules={{
                toolbar: {
                    container: [
                        [{ header: [1, 2, false] }, {size: []}],
                        ['bold', 'italic', 'underline'],
                        [{align: []},],
                        [{"list": "order"}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                        ['image', 'code-block', 'link'],
                    ],
                    handlers: {
                        image: imageHandler,
                    },

                } 
            }}
            theme="snow"
        />
        : 
        <ReactQuill
            ref={reactQuillRef}
            style={{minHeight: '100px', marginBottom: '3rem'}}
            value={content}
            onChange={handleChange}
            modules={{
                toolbar: {
                    container: [
                        [{ header: [1, 2, false] }, {size: []}],
                        ['bold', 'italic', 'underline'],
                        [{align: []},],
                        [{"list": "order"}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                        ['image', 'code-block', 'link'],
                    ],
                    handlers: {
                        image: imageHandler,
                    },

                } 
            }}
            theme="snow"
        />
    )
}

export default RichText;