#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json
import { Question } from "../types.ts";
import { assertEquals, assertStringIncludes } from "std/testing/asserts.ts";
import {
  createArchive,
  createList,
  createReadme,
  mergeQuestions,
} from "../utils.ts";

Deno.test("mergeQuestions", function () {
  const words1: Array<Question> = [];
  const words2: Question[] = [{
    title: "foo",
    url: "bar",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }];
  const words3: Question[] = [{
    title: "foo",
    url: "hello",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }];
  const words4: Question[] = [{
    title: "hello",
    url: "world",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }];
  const words5: Question[] = [
    {
      title: "foo",
      url: "bar",
      excerpt: "excerpt",
      created: "2021-01-28",
      answerCount: 20,
      followerCount: 50,
    },
    {
      title: "hello",
      url: "world",
      excerpt: "excerpt",
      created: "2021-01-28",
      answerCount: 20,
      followerCount: 50,
    },
  ];

  assertEquals(mergeQuestions(words1, words2), words2);
  assertEquals(mergeQuestions(words1, words5), words5);
  assertEquals(mergeQuestions(words2, words2), words2);
  assertEquals(
    mergeQuestions(words2, words3),
    [
      {
        title: "foo",
        url: "bar",
        excerpt: "excerpt",
        created: "2021-01-28",
        answerCount: 20,
        followerCount: 50,
      },
      {
        title: "foo",
        url: "hello",
        excerpt: "excerpt",
        created: "2021-01-28",
        answerCount: 20,
        followerCount: 50,
      },
    ],
  );
  assertEquals(mergeQuestions(words4, words5), [
    {
      title: "hello",
      url: "world",
      excerpt: "excerpt",
      created: "2021-01-28",
      answerCount: 20,
      followerCount: 50,
    },
    {
      title: "foo",
      url: "bar",
      excerpt: "excerpt",
      created: "2021-01-28",
      answerCount: 20,
      followerCount: 50,
    },
  ]);
  assertEquals(
    mergeQuestions(words3, words5),
    [
      {
        title: "foo",
        url: "hello",
        excerpt: "excerpt",
        created: "2021-01-28",
        answerCount: 20,
        followerCount: 50,
      },
      {
        title: "foo",
        url: "bar",
        excerpt: "excerpt",
        created: "2021-01-28",
        answerCount: 20,
        followerCount: 50,
      },
      {
        title: "hello",
        url: "world",
        excerpt: "excerpt",
        created: "2021-01-28",
        answerCount: 20,
        followerCount: 50,
      },
    ],
  );
});

Deno.test("createList", function () {
  const words: Array<Question> = [{
    title: "foo",
    url: "bar",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }, {
    title: "hello",
    url: "world",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }];
  assertStringIncludes(createList(words), "<!-- BEGIN -->");
  assertStringIncludes(createList(words), "<!-- END -->");
  assertStringIncludes(createList(words), "foo");
  assertStringIncludes(createList(words), "bar");
  assertStringIncludes(createList(words), "hello");
  assertStringIncludes(createList(words), "world");
});

Deno.test("createArchive", function () {
  const words: Array<Question> = [{
    title: "foo",
    url: "bar",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }, {
    title: "hello",
    url: "world",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }];

  assertStringIncludes(createArchive(words, "2020-01-28"), "# 2020-01-28");
  assertStringIncludes(createArchive(words, "2020-01-28"), "共 2 条");
});

Deno.test("createReadme", async function (): Promise<void> {
  const words: Question[] = [{
    title: "foo",
    url: "bar",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }, {
    title: "hello",
    url: "world",
    excerpt: "excerpt",
    created: "2021-01-28",
    answerCount: 20,
    followerCount: 50,
  }];

  assertStringIncludes(await createReadme(words), "知乎");
  assertStringIncludes(
    await createReadme(words),
    "zhihu-trending-hot-questions",
  );
});
