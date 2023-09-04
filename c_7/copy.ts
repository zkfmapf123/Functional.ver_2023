import * as _ from "lodash";

const a = {
  name: "leedonggyu",
  age: 30,
  skills: {
    lang: ["typescript", "golang", "java"],
    devops: ["aws", "gcp", "kubernetes"],
  },
};

const shallow_copy = () => {
  const newA = Object.assign({}, a);
  console.log("newA : ", newA);

  a.name = "heyheyhey";
  console.log("a >> ", a);
  console.log("newA >> ", newA);

  a.skills.lang[0] = "new Type";
  console.log("a >> ", a);
  console.log("newA >> ", newA);
};

const deep_copy = () => {
  const newA = _.cloneDeep(a);
  console.log("newA : ", newA);

  a.name = "heyheyhey";
  console.log("a >> ", a);
  console.log("newA >> ", newA);

  a.skills.lang[0] = "new Type";
  console.log("a >> ", a);
  console.log("newA >> ", newA);
};

// shallow_copy();
deep_copy();
