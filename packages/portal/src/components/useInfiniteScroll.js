import { useEffect, useState } from 'react';
import axios from 'axios';

const useInfiniteScroll = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
    }).then((res) => {
      setPosts((prevPosts) => {
        return [...new Set([...prevPosts, ...res.data.map((b) => b.title)])];
      });
      console.log(res.data);
    });
  }, [query, pageNumber]);
  return null;
};

export default useInfiniteScroll;
