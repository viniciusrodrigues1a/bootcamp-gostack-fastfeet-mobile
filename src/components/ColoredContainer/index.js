import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledContainer,
  StyledColoredContainer,
  StyledContentWrapper,
  StyledContent,
} from './styles';

function Container({ children, ...rest }) {
  return (
    <StyledContainer {...rest}>
      <StyledColoredContainer />
      {children}
    </StyledContainer>
  );
}

function ContentWrapper({ children, ...rest }) {
  return <StyledContentWrapper {...rest}>{children}</StyledContentWrapper>;
}

function Content({ children, ...rest }) {
  return <StyledContent {...rest}>{children}</StyledContent>;
}

const childrenPropTypes = PropTypes.oneOfType(
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
);

Container.propTypes = {
  children: childrenPropTypes,
};

Container.defaultProps = {
  children: null,
};

ContentWrapper.propTypes = {
  children: childrenPropTypes,
};

ContentWrapper.defaultProps = {
  children: null,
};

Content.propTypes = {
  children: childrenPropTypes,
};

Content.defaultProps = {
  children: null,
};

const ColoredContainer = {
  Container,
  ContentWrapper,
  Content,
};

export default ColoredContainer;
