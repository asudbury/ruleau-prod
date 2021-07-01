// eslint-disable-next-line import/prefer-default-export
export const TestRules = [
  {
    id: "rul_top",
    process: "proc_1",
    current_version: {
      id: "79ef0aca-cc8a-43f7-8949-51d9be624aa6",
      name: "top",
      rule: "rul_top",
      description: "A top level rule",
      dependencies: [
        {
          id: "009d4929-0279-4969-9561-98836b583fba",
          rule: "rul-mid",
        },
      ],
      override_level: 1,
      parameters: [
        {
          name: "Owner",
          value: "Penny Farthing",
        },
        {
          name: "Override Guidance",
          value: "Feel free to override in almost any circumstance",
        },
      ],
      doctests: [
        {
          result: "True",
          test:
            "kyc_risk_greater_than_threshold(None, {“data”: {“kyc”: “LOW”}})",
          payload: "{data: {capital: 10000}}",
          context: "None",
        },
      ],
      source: "hello source code 1",
    },
    versions: ["79ef0aca-cc8a-43f7-8949-51d9be624aa6"],
    internal_id: "7e83b081-ef58-4234-a2b8-e355fdb5b4af",
  },
  {
    id: "rul_mid",
    process: "proc_1",
    current_version: {
      id: "009d4929-0279-4969-9561-98836b583fba",
      name: "sub",
      rule: "rul_mid",
      description: "A rule nested in the top level",
      dependencies: [
        {
          id: "f24c1b6d-089a-4278-8a9f-fd9eff4b53a0",
          rule: "rul-bot",
        },
      ],
      override_level: 1,
      parameters: [
        {
          name: "Owner",
          value: "Penny Farthing",
        },
        {
          name: "Override Guidance",
          value: "Feel free to override in almost any circumstance",
        },
      ],
      doctests: [
        {
          result: "False",
          test:
            "kyc_risk_greater_than_threshold(None, {“data”: {“kyc”: “HIGH”}})",
          payload: "{data: {capital: 10000}}",
          context: "None",
        },
      ],
      source: "hello source code 2",
    },
    versions: ["009d4929-0279-4969-9561-98836b583fba"],
    internal_id: "1530ba3b-f375-4f60-8fb3-1988e159e4ff",
  },
  {
    id: "rul_bot",
    process: "proc_1",
    current_version: {
      id: "f24c1b6d-089a-4278-8a9f-fd9eff4b53a0",
      name: "sub_sub",
      rule: "rul_bot",
      description: "A rule nested in a nested rule",
      dependencies: [],
      override_level: 1,
      parameters: [],
      doctests: [],
      source: "hello source code 3",
    },
    versions: ["f24c1b6d-089a-4278-8a9f-fd9eff4b53a0"],
    internal_id: "c5715a97-7747-4578-affb-a943503a207d",
  },
];
