'use client';

import { forwardRef } from 'react';

import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const RichTextInput = forwardRef(({ modules, formats, ...props }, ref) => (
  <ReactQuill
    theme="snow"
    modules={modules}
    formats={formats}
    ref={ref}
    className="bg-white"
    {...props}
  />
));

RichTextInput.displayName = 'RichTextInput';

export default RichTextInput;
