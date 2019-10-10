import { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanMessage, setMessage } from 'store/notification/actions';
import { Status } from 'types/hooks';
import { AppState } from 'store/reducer';
import { AxiosPromise, AxiosError } from 'axios';
import { AuthContext } from 'components/Templates/Common/Auth';
import { State } from 'store/articleArr/types';
import { ARTICLE_LIMIT } from 'constant';

const isDev = process.env.NODE_ENV;

export const useInputWithSet = (defaultValue: string | undefined = '') => {
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

export const useInput = (defaultValue: string | undefined = '') => {
  const { value, onChange } = useInputWithSet(defaultValue);
  return { value, onChange };
};

export const useCleanNotification = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state: AppState) => state.notification);
  useEffect(() => {
    if (value !== '') dispatch(cleanMessage());
  }, []);
};

export const useApiNoParms = (api: () => AxiosPromise<any>) => {
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

export const useApi = <T, K extends keyof T>(
  api: (__0: { [keys in K]: T[keys] }) => AxiosPromise<any>,
  template: 'auth' | 'home',
) => {
  // 204 : 리소스 요청했지만 응답 데이터가 없음 ( 이메일 없음 등등... )
  // 401 : 보안코드가 필요한데, 입력하지 않음 ( 허가하기 위해 데이터 필요 - 안보냄 )
  // 403 : 보안코드가 틀림 ( 허가 실패 ? )
  const controlError = [204, 400, 401, 403, 409, 422];
  const [status, setStatus] = useState<Status>({
    loading: false,
    success: false,
    failure: false,
  });
  const dispatch = useDispatch();
  const context = useContext(AuthContext);

  /**
   * 1. 현재 아래에 적혀져 있는 promise함수 success : value => res(value)
   * 2. 로직이 각각 다른 promise함수들 success     : res(value)의 value를 가져간다.
   * 3. 현재 아래에 적혀져있는 promise함수 finally  : setStatus({...})
   * 4. 로직이 각각 다른 promise함수들 finally     : 맨 마지막으로 호출된다.
   */
  const process = (__0: T): Promise<any> => {
    setStatus(s => ({ failure: false, success: false, loading: true }));
    return new Promise<any>((res, rej) =>
      api(__0)
        .then(value => {
          setStatus({ failure: false, loading: false, success: true });
          return res(value);
        })
        .catch((err: AxiosError) => {
          if (err.response && controlError.includes(err.response.status)) {
            setStatus({ success: false, loading: false, failure: true });
            if (template === 'home') {
              dispatch(setMessage({ type: 'danger', value: err.response.data.message }));
            } else if (context) {
              context.setMessage({ type: 'danger', value: err.response.data.message });
            }
          } else if (isDev === 'development') {
            throw new Error(err.message);
          }

          return rej(err);
        }),
    );
  };
  return { ...status, process };
};

export const useScrollOnLoad = (articleArr: State[]) => {
  const [page, setPage] = useState(0);
  const onScroll = () => {
    const { scrollHeight, clientHeight } = document.body;
    const { scrollY } = window;
    const loadHeight = scrollHeight - clientHeight - 100;
    if (loadHeight <= scrollY && articleArr.length === ARTICLE_LIMIT * (page + 1))
      setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page, articleArr]);

  return { page, setPage };
};
