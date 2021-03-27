import * as React from 'react';
import tw from 'tailwind-styled-components';
import { Helmet } from 'react-helmet-async';

// React component for 404 page
export default function NotFoundPage() {

  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="description" content="404 Not Found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <p>Sorry, the page you were looking for couldn't be found!</p>
      </Wrapper>
    </>
  );
}

//Styled components
const Wrapper = tw.div`
  h-full
  flex
  flex-col
  justify-center
  items-center
`;

const Title = tw.div`
  font-weight: bold;
  color: black;
  text-2xl
`;