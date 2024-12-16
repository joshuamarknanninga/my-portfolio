// frontend/src/components/SocialLinks/SocialLinks.js
import React from 'react';
import { Icon } from 'semantic-ui-react';

const SocialLinks = () => (
  <div>
    <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
      <Icon name="youtube" size="big" />
    </a>
    <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
      <Icon name="facebook" size="big" />
    </a>
    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
      <Icon name="twitter" size="big" />
    </a>
    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
      <Icon name="linkedin" size="big" />
    </a>
    <a href="https://wordpress.com/yourblog" target="_blank" rel="noopener noreferrer">
      <Icon name="wordpress" size="big" />
    </a>
    <a href="https://wix.com/yourwebsite" target="_blank" rel="noopener noreferrer">
      <Icon name="wix" size="big" />
    </a>
  </div>
);

export default SocialLinks;
