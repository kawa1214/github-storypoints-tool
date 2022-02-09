import { Octokit } from "@octokit/core";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const parsed = JSON.parse(message);
  const api: string | null = parsed.api;

  if (api != null) {
    callback(api);
  }
  return;
});

const callback = async (api: string) => {
  const pathname = location.pathname;
  const splitPath = pathname.split("/");
  const owner = splitPath[1];
  const repo = splitPath[2];

  const octokit = new Octokit({
    auth: api,
  });

  const milestoneChildren = document.getElementsByClassName("milestone");

  await Promise.all(
    Array.from(milestoneChildren).map(async (e) => {
      const titleChild = e
        .getElementsByTagName("h2")[0]
        .getElementsByTagName("a")[0];
      const splitedHref = titleChild.href.split("/");
      const milestoneId = splitedHref.at(splitedHref.length - 1);

      const res = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: owner,
        repo: repo,
        per_page: 100,
        milestone: milestoneId,
      });

      let totalPoint = 0;

      for (const issue of res.data) {
        const pointRe = new RegExp(/(?<=\[)[0-90-9]+(?=\])/);
        const point = parseInt(issue.title.match(pointRe)?.at(0) ?? "0");
        totalPoint += point;
      }

      const splitedTitle = titleChild.textContent?.split(" | ");

      if (splitedTitle?.at(splitedTitle.length - 1) != totalPoint.toString()) {
        titleChild.innerHTML = titleChild.innerHTML = `${splitedTitle?.at(
          0
        )} | ${totalPoint}`;
      }
    })
  );

  return;
};
