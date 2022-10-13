import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const useInfiniteScrollOnMyArticles = (query, pageLink, id, headers) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const cursor = useRef();

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (typeof id === 'string') {
      axios({
        method: 'GET',
        url: `http://localhost:5000/post/${id}`,
        params: { limit: query, next_page: pageLink },
        headers: headers.headers,
      })
        .then((res) => {
          console.log('API WAS CALLED');
          setPosts((prevPosts) => {
            return [...new Set([...prevPosts, ...res.data[1].map((p) => p)])];
          });
          setHasMore(res.data[0].next_page !== null);
          setLoading(false);
          cursor.current = res.data[0].next_page;
          console.log(res.data);
        })
        .catch((e) => {
          setError(true);
          console.log(e);
        });
    }
  }, [query, pageLink]);
  return { loading, error, posts, hasMore, cursor };
};

export default useInfiniteScrollOnMyArticles;
