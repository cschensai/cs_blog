import React, { Fragment } from 'react';
import { Button as AButton } from 'antd';

export default ({ title }) => (
  <Fragment>
    <h1>{title} Button</h1>
    <AButton type="dashed">AButton</AButton>
  </Fragment>
);
