import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ArticleContext } from 'context/article';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

const ImageContainer = styled.div`
  position: relative;
`;

const ImageSlider = styled.div<{ index: number }>`
  display: flex;
  transition-duration: 0.5s, 0.3s;
  transition-timing-function: linear ease;
  transform: ${props => `translateX(-${100 * props.index}%)`};
`;

const AngleIcon = styled.div<{ left?: boolean; right?: boolean }>`
  position: absolute;
  z-index: ${props => props.theme.zIndex.header};
  background-color: rgba(255, 255, 255, 0.6);
  ${props =>
    props.left &&
    css`
      left: 0;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    `}
  ${props =>
    props.right &&
    css`
      right: 0;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    `}
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.gap.huge} 0;
  > svg {
    font-size: ${props => props.theme.fontSize.medium};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 20px;
  }
`;

const Photo = styled.div<{ url: string }>`
  width: 100%;
  flex-shrink: 0;
  height: ${props => props.theme.width.article.image};
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: ${props => props.theme.width.article.image}) {
    height: 100vw;
  }
`;

export default () => {
  const data = useContext(ArticleContext);
  if (data === null) return null;

  const [photoIndex, setIndex] = useState(0);
  const { photos } = useSelector((state: AppState) => state.articleArr[data.index]);

  return (
    <ImageContainer>
      {photoIndex !== 0 && (
        <AngleIcon
          left
          onClick={() => {
            if (photoIndex - 1 < 0) return;
            setIndex(photoIndex - 1);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </AngleIcon>
      )}
      <ImageSlider index={photoIndex}>
        {photos.map(photo => (
          <Photo key={photo.id} url={photo.location} />
        ))}
      </ImageSlider>
      {photoIndex !== photos.length - 1 && (
        <AngleIcon
          right
          onClick={() => {
            if (photoIndex + 1 >= photos.length) return;
            setIndex(photoIndex + 1);
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </AngleIcon>
      )}
    </ImageContainer>
  );
};
