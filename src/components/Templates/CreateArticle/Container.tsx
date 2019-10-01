import React, { useState, useCallback, useEffect } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useApi } from 'hooks';
import articleApi from 'api/article';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from 'store/notification/actions';
import { AppState } from 'store/reducer';
import Presenter from './Presenter';

const reorder = (list: File[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
interface IProps {
  goBack: () => void;
  edit?: boolean;
}

const CreateArticle = ({ goBack, edit }: IProps) => {
  const editArticle = useSelector((state: AppState) => state.editArticle);
  const [photos, setPhotos] = useState<File[]>([]);
  const { process, loading } = useApi(articleApi.create, 'home');
  const [content, setContent] = useState(edit ? editArticle.content : '');
  const dispatch = useDispatch();

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const filteredPhotos = Array.from(e.target.files).filter(
        _photo => !photos.some(photo => photo.name === _photo.name),
      );
      setPhotos([...photos, ...filteredPhotos]);
    },
    [photos],
  );

  const onTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setContent(value);
  }, []);

  const onRemove = (imageName: string) =>
    setPhotos(photos.filter(image => image.name !== imageName));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = reorder(photos, result.source.index, result.destination.index);
    setPhotos(items);
  };

  const onCreate = () => {
    if (photos.length === 0) return;
    const formData = new FormData();
    photos.forEach(image => formData.append('photos', image));
    formData.append('content', content);
    process({ formData }).then(() => {
      dispatch(setMessage({ type: 'success', value: '글이 작성되었습니다.' }));
      setPhotos([]);
      setContent('');
    });
  };

  return (
    <Presenter
      goBack={goBack}
      loading={loading}
      photos={photos}
      onDragEnd={onDragEnd}
      onRemove={onRemove}
      content={content}
      onTextChange={onTextChange}
      onCreate={onCreate}
      onFileChange={onFileChange}
    />
  );
};

export default CreateArticle;
