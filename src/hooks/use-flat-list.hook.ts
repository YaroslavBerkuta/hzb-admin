/* eslint-disable @typescript-eslint/no-explicit-any */
import { noop } from "lodash";
import { useState, useRef, useEffect, useMemo } from "react";

interface IProps<T> {
  limit?: number;
  page?: number;
  fetchItems: (...arr: any[]) => any;
  serrializatorResponse?: <S>(data: S) => S;
  serrializatorItems?: (items: ReturnType<IProps<T>["fetchItems"]>) => T[];
  loadParams?: { [key: string]: string | number | boolean };
  needInit: boolean;
  clearWhenReload?: boolean;
  defaultItems?: T[];
  defaultLoading?: boolean;
}

const defaultProps: IProps<any[]> = {
  limit: 20,
  page: 1,
  fetchItems: noop /*  axios request */,
  serrializatorResponse: (data: any) => data,
  serrializatorItems: (items: any) => items,
  loadParams: {},
  needInit: true,
  clearWhenReload: true,
  defaultItems: [],
  defaultLoading: true,
};

const getDefaultProps = () => {
  return Object.assign({}, defaultProps);
};

export const useFlatList = <T>(props: IProps<T>) => {
  if (!props.fetchItems)
    throw new Error("Use flat list need a fetchItems function");

  props = Object.assign(getDefaultProps(), props);

  const loadParams = useRef<any>({
    limit: props.limit,
    page: props.page,
    count: undefined,
    ...props.loadParams,
  });

  const blockLoadingRef = useRef(false);

  const [items, setItems] = useState<T[]>(props.defaultItems);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(props.defaultLoading);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isInit, setIsInit] = useState(false);

  const fetchItems = async (firstFetch = false) => {
    const { count, page, limit } = loadParams.current;

    if (firstFetch) {
      setLoading(true);
      loadParams.current.page = defaultProps.page;
      loadParams.current.count = undefined;
    } else if (blockLoadingRef.current) return;
    else if (count && page > Math.ceil(count / limit)) return;

    setIsLoadingNext(true);

    blockLoadingRef.current = true;
    try {
      if (props.clearWhenReload) setItems([]);

      const response = props.serrializatorResponse(
        await props.fetchItems({ params: loadParams.current })
      );

      if (!response) throw {};

      loadParams.current = {
        ...props.loadParams,
        ...loadParams.current,
        limit: loadParams.current.limit,
        page: loadParams.current.page + 1,
        count: response.data.count,
      };
      const fetchedItems = props.serrializatorItems(response.data.items);

      if (firstFetch) setItems(fetchedItems);
      else setItems([...items, ...fetchedItems]);

      setTotalCount(response.data.count);

      if (!isInit) setIsInit(true);
    } catch (e) {
      setItems([]);
    }

    blockLoadingRef.current = false;
    setLoading(false);
    setIsLoadingNext(false);
  };

  const resetFlatList = async () => {
    await fetchItems(true);
  };

  const loadMore = () => {
    fetchItems(false);
  };

  const setLoadParams = (params: Record<string, any>) => {
    loadParams.current = {
      ...loadParams.current,
      ...params,
    };
    fetchItems(true);
  };

  useEffect(() => {
    if (props.needInit) fetchItems(true);
  }, []);

  const loadAll = () => {
    if (!loadParams.current.count) return;
    setLoadParams({ limit: loadParams.current.count });
  };

  const isLoadedAll = useMemo(() => {
    try {
      return loadParams.current.count === items?.length;
    } catch (e) {
      return false;
    }
  }, [loadParams.current, items]);

  return {
    items,
    isEmpty: !items || !items.length,
    isLoading,
    isLoadingNext,
    loadParams: loadParams.current,
    resetFlatList,
    loadMore,
    setLoadParams,
    isInit,
    _setItems: setItems,
    count: totalCount,
    loadAll,
    isLoadedAll,
  };
};
