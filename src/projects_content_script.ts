import { debounce } from "./debounce";

const callback = () => {
  const projectColumnChildren =
    document.getElementsByClassName("project-column");

  for (const projectColumnChild of projectColumnChildren) {
    const issueCardChildren =
      projectColumnChild.getElementsByClassName("issue-card");

    let totalPoint = 0;
    for (const issueCardChild of issueCardChildren) {
      const issueLink = issueCardChild.getElementsByClassName(
        "js-project-card-issue-link"
      );

      const issueTitle = issueLink[0]?.textContent;
      const pointRe = new RegExp(/(?<=\[)[0-90-9]+(?=\])/);
      const point = parseInt(issueTitle?.match(pointRe)?.at(0) ?? "0");
      totalPoint += point;
    }

    const columnCardCountChild = projectColumnChild.getElementsByClassName(
      "js-column-card-count"
    );

    columnCardCountChild[0].innerHTML =
      columnCardCountChild[0].innerHTML
        .match(new RegExp(/[0-90-9]+(?=\ )/))
        ?.at(0) ?? columnCardCountChild[0].innerHTML;

    const columnCardCount = columnCardCountChild[0]?.textContent;
    columnCardCountChild[0].innerHTML = `${columnCardCount} | ${totalPoint}`;
  }
};

const waitMs = 250;

const observer = new MutationObserver(debounce(callback, waitMs));
const targetNode = document.querySelector(".js-project-columns");

const options = {
  attributes: true,
  subtree: true,
};

if (!!targetNode) {
  observer.observe(targetNode, options);
} else {
  throw new Error(".js-project-columns is missing");
}
