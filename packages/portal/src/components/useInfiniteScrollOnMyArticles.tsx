import { useEffect, useRef, useState } from 'react';
import authAxios from '../interceptor/authAxios';
import { PostInterface } from '../interface/App';
import { Alerts } from '../components/Alerts';

const useInfiniteScrollOnMyArticles = (
  query: number,
  pageLink: string,
  id: string
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const cursor = useRef<{ current?: string }>();

  useEffect(() => {
    localStorage.setItem('link', '/articles');
    setLoading(true);
    setError(false);
    if (typeof id === 'string') {
      authAxios
        .get(`/users/${id}/posts?limit=${query}&next_page=${pageLink}`)
        .then((res) => {
          console.log('API WAS CALLED');
          setPosts((prevPosts) => {
            return [
              ...new Set([
                ...prevPosts,
                ...res.data[1].map((p: PostInterface) => p),
              ]),
            ];
          });
          setHasMore(res.data[0].next_page !== null);
          setLoading(false);
          cursor.current = res.data[0].next_page;
          console.log(res.data);
        })
        .catch((e) => {
          if (e?.response?.status === 401) {
            setError(true);
            Alerts.error('Session Expired. Please refresh to continue');
            setLoading(false);
          }
          console.log(e);
        });
    }
  }, [query, pageLink, id]);
  return { loading, error, posts, hasMore, cursor };
};

export default useInfiniteScrollOnMyArticles;
