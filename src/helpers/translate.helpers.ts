/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { Lang } from "../typing/enums";

export const getTranslate = <T>(translates: T[], lang: Lang) => {
  try {
    if (!translates || _.isEmpty(translates)) return {} as any as T;
    if (translates.length === 1) return translates[0];

    const item = translates.find((it: any) => it?.lang === lang);
    if (item) return item;

    const enItem = translates.find((it: any) => it?.lang === Lang.EN);
    if (enItem) return enItem;

    return translates[0];
  } catch (e) {
    return {} as any as T;
  }
};

export const compareTranslates = (
  translates: any[],
  translates2: any[],
  keys: string[]
) => {
  if (!translates || !translates2) return false;

  let isEqual = true;

  const _translates1 = translates.reduce((res, it) => {
    res[it.id] = _.pick(it, keys);
    return res;
  }, {});

  translates2.map((it) => {
    const _it = _.pick(it, keys);

    if (!_.isEqual(_translates1[it.id], _it)) isEqual = false;
  });

  return isEqual;
};
