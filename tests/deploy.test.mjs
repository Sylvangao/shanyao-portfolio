import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pagesRunId } from '../scripts/pages-run.mjs';

test('recognizes the actual GitHub Pages deployment display name', () => {
  assert.equal(
    pagesRunId([{ name: 'pages build and deployment', databaseId: 38823883385 }]),
    38823883385,
  );
});
test('also accepts the legacy workflow slug', () => {
  assert.equal(pagesRunId([{ name: 'pages-build-deployment', databaseId: 42 }]), 42);
});
test('does not mistake an unrelated successful run for deployment', () => {
  assert.equal(pagesRunId([{ name: 'Lint', databaseId: 12 }]), undefined);
  assert.equal(pagesRunId([]), undefined);
});
