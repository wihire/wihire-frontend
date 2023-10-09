'use client';

import cx from 'classnames';
/* eslint-disable react/no-danger */
import * as dompurify from 'isomorphic-dompurify';

import styles from './style.module.scss';

const sanitizer = dompurify.sanitize;

const DangerousHTML = ({ html, className }) => (
  <div
    className={cx(styles.content, className)}
    dangerouslySetInnerHTML={{ __html: sanitizer(html) }}
  />
);

export default DangerousHTML;
