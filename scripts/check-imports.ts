import { checkIconIndexes, discoverIcons } from './icon-catalog';

try {
  const reports = checkIconIndexes(discoverIcons());
  for (const report of reports) {
    console.log(
      `${report.library}: ${report.sourceCount} sources, ${report.importCount} imports, ${report.listCount} list entries`
    );
    for (const error of report.errors)
      console.error(`❌ ${report.library}: ${error}`);
  }
  if (reports.some((report) => report.errors.length > 0)) {
    process.exitCode = 1;
  } else {
    console.log(
      '✅ Every icon is imported, listed once and exported in its library index'
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
