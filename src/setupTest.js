import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

// Optionally, you can import any additional test setup files here

// Automatically import all files ending in *.test.js
const testsContext = require.context("./", true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
