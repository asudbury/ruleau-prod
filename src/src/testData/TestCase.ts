// eslint-disable-next-line import/prefer-default-export
export const TestCase = {
  id: "ACME1",
  payload: {
    kyc: "low",
    ccjs: [],
    fico_score: 150,
  },
  result: null,
  process: "proc_1",
  rules: [
    {
      id: "rul_top",
      result: {
        id: "e253bf7f-40d1-4748-9767-69c7a5ef8671",
        result: null,
        status: "PENDING",
        payloads: [],
        override: null,
        original_result: null,
      },
      rule_version: {
        id: "244f6294-1a78-4b86-b844-8a057db65106",
        name: "top",
        rule: "rul_top",
        description: "A top level rule",
        dependencies: ["fd2297e2-d5bb-400f-a776-c9a74b9c77e9"],
        override_level: 1,
      },
    },
    {
      id: "rul_mid",
      result: {
        id: "6fd5bb8a-9783-4d86-ac88-f84a693495c2",
        result: null,
        status: "PENDING",
        payloads: [],
        override: null,
        original_result: null,
      },
      rule_version: {
        id: "fd2297e2-d5bb-400f-a776-c9a74b9c77e9",
        name: "sub",
        rule: "rul_mid",
        description: "A rule nested in the top level",
        dependencies: ["57ae6dc7-7c46-4c1b-85de-700cf8c7874c"],
        override_level: 1,
      },
    },
    {
      id: "rul_bot",
      result: {
        id: "19a660e6-b5db-4ce6-bd4a-7be363d4df04",
        result: null,
        status: "PENDING",
        payloads: [],
        override: null,
        original_result: null,
      },
      rule_version: {
        id: "57ae6dc7-7c46-4c1b-85de-700cf8c7874c",
        name: "sub_sub",
        rule: "rul_bot",
        description: "A rule nested in a nested rule",
        dependencies: [],
        override_level: 2,
      },
    },
  ],
  created_at: "2021-06-10T09:52:58.959776Z",
  status: "CLOSED",
  internal_id: "5321d355-8e99-4769-856f-c7e4bb71d8e9",
};
