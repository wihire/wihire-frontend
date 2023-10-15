'use client';

import { forwardRef } from 'react';

import dynamic from 'next/dynamic';

import Shimmer from '@/components/elements/Shimmer';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Shimmer width="100%" aspectRatio={6} />
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
