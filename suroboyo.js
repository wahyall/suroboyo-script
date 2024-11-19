#!/usr/bin/env node

const fs = require("fs");
const translateToJS = require("./libs/translate");

function runSbyFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(
      `File '${filePath}' ga isok dijupuk. Salah paling lokasi ne opo ancen ga onk file e.`
    );
    return;
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ga isok moco file E:", err);
      return;
    }
    const jsCode = translateToJS(data);
    try {
      eval(jsCode);
    } catch (e) {
      console.error("Onk error pas kode ne dijalakno:", e);
    }
  });
}

const filePath = process.argv[2];

if (!filePath) {
  console.log("Lebokno lokasi file sg bener");
} else if (filePath.endsWith(".sby")) {
  runSbyFile(filePath);
} else {
  console.error("File e kudu ekstensi .sby");
}
