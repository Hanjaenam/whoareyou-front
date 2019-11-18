import React from 'react';
import styled from 'styled-components';
import Button from 'components/Common/Button';
import TextArea from 'react-autosize-textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import PreviewImage from 'components/Article/PreviewImage';
import Loader from 'components/Common/Loader';
import { myTheme } from 'styles/theme';
import { black } from 'styles/mixins/etc';

const Black = styled.div`
  ${black};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: relative;
  background-color: white;
  width:100%;
  /* display: flex; */
  /* flex-direction: column; */
  /* width: ${props => `calc(100vw - ${props.theme.width.aside.xl})`}; */
  /* @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    width: ${props => `calc(100vw - ${props.theme.width.aside.lg})`};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100vw;
  } */
`;
const Top = styled.div`
  display: flex;
  padding: ${props => props.theme.gap.medium};
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
  &::placeholder {
    color: ${props => props.theme.colors.secondary};
    -webkit-text-fill-color: ${props => props.theme.colors.secondary};
  }
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

interface IProps {
  goBack: () => void;
  loading: boolean;
  photos: File[];
  onDragEnd: (result: DropResult) => void;
  onRemove: (imageName: string) => void;
  content: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCreate: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateArticle = ({
  goBack,
  loading,
  photos,
  onDragEnd,
  onRemove,
  content,
  onTextChange,
  onCreate,
  onFileChange,
}: IProps) => (
  <Container>
    {loading && (
      <Black>
        <Loader size={2} color={myTheme.colors.secondary} />
      </Black>
    )}
    <Top>
      <AddImage htmlFor="photos[]">
        <Icon icon={faPlus} />
      </AddImage>
      {photos.length !== 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided: DroppableProvided, _) => (
              <DropZone ref={provided.innerRef} {...provided.droppableProps}>
                {photos.map((image, index) => (
                  <PreviewImage key={image.name} image={image} onRemove={onRemove} index={index} />
                ))}
                {provided.placeholder}
              </DropZone>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Top>
    <Bottom>
      <CustomTextArea
        placeholder="내용을 입력해주세요.. 내용이 없어도 됩니다."
        value={content}
        onChange={onTextChange}
      />
      <ButtonContainer>
        <Button theme="border" disabled={photos.length === 0} onClick={onCreate}>
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
      id="photos[]"
      onChange={onFileChange}
    />
  </Container>
);

export default CreateArticle;
