import React from 'react';

import Content from './components/content';
import Dropbox from './components/dropbox';
import Notice from './components/notice';

const Frame = () => (
  <div>
    <div>
      <Dropbox />
    </div>
    <div>
      <Content />
    </div>
    <Notice />
  </div>
);

export default Frame;
