import { FLIP } from "@/common/primary/FLIP";
import { mockDOMRect } from "../../utils";

describe("FLIP", () => {
  it("Should should init", () => {
    const el = document.createElement("div");
    const oldPos = mockDOMRect();
    expect(FLIP(el, oldPos).play).toBeTruthy();
  });
});
