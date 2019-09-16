import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import TextArea from 'react-autosize-textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import PreviewImage from 'components/Article/PreviewImage';
import { useApi } from 'hooks';
import { articleApi } from 'utils/api';
import { useDispatch } from 'react-redux';
import { setMessage } from 'store/notification/actions';
import Loader from 'components/Common/Loader';
import { myTheme } from 'styles/theme';

interface IProps {
  goBack: () => void;
}

const Container = styled.div<{ status: { loading: boolean } }>`
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: ${props => `calc(100vw - ${props.theme.width.aside.xl})`};
  ${props =>
    props.status.loading &&
    css`
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
    `}
  .loader {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    width: ${props => `calc(100vw - ${props.theme.width.aside.lg})`};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100vw;
  }
`;

const Top = styled.div<{ hidePadBot: boolean }>`
  display: flex;
  padding: ${props => props.theme.gap.medium};
  ${props =>
    props.hidePadBot &&
    css`
      padding-bottom: 0;
    `}
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

const AddImage = styled.label`
  border: 2px dashed ${props => props.theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  margin-right: ${props => props.theme.gap.small};
  &:hover {
    border-color: ${props => props.theme.colors.main};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 150px;
    height: 150px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100px;
    height: 100px;
  }
`;

const DropZone = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-bottom: ${props => props.theme.gap.medium};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  transition: 0.2s;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.gap.small};
`;

const CustomTextArea = styled(TextArea)`
  /**높이 */
  all: unset;
  word-break: break-all;
  box-sizing: border-box;
  min-height: 200px;
  font-size: ${props => props.theme.fontSize.large};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.gap.small};
  > div:first-child {
    margin-right: ${props => props.theme.gap.small};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const reorder = (list: File[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CreateArticle = ({ goBack }: IProps) => {
  const [images, setImage] = useState<File[]>([]);
  const { process, loading } = useApi(articleApi.create);
  const [content, setContent] = useState();
  const dispatch = useDispatch();

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const filteredImages = Array.from(e.target.files).filter(
        file => !images.some(image => image.name === file.name),
      );
      setImage([...images, ...filteredImages]);
    },
    [images],
  );

  const onTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setContent(value);
  }, []);

  const onDelete = (imageName: string) =>
    setImage(images.filter(image => image.name !== imageName));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = reorder(images, result.source.index, result.destination.index);
    setImage(items);
  };

  const onCreate = () => {
    if (images.length === 0) return;
    const formData = new FormData();
    images.forEach(image => formData.append('photos', image));
    formData.append('content', content);
    process({ formData }).then(() => {
      dispatch(setMessage({ type: 'success', value: '글이 작성되었습니다.' }));
      setImage([]);
      setContent('');
    });
  };

  return (
    <Container status={{ loading }}>
      {loading && <Loader size={3} color={myTheme.colors.secondary} />}
      <Top hidePadBot={images.length !== 0}>
        <AddImage htmlFor="images[]">
          <Icon icon={faPlus} />
        </AddImage>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided: DroppableProvided, _) => (
              <DropZone ref={provided.innerRef} {...provided.droppableProps}>
                {images.map((image, index) => (
                  <PreviewImage key={image.name} image={image} onDelete={onDelete} index={index} />
                ))}
                {provided.placeholder}
              </DropZone>
            )}
          </Droppable>
        </DragDropContext>
      </Top>
      <Bottom>
        <CustomTextArea
          placeholder="내용을 입력해주세요.. 내용이 없어도 됩니다."
          value={content}
          onChange={onTextChange}
        />
        <ButtonContainer>
          <Button theme="border" disabled={images.length === 0} onClick={onCreate}>
            올리기
          </Button>
          <Button theme="border" color="danger" onClick={goBack}>
            취소
          </Button>
        </ButtonContainer>
      </Bottom>
      <FileInput
        type="file"
        accept="image/jpeg,image/png"
        multiple
        id="images[]"
        onChange={onFileChange}
      />
    </Container>
  );
};

export default CreateArticle;
