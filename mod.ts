#!/usr/bin/env -S deno run --unstable --allow-net --allow-read --allow-write --import-map=import_map.json

import { format } from "std/datetime/mod.ts";
import { join } from "std/path/mod.ts";
import { exists } from "std/fs/mod.ts";

import { HotList, Question } from "./types.ts";
import { createArchive, createReadme, mergeQuestions } from "./utils.ts";
const response = await fetch(
  "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=100",
);

if (!response.ok) {
  console.log(response.statusText);
  Deno.exit(-1);
}

const result: HotList = await response.json();

const questions: Array<Question> = result.data.map((x) => ({
  title: x.target.title,
  url: `https://www.zhihu.com/questions/${x.target.id}`,
  excerpt: x.target.excerpt,
  created: format(new Date(x.target.created * 1000), "yyyy-MM-dd HH:MM"),
  answerCount: x.target.answer_count,
  followerCount: x.target.follower_count,
}));

const yyyyMMdd = format(new Date(), "yyyy-MM-dd");
const fullPath = join("raw", `${yyyyMMdd}.json`);

let questionsAlreadyDownload: Array<Question> = [];

if (await exists(fullPath)) {
  const content = await Deno.readTextFile(fullPath);
  questionsAlreadyDownload = JSON.parse(content);
}

const questionsAll = mergeQuestions(questionsAlreadyDownload, questions);
await Deno.writeTextFile(fullPath, JSON.stringify(questionsAll, null, 2));

const readme = await createReadme(questionsAll);
await Deno.writeTextFile("./README.md", readme);

const archiveText = createArchive(questions, yyyyMMdd);
const archivePath = join("archives", `${yyyyMMdd}.md`);
await Deno.writeTextFile(archivePath, archiveText);
