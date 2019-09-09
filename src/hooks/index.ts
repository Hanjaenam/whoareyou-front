import { useState, useEffect, useCallback } from 'react';
import { AxiosPromise, AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setMessage, cleanMessage } from 'store/notification/actions';
import { Status, useInputParams } from 'types/hooks';

const isDev = process.env.NODE_ENV;

export const useInputWithSet = (defaultValue: useInputParams = '') => {
  const [value, setValue] = useState(defaultValue);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e;
    setValue(target.value);
  };

  // 이벤트 핸들러 함수가 리렌더링될때마다 새로 생성되지 않게끔
  // mount때에만 생성하고 이후에는 생성하지 않는다.
  const onChange = useCallback(_onChange, []);

  return { value, onChange, setValue };
};

export const useInput = (defaultValue: useInputParams = '') => {
  const { value, onChange } = useInputWithSet(defaultValue);
  return { value, onChange };
};

export const useApi = <T, K extends keyof T>(
  api: (__0: { [keys in K]: T[keys] }) => AxiosPromise<any>,
) => {
  const controlError = [400, 401, 403, 404, 409, 422];
  const [status, setStatus] = useState<Status>({
    loading: false,
    success: false,
    failure: false,
  });
  const dispatch = useDispatch();

  /**
   * 1. 현재 아래에 적혀져 있는 promise함수 success : value => res(value)
   * 2. 로직이 각각 다른 promise함수들 success     : res(value)의 value를 가져간다.
   * 3. 현재 아래에 적혀져있는 promise함수 finally  : setStatus({...})
   * 4. 로직이 각각 다른 promise함수들 finally     : 맨 마지막으로 호출된다.
   */
  const process = (__0: T): Promise<any> => {
    setStatus(s => ({ ...s, loading: true }));
    return new Promise<any>((res, rej) =>
      api(__0)
        .then(value => {
          setStatus(s => ({ ...s, loading: false, success: true }));
          return res(value);
        })
        .catch((err: AxiosError) => {
          if (err.response && controlError.includes(err.response.status)) {
            setStatus(s => ({ ...s, loading: false, failure: true }));
            dispatch(setMessage({ type: 'danger', value: err.response.data.message }));
          } else if (isDev === 'development') {
            throw new Error(err.message);
          }

          return rej(err);
        }),
    );
  };
  return { ...status, process };
};

export const useApi2 = (api: () => AxiosPromise<any>) => {
  const controlError = [400, 401, 403, 404, 409, 422];
  const [status, setStatus] = useState<Status>({
    loading: false,
    success: false,
    failure: false,
  });
  const dispatch = useDispatch();
  const process = (): Promise<any> => {
    setStatus(s => ({ ...s, loading: true }));
    return new Promise<any>((res, rej) =>
      api()
        .then(value => {
          setStatus(s => ({ ...s, loading: false, success: true }));
          return res(value);
        })
        .catch((err: AxiosError) => {
          if (err.response && controlError.includes(err.response.status)) {
            setStatus(s => ({ ...s, loading: false, failure: true }));
            dispatch(setMessage({ type: 'danger', value: err.response.data.message }));
          } else if (isDev === 'development') {
            throw new Error(err.message);
          }

          return rej(err);
        }),
    );
  };
  return { ...status, process };
};

export const useCleanNotification = () => {
  const dispatch = useDispatch();
  useEffect(
    () => () => {
      dispatch(cleanMessage());
    },
    [],
  );
};