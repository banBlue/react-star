import React, {useState, useEffect} from 'react'
import {useLocation,useNavigate, useSearchParams} from 'react-router-dom'
import { Input } from 'antd'; 
import { SEARCH_KEY } from '../constant';

const Search = Input.Search;

const ListSearch:React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setSearchValue(searchParams.get(SEARCH_KEY) || '');
  }, [searchParams])

  const onSearch = (value: string) => {
    console.log(value);
    nav({
      pathname: location.pathname,
      search: `${SEARCH_KEY}=${value}`
    })
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }
  return (
    <Search 
      value={searchValue}
      placeholder="输吧输吧不是罪"
      onSearch={onSearch}
      onChange={onChange}
      style={{ width: 200 }} 
    />
  )
}

export default ListSearch