
import React from "react";
import { Buffer } from "buffer";

// @ts-ignore
if (typeof window != "undefined") {
  window.Buffer = Buffer;
}
