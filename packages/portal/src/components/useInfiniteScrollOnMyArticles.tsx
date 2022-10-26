import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { PostInterface } from '../interface/App';
import { ConfigInterface } from '../services/LoginApi';

const useInfiniteScrollOnMyArticles = (
  query: number,
  pageLink: string,
  id: string,
  headers: ConfigInterface
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const cursor = useRef<any>();

  useEffect(() => {
    localStorage.setItem('link', '/my-articles');
    setLoading(true);
    setError(false);
    if (typeof id === 'string') {
      axios({
        method: 'GET',
        url: `http://localhost:5000/users/${id}/posts`,
        params: { limit: query, next_page: pageLink },
        headers: headers.headers,
      })
        .then((res) => {
          console.log('API WAS CALLED');
          setPosts((prevPosts) => {
            return [
              ...new Set([...prevPosts, ...res.data[1].map((p: object) => p)]),
            ];
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
