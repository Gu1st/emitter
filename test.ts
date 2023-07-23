import { describe, expect, test } from "@jest/globals";

import HarexsMitt from "./src/index";

const emit = HarexsMitt();

describe("emit module", () => {
  test("emit event", () => {
    let res: any = "";
    emit.on("harexs", (result: any) => {
      res = result;
    });
    emit.emit("harexs", 998);
    expect(res).toBe(998);
  });
});

describe("once module", () => {
  test("once event", () => {
    let res: any = "";
    emit.once("harexs", (result: any) => {
      res = result;
    });
    emit.emit("harexs", 998);
    emit.emit("harexs", 1);
    expect(res).not.toBe(1);
  });
});
