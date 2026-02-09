import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { PAGE_KEY, PAGE_SIZE_KEY } from '../constant/index';

type ListProps = {
  total: number
}

const ListPage: React.FC<ListProps> = (Props) => {
  const {total = 10} = Props
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get(PAGE_KEY)
    const pageSize = searchParams.get(PAGE_SIZE_KEY)
    page && setPage(Number(page))
    pageSize && setPageSize(Number(pageSize))
  }, [searchParams])

  const onChange: PaginationProps['onChange'] = (page,pageSize) => {
    searchParams.set(PAGE_KEY, String(page))
    searchParams.set(PAGE_SIZE_KEY, String(pageSize))
    nav({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  };

  return <Pagination current={page} pageSize={pageSize} onChange={onChange} total={total} onShowSizeChange={(current, size) => {
    onChange(current,size)
  }} />;
}

export default ListPage