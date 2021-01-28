/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2021-01-28 15:07:25
 * @LastEditors: Tsingwong
 * @LastEditTime: 2021-01-28 17:43:02
 */
export type Item = {
  target: {
    title: string;
    id: number;
    excerpt: string;
    created: number;
    answer_count: number;
    follower_count: number;
  };
};

export type Question = {
  title: string;
  url: string;
  excerpt: string;
  created: string;
  answerCount: number;
  followerCount: number;
};

export type HotList = {
  data: Array<Item>;
};
