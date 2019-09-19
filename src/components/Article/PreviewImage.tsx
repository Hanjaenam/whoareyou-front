import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faHandRock } from '@fortawesome/free-regular-svg-icons';
import { Draggable, DraggableStateSnapshot, DraggableProvided } from 'react-beautiful-dnd';
import articleApi from 'api/article';

interface IProps {
  image: File;
  index: number;
  onRemove: (removeName: string) => void;
}

const Preview = styled.div`
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  & + & {
    margin-left: ${props => props.theme.gap.small};
  }
  > img {
    width: 100%;
    height: 100%;
    display: block;
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

const PreviewFunc = styled.div`
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
    > div,
    > svg {
      opacity: 1;
    }
  }
  transition: 0.2s;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const RemoveIconCont = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  padding: ${props => props.theme.gap.small};
  &:hover {
    > svg {
      color: white;
    }
  }
`;

const RemoveIcon = styled(FontAwesomeIcon)`
  font-size: ${props => props.theme.fontSize.huge};
  color: ${props => props.theme.colors.secondary};
`;

const DragIconCont = styled.div`
  padding: ${props => props.theme.gap.large};
  opacity: 0;
`;

const DragIcon = styled(FontAwesomeIcon)`
  font-size: ${props => props.theme.fontSize.huge};
  color: ${props => props.theme.colors.secondary};
`;

const bounce = keyframes`
from { transform: translateY(0); }
to   { transform: translateY(10%); }
`;

const TitleExplain = styled.div`
  position: absolute;
  bottom: -12px;
  text-align: center;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 15px;
  padding: ${props => props.theme.gap.tiny};
  animation: ${bounce} 0.5s;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  animation-iteration-count: infinite;
  > p {
    font-size: ${props => props.theme.fontSize.small};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    > p {
      font-size: ${props => props.theme.fontSize.tiny};
    }
  }
`;

export default ({ image, index, onRemove }: IProps) => {
  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      if (!imgRef.current) return;
      imgRef.current.setAttribute('src', reader.result as string);
      console.log(reader.result);
    });
  }, []);

  return (
    <Draggable draggableId={image.name} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Preview
          className="preview-image"
          id={image.name}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img alt={image.name} ref={imgRef as any} />
          <PreviewFunc>
            <RemoveIconCont
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                onRemove(image.name);
              }}
            >
              <RemoveIcon icon={faTrashAlt} />
            </RemoveIconCont>
            <DragIconCont>
              <DragIcon icon={faHandRock} />
            </DragIconCont>
          </PreviewFunc>
          {index === 0 && !snapshot.isDragging && (
            <TitleExplain>
              <p>타이틀로 보여질 사진입니다.</p>
            </TitleExplain>
          )}
        </Preview>
      )}
    </Draggable>
  );
};
