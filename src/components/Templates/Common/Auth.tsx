import React, { ReactNode, useState, createContext } from 'react';
import styled from 'styled-components';
import AuthNotification from 'components/Common/AuthNotification';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
  margin: 0 auto;
  min-height: ${props => props.theme.breakpoints.md};
  background-color: ${props => props.theme.colors.main};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const Gretting = styled.div`
  height: 35vw;
  max-height: 35%;
  min-height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 3rem;
  font-style: italic;
  color: white;
`;

const Main = styled.main`
  position: relative;
  width: ${props => props.theme.breakpoints.sm};
  margin: 0 auto;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.authMain};
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    border-radius: 0;
  }
`;

interface IProps {
  children: ReactNode;
}

interface IMessage {
  type: 'danger' | 'success';
  value: string;
}

interface IContext {
  message: IMessage;
  setMessage: React.Dispatch<React.SetStateAction<IMessage>>;
}

export const AuthContext = createContext<IContext | null>(null);

export default ({ children }: IProps) => {
  const [message, setMessage] = useState<IMessage>({ type: 'danger', value: '' });

  return (
    <Container>
      <Gretting>
        <Text>Who R U?</Text>
      </Gretting>
      <Main>
        {message.value !== '' && <AuthNotification message={message} setMessage={setMessage} />}
        <AuthContext.Provider value={{ message, setMessage }}>{children}</AuthContext.Provider>
      </Main>
    </Container>
  );
};
