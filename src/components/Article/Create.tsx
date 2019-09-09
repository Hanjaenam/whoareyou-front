import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import TextArea from 'react-autosize-textarea';
import Button from 'components/Common/Button';
import { useDispatch } from 'react-redux';
import { hideCreateArticle } from 'store/header/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const DisabledScroll = createGlobalStyle`body,html{overflow: hidden}`;

const Black = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.6;
  z-index: 2;
`;

const LayOut = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.basic};
  background-color: white;
  display: flex;
  width: 60%;
  height: 70%;
`;

const Left = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.gap.tiny};
  padding: ${props => props.theme.gap.medium};
  border-right: 1px solid ${props => props.theme.colors.secondary};
`;

const AddImage = styled.div`
  border: 2px dashed ${props => props.theme.colors.secondary};
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s;
  &:last-child {
    margin-bottom: ${props => props.theme.gap.medium};
  }
  &:hover {
    border-color: ${props => props.theme.colors.main};
    > svg {
      color: ${props => props.theme.colors.main};
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  transition: 0.2s;
  color: ${props => props.theme.colors.secondary};
`;

const Right = styled.div`
  /**여기서 border한 이유는 Left에 margin-bottom이 있기 때문에 Left에 border를 하면 선이 끊어지기때문에 */
  /* border-left: 1px solid ${props => props.theme.colors.secondary}; */
  /**margin사용하면 border가 끊어진다. */
  padding-left:${props => props.theme.gap.small};
  padding-right:${props => props.theme.gap.medium};
  padding-top:${props => props.theme.gap.medium};
  padding-bottom: 0;
  flex:1;
  display: flex;
  flex-direction: column;
`;

const CustomTextArea = styled(TextArea)`
  flex: 1 !important;
  all: unset;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: ${props => props.theme.fontSize.large};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.gap.tiny};
  > div + div {
    margin-left: ${props => props.theme.gap.medium};
  }
`;

export default () => {
  const dispatch = useDispatch();

  const onCancel = () => {
    if (!window.confirm('취소하시겠습니까?')) return;
    dispatch(hideCreateArticle());
  };
  return (
    <>
      <DisabledScroll />
      <Black />
      <LayOut>
        <Container>
          <Left>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>

            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>

            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>

            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
            <AddImage>
              <Icon icon={faPlus} />
            </AddImage>
          </Left>
          <Right>
            <CustomTextArea placeholder="내용을 입력해주세요.. 내용이 없어도 됩니다." />
            <ButtonContainer>
              <Button theme="border" onClick={() => null}>
                올리기
              </Button>
              <Button theme="border" color="danger" onClick={onCancel}>
                취소
              </Button>
            </ButtonContainer>
          </Right>
        </Container>
      </LayOut>
    </>
  );
};
