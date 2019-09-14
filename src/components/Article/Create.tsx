import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import TextArea from 'react-autosize-textarea';
import Button from 'components/Common/Button';
import { useDispatch } from 'react-redux';
import { hideCreateArticle } from 'store/header/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { black } from 'styles/mixins/etc';

const DisabledScroll = createGlobalStyle`body,html{overflow: hidden}`;

const Black = styled.div`
  ${black}
  z-index: ${props => props.theme.zIndex.black};
`;

const Left = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.gap.small};
  align-content: flex-start;
  flex-shrink: 0;
  padding: ${props => props.theme.gap.medium};
  border-right: 1px solid ${props => props.theme.colors.secondary};
`;

const AddImage = styled.label`
  display: block;
  border: 2px dashed ${props => props.theme.colors.secondary};
  width: ${props => props.theme.createArticleImage};
  height: ${props => props.theme.createArticleImage};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: ${props => props.theme.colors.main};
    > svg {
      color: ${props => props.theme.colors.main};
    }
  }
`;

const Preview = styled.div`
  position: relative;
  width: ${props => props.theme.createArticleImage};
  height: ${props => props.theme.createArticleImage};
  cursor: pointer;
  &:hover {
    > div {
      background-color: rgba(0, 0, 0, 0.4);
      > svg {
        opacity: 1;
      }
    }
  }
  &:last-child {
    margin-bottom: ${props => props.theme.gap.medium};
  }
  > img {
    width: 100%;
    height: 100%;
    display: block;
  }
  > div {
    transition: 0.2s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RemoveIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: ${props => props.theme.fontSize.huge};
  opacity: 0;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  transition: 0.2s;
  color: ${props => props.theme.colors.secondary};
`;

const Right = styled.div`
  padding-left: ${props => props.theme.gap.small};
  padding-right: ${props => props.theme.gap.medium};
  padding-top: ${props => props.theme.gap.medium};
  padding-bottom: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${props => props.theme.zIndex.createArticle};

  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.basic};
  background-color: white;
  display: flex;
  width: ${props => props.theme.width.createArticle};
  height: ${props => props.theme.height.createArticle.xl};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: column;
    width: 680px;
    height: ${props => props.theme.height.createArticle.lg};
    ${Left} {
      flex: 0.7;
      border-right: 0;
      border-bottom: 1px solid ${props => props.theme.colors.secondary};
    }
    ${Right} {
      flex: 0.3;
    }
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transform: translate(0, 0);
    border-radius: 0;
    ${Left} {
      flex: 0.65;
    }
    ${Right} {
      flex: 0.35;
    }
    ${AddImage} {
      width: auto;
      height: 30vw;
    }
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    ${Left} {
      grid-template-columns: repeat(2, 1fr);
      justify-items: center;
    }
    ${AddImage} {
      width: ${props => props.theme.createArticleImage};
      height: ${props => props.theme.createArticleImage};
    }
  }
`;

const CustomTextArea = styled(TextArea)`
  /**높이 */
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

const FileInput = styled.input`
  display: none;
`;

const CreateArticle = () => {
  const [images, setImage] = useState<File[]>([]);
  const dispatch = useDispatch();
  const onCancel = () => {
    if (!window.confirm('취소하시겠습니까?')) return;
    dispatch(hideCreateArticle());
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    console.log([...images, ...Array.from(e.target.files)]);
    setImage([...images, ...Array.from(e.target.files)]);
  };
  // 미리보기 기능
  // const reader = new FileReader();
  // readAsDataURL 호출해야 아래 함수 호출됨.
  // reader.onload = function(e2) {
  //   if (e2.target) console.log(reader.result);
  // };
  // // reader.readAsDataURL(e.target.files[0]);
  useEffect(() => {
    console.log(images);
    images.forEach((image, index) => {
      // 각 이미지당 하나씩
      // 하나의 객체로 모든 이미지 담당 시 error
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener('load', () => {
        const id = document.getElementById(`${image.name}_${index}`);
        if (id) id.setAttribute('src', reader.result as string);
      });
    });
  }, [images]);

  const onRemove = (e: React.MouseEvent<HTMLDivElement>) =>
    setImage(images.filter(image => !e.currentTarget.children[0].id.includes(image.name)));

  return (
    <>
      <DisabledScroll />
      <Black onClick={onCancel} />
      <Container>
        <Left>
          <AddImage htmlFor="images[]">
            <Icon icon={faPlus} />
          </AddImage>
          {images.map((image, index) => (
            <Preview key={`${image.name}_${index}`} onClick={onRemove}>
              <img alt="article_image" id={`${image.name}_${index}`} />
              <div>
                <RemoveIcon icon={faTrashAlt} />
              </div>
            </Preview>
          ))}
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
        <FileInput
          type="file"
          accept="image/jpeg,image/png"
          multiple
          id="images[]"
          onChange={onChange}
        />
      </Container>
    </>
  );
};

export default withRouter(CreateArticle);
