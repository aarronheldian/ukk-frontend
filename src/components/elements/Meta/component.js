import React from 'react'
import { Helmet } from 'react-helmet';

const Meta = (props) => {
  return (
    <Helmet>
      <title>
        UKK Moklet - {props.title}
      </title>
    </Helmet>
  );
};

export default Meta;
