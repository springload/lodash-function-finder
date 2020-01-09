const examples = [
  {
    input: `["a", "b", "c"], "~"`,
    output: `"a~b~c"`
  },
  {
    input: `["a", "b"], [1, 2], [true, false]`,
    output: `[["a", 1, true], ["b", 2, false]]`
  },
  {
    input: `{ "a": [{ "b": { "c": 3 } }] }, "a[0].b.c"`,
    output: `3`
  },
  {
    input: `[2, 1, 3, 4], [2, 3]`,
    output: `[1, 4]`
  },
  {
    input: `[{ "x": 1 }, { "x": 2 }, { "x": 1 }], "x"`,
    output: `[{ "x": 1 }, { "x": 2 }]`
  },
  {
    input: `["a", "b", "c", "d"], 2`,
    output: `[["a", "b"], ["c", "d"]]`
  },
  {
    input: `[0, 1, false, 2, "", 3]`,
    output: `[1, 2, 3]`
  },
  {
    input: `[1], 2, [3], [[4]]`,
    output: `[1, 2, 3, [4]]`
  },
  {
    input: `[1, 2, 3], 2`,
    output: `[3]`
  },
  {
    input: `[1, 2, 3], "a"`,
    output: `["a", "a", "a"]`
  },
  {
    input: `[1, [2, [3, [4]], 5]]`,
    output: `[1, 2, [3, [4]], 5]`
  },
  {
    input: `[["a", 1], ["b", 2]]`,
    output: `{ "a": 1, "b": 2 }`
  },
  {
    input: `[1, 2, 3]`,
    output: `1`
  },
  {
    input: `[1, 2, 1, 2], 2, 2`,
    output: `3`
  },
  {
    input: `[1, 2, 3]`,
    output: `[1, 2]`
  },
  {
    input: `[1, 2, 1, 2], 2`,
    output: `3`
  },
  {
    input: `["a", "b", "c", "d"], 2`,
    output: `"c"`
  },
  {
    input: `[{ "user": "barney", "active": false }, { "user": "fred", "active": false }], { "user": "barney", "active": false }`,
    output: `false`
  },
  {
    input: `[{ "a": 1 }, { "b": 2 }]`,
    output: `[{ "a": 1 }, { "b": 2 }]`
  },
  {
    input: `[1, 2, 3]`,
    output: `true`
  },
  {
    input: `3, 1`,
    output: `true`
  },
  {
    input: `-10, -5, 5`,
    output: `-5`
  },
  {
    input: `{ "a": { "b": 2 } }, "a"`,
    output: `true`
  }
]

export default examples;
