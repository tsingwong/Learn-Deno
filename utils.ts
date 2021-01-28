/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2021-01-28 15:33:50
 * @LastEditors: Tsingwong
 * @LastEditTime: 2021-01-28 20:36:31
 */
import { Question } from "./types.ts";

export function mergeQuestions(
  questionsAlreadyDownload: Array<Question>,
  questionsNew: Array<Question>,
): Array<Question> {
  const obj: Record<string, Question> = {};
  for (const w of questionsAlreadyDownload.concat(questionsNew)) {
    obj[w.url] = w;
  }
  return Object.entries(obj).map(([url, question]) => ({
    ...question,
  }));
}

export async function createReadme(
  questions: Array<Question>,
): Promise<string> {
  const readme = await Deno.readTextFile("./README.md");
  return readme.replace(
    /<!-- BEGIN -->[\W\w]*<!-- END -->/,
    createList(questions),
  );
}

export function createList(questions: Array<Question>): string {
  return `<!-- BEGIN -->
  <!-- 最后更新时间${Date()} $ -->
| 序号 | 标题 | 简介 | 提出时间 | 回答数 | 关注数 |
| ---- | ---- | ---- | -------- | ------ | ----- |
${
    questions.map((x, index) =>
      `|${index +
        1}| [${x.title}](${x.url})|${
        x?.excerpt?.replaceAll("|", "\|")
      }|${x.created}|${x.answerCount}|${x.followerCount}|`
    )
      .join("\n")
  }
<!-- END -->
`;
}

export function createArchive(
  questions: Array<Question>,
  date: string,
): string {
  return `# ${date}\n
  共 ${questions.length} 条\n
  ${createList(questions)}
  `;
}
