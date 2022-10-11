import useInfiniteScroll from '../components/useInfiniteScroll';
import { useState } from 'react';

const InfiniteScrollTesting = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  useInfiniteScroll(query, pageNumber);

  return (
    <>
      <input type="text" onChange={handleSearch}></input>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Loading...</div>
      <div>Error</div>
    </>
  );
};

export default InfiniteScrollTesting;
