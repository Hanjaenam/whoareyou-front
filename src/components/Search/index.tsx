import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withBg } from 'styles/mixins/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userApi from 'api/user';
import { useInputWithSet } from 'hooks';
import SearchResult from 'components/Search/Popover';
import { Search } from 'types/apiRes/user';
import Input from 'components/Common/Input';
import Loader from 'components/Common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { showSearchResult, hideSearchResult, hideSearchInput } from 'store/header/actions';
import { AppState } from 'store/reducer';

const Box = styled.div`
  width: ${props => props.theme.width.max.input};
  position: relative;
  display: flex;
  align-items: center;
  .loader {
    position: absolute;
    right: 8px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 230px;
  }
`;

const Container = styled.div<{ visible?: boolean }>`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    ${props =>
      props.visible
        ? css`
            display: flex;
            flex: 0.95;
            margin: auto;
            ${Box} {
              width: 100%;
            }
          `
        : css`
            display: none;
          `}
  }
`;

const Icon = styled.div`
  ${withBg({ color: 'main', padding: 'tiny', loading: false, disabled: false })};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 13px;
`;

const CustomInput = styled.input`
  /**
  * ToDo : sm 에서 검색 input창 제거
  */
 font-size: 1rem;
  border-radius: ${props => props.theme.borderRadius.basic};
  border: 1px solid ${props => props.theme.colors.secondary};
  padding:${props => props.theme.gap.tiny}
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #f0f0f0;
  text-align: center;
  color: #999;
  width: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  outline: none;
  &::placeholder {
    color: #999;
  }
  &:focus {
    background-color: white;
    text-align: left;
    color: ${props => props.theme.colors.font};
  }
`;

interface IProps {
  visible?: boolean;
}

export default ({ visible }: IProps) => {
  const search = useInputWithSet('');
  const dispatch = useDispatch();
  const { result: resultVisible } = useSelector((state: AppState) => state.header.visible.search);
  const { input: inputVisible } = useSelector((state: AppState) => state.header.visible.search);
  const [result, setResult] = useState<[Search] | []>([]);
  const [status, setStatus] = useState({ loading: false, success: false });
  const [focusing, setFocusing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.value === '') {
      setStatus({ loading: false, success: false });
      setResult([]);
    }
  }, [search.value]);
  const initResult = () => {
    search.setValue('');
    setResult([]);
    setStatus({ loading: false, success: false });
    dispatch(hideSearchInput());
  };
  const handleClick = () => {
    if (search.value === '') return;
    setStatus({ success: false, loading: true });
    userApi.search({ name: search.value }).then(({ data }: { data: [Search] }) => {
      setResult(data);
      setStatus({ loading: false, success: true });
    });
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };
  const handleFocus = () => {
    dispatch(showSearchResult());
  };
  const handleBlur = () => {
    if (!focusing) {
      dispatch(hideSearchResult());
      dispatch(hideSearchInput());
    }
  };
  useEffect(() => {
    if (inputRef.current && inputVisible) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  return (
    <Container visible={visible}>
      <Box>
        <CustomInput
          ref={inputRef}
          placeholder="검색"
          onKeyUp={handleKeyUp}
          value={search.value}
          onChange={search.onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {status.loading ? (
          <Loader color="#999" />
        ) : (
          resultVisible &&
          status.success && (
            <SearchResult result={result} initResult={initResult} setFocusing={setFocusing} />
          )
        )}
      </Box>
      <Icon onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </Icon>
    </Container>
  );
};
