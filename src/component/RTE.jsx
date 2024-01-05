import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import plugin from 'tailwindcss';

function RTE({ name, controll, label, default_value = "" }) {
    return (
        <div className='w-full'>
            {label && <label htmlFor=''> {label}</label>}
            <Controller
                name={name || "content"}
                controll={controll}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={default_value}
                        init={
                            {
                                height: 500,
                                initialValue: default_value,
                                menubar: true,
                                plugins: ["image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",],
                                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }
                        }

                        onEditorChange={onchange}
                    />
                )}
            />

        </div>
    );
}

export default RTE;