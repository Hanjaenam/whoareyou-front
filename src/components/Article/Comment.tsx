import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { blueColorClick } from 'styles/mixins/etc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { removeComment, setComment } from 'store/articleArr/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useApi, useInput } from 'hooks';
import commentApi from 'api/comment';
import { ArticleContext } from 'context/article';
import { AppState } from 'store/reducer';
import moment from 'moment';

const Container = styled.div``;

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f3f5;
  border-radius: 10px;
  padding: 2px ${props => props.theme.gap.small};
  padding-right: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Author = styled.span`
  color: ${props => props.theme.colors.blue};
  ${blueColorClick}
`;

const CreatedAt = styled.span`
  font-size: ${props => props.theme.fontSize.small};
  color: rgba(0, 0, 0, 0.3);
  font-style: italic;
  position: relative;
  top: -3px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const buttonCss = (color: 'danger' | 'main') => css`
  cursor: pointer;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${props => props.theme.colors[color]};
    > svg {
      color: white;
    }
  }
  &:active {
    transform: scale(0.96);
  }
`;

const EditButton = styled.div`
  ${buttonCss('main')}
  border-radius: 50%;
`;

const EditConfirmButton = styled.div`
  ${buttonCss('main')};
  position: absolute;
  right: 0;
`;

const RemoveButton = styled.div`
  ${buttonCss('danger')}
  border-radius: 50%;
`;

const Content = styled.p`
  margin: 0 ${props => props.theme.gap.tiny};
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 ${props => props.theme.gap.tiny};
  border-radius: ${props => props.theme.borderRadius.basic};
  padding: ${props => props.theme.gap.tiny};
  background-color: white;
  overflow: hidden;
`;

const Input = styled.input`
  all: unset;
  flex: 1;
`;

interface IProps {
  id: number;
  index: number;
  creator: string;
  content: string;
  createdAt: string;
}

export default ({ id, index, creator, content, createdAt }: IProps) => {
  const data = useContext(ArticleContext);
  const dispatch = useDispatch();
  const comment = useInput(content);
  const [isEdit, setEdit] = useState(false);
  const { process, loading } = useApi(commentApi.remove, 'home');
  const { process: processPatch, loading: patchLoading } = useApi(commentApi.patch, 'home');
  const { id: articleId } = useSelector((state: AppState) => state.articleArr[data.index]);

  const onRemove = () => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    process({ id, articleId }).then(() =>
      dispatch(removeComment({ articleIndex: data.index, index })),
    );
  };

  const onEdit = () => setEdit(!isEdit);

  const onEditConfirm = () =>
    processPatch({ articleId, id, content: comment.value }).then(() => {
      setEdit(false);
      dispatch(setComment({ index: data.index, comment: { index, content: comment.value } }));
    });

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onEditConfirm();
    }
  };

  return (
    <Container key={id}>
      <DataContainer>
        <ContentContainer>
          <Author>{creator}</Author>
          {isEdit ? (
            <InputContainer>
              <Input autoFocus {...comment} onKeyUp={onKeyUp} />
              <EditConfirmButton onClick={onEditConfirm}>
                <FontAwesomeIcon icon={faCheck} />
              </EditConfirmButton>
            </InputContainer>
          ) : (
            <Content>{content}</Content>
          )}
        </ContentContainer>
        <ButtonContainer>
          <EditButton onClick={onEdit}>
            <FontAwesomeIcon
              icon={isEdit ? faTimes : faPen}
              style={{ fontSize: isEdit ? '1.2rem' : '1rem' }}
            />
          </EditButton>
          <RemoveButton onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </RemoveButton>
        </ButtonContainer>
      </DataContainer>
      <CreatedAt>{moment(createdAt).fromNow()}</CreatedAt>
    </Container>
  );
};
