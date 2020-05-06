import sinon from "sinon";

export const mockDOMRect = (x = 10, y = 10) => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  toJSON: sinon.stub(),
  x,
  y
});
