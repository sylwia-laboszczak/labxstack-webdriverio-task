// eslint-disable-next-line

import axios from "axios";
// eslint-disable-next-line


import {strict as assert} from "assert";

const myToken = "";
const uploadedFileName = "@sylwiatestfile.txt";
const dropBoxFilePath = "{\"path\":\"/mytest\"}";
const dropBoxFileNamePath = "mytest";

async function runTests() {
  // first test

  let response;

  let createFileConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://content.dropboxapi.com/2/files/upload",
    headers: {
      Authorization: myToken,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": dropBoxFilePath,
    },
    data: uploadedFileName,
  };

  response = await axios.request(createFileConfig);

  assert(
    response.status === 200,
    `acctual value: ${response.status} is different than expected value: ${200}`,
  );
  assert(
    response.headers["content-type"] === "application/json",
    `acctual value: ${response.headers["content-type"]} is different than expected value: ${"application/json"}`,
  );
  const dropBoxApiResultFileName = response.data["name"];

  assert(
    dropBoxApiResultFileName === dropBoxFileNamePath,
    `acctual value: ${dropBoxApiResultFileName} is different than expected value: ${dropBoxFileNamePath}`,
  );

  console.log("Test for creating file works");

  // second test
  let readFileConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://content.dropboxapi.com/2/files/download",
    headers: {
      Authorization: myToken,
      "Dropbox-API-Arg": dropBoxFilePath,
      "Content-Type": "text/plain",
    },
  };

  response = await axios.request(readFileConfig);

  assert(
    response.status === 200,
    `acctual value: ${response.status} is different than expected value: ${200}`,
  );
  const dropBoxApiResultFileName2 = JSON.parse(
    response.headers["dropbox-api-result"],
  )["name"];

  assert(
    dropBoxApiResultFileName2 === dropBoxFileNamePath,
    `acctual value: ${dropBoxApiResultFileName2} is different than expected value: ${dropBoxFileNamePath}`,
  );
  assert(
    uploadedFileName == response.data,
    `acctual value: ${response.data} is different than expected value: ${uploadedFileName}`,
  );

  console.log("Test for reading file works");

  // third test
  let deleteFileConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.dropboxapi.com/2/files/delete_v2",
    headers: {
      Authorization: myToken,
      "Content-Type": "application/json",
    },
    data: dropBoxFilePath,
  };

  response = await axios.request(deleteFileConfig);

  assert(
    response.status === 200,
    `acctual value: ${response.status} is different than expected value: ${200}`,
  );

  assert(
    response.headers["content-type"] === "application/json",
    `acctual value: ${response.headers["content-type"]} is different than expected value: ${"application/json"}`,
  );

  const dropBoxApiResultFileName3 = response.data["metadata"]["name"];
  assert(
    dropBoxApiResultFileName3 === dropBoxFileNamePath,
    `acctual value: ${dropBoxApiResultFileName2} is different than expected value: ${dropBoxFileNamePath}`,
  );

  console.log("Test for deleting file works");
}

runTests();
