const examples = [
  {
    name: `_.join`,
    input: `["a", "b", "c"], "~"`,
    output: `"a~b~c"`
  },
  {
    name: `_.zip`,
    input: `["a", "b"], [1, 2], [true, false]`,
    output: `[["a", 1, true], ["b", 2, false]]`
  },
  {
    name: `_.get`,
    input: `{ "a": [{ "b": { "c": 3 } }] }, "a[0].b.c"`,
    output: `3`
  },
  {
    name: `_.difference`,
    input: `[2, 1, 3, 4], [2, 3]`,
    output: `[1, 4]`
  },
  {
    name: `_.uniqBy`,
    input: `[{ "x": 1 }, { "x": 2 }, { "x": 1 }], "x"`,
    output: `[{ "x": 1 }, { "x": 2 }]`
  }
]

export default examples;
