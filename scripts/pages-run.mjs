// GitHub's display name uses spaces; older hosts may expose the workflow slug.
export function pagesRunId(runs) {
  return runs.find((item) =>
    ['pages build and deployment', 'pages-build-deployment'].includes(item.name),
  )?.databaseId;
}
