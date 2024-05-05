import styled from 'styled-components';
import { MembersList } from './components';

export const Root = styled.main`
  height: 100vh;
  width: 100%;
`;

const App = () => (
  <Root>
    <MembersList />
  </Root>
);

export default App;
