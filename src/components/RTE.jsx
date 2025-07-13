import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({
    name,
    control,
    label,
    defaultValue = "",
    error
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            initialValue={defaultValue}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
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
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                skin: "snow",
                                content_css: "default"
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}