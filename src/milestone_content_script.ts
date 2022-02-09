import { debounce } from "./debounce";

const callback = () => {
  const jsIssueRowChildren = document.getElementsByClassName("js-issue-row");

  let totalPoint = 0;
  for (const jsIssueRowChild of jsIssueRowChildren) {
    const issueTitle =
      jsIssueRowChild.querySelector(".markdown-title")?.textContent;

    const pointRe = new RegExp(/(?<=\[)[0-90-9]+(?=\])/);
    const point = parseInt(issueTitle?.match(pointRe)?.at(0) ?? "0");
    totalPoint += point;
  }

  const milestoneTitleChild = document.getElementsByTagName("h2")[0]!;
  const splitMileStoneTitle = milestoneTitleChild.textContent?.split(" | ");

  if (
    splitMileStoneTitle?.at(splitMileStoneTitle.length - 1) !=
    totalPoint.toString()
  ) {
    milestoneTitleChild.innerHTML =
      milestoneTitleChild.innerHTML = `${splitMileStoneTitle?.at(
        0
      )} | ${totalPoint}`;
  }
};

const waitMs = 250;

const observer = new MutationObserver(debounce(callback, waitMs));
const targetNode = document.querySelector(".js-milestone-issues-container");

const options = {
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true,
};

if (!!targetNode) {
  console.log(targetNode.clientHeight);
  observer.observe(targetNode, options);
} else {
  console.log(".js-milestone-issues-container is missing");
  throw new Error(".js-milestone-issues-container is missing");
}
