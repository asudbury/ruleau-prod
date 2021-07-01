/* eslint-disable import/prefer-default-export */
export const TestProcessCaseOverrides = [
  {
    id: "c81d6f13-389b-4752-abd0-86c90c135799",
    override_reason: "lorem ipsum 1",
    applied: true,
    created_at: "2021-03-29T09:11:50.233137Z",
    case: {
      internal_id: "99732c2b-fb00-49ce-b941-ad03144c32eb",
      id: "ACME1",
    },
    rule: {
      name: "kyc_risk_greater_than_threshold",
      current_version: {
        id: "bfcf8853-80f2-4c91-a08a-6d88b9ce22b2",
        name: "top",
        rule: "rul_top",
        description: "A top level rule",
        dependencies: [
          {
            id: "af2ce79f-19c5-496c-84a1-a5ce4751f0c0",
            rule: "rul_mid",
          },
        ],
        override_level: 2,
        parameters: [],
        doctests: [],
      },
    },
  },
  {
    id: "68ffbc28-54be-4c90-9641-c28929c64cd3",
    override_reason: "lorem ipsum 2",
    applied: false,
    created_at: "2021-03-29T09:12:34.010851Z",
    case: {
      internal_id: "99732c2b-fb00-49ce-b941-ad03144c32eb",
      id: "ACME1",
    },
    rule: {
      current_version: {
        id: "bfcf8853-80f2-4c91-a08a-6d88b9ce22b2",
        name: "top",
        rule: "rul_sub1",
        description: "A sub rule",
        dependencies: [
          {
            id: "af2ce79f-19c5-496c-84a1-a5ce4751f0c0",
            rule: "rul_low",
          },
        ],
        override_level: 2,
        parameters: [],
        doctests: [],
      },
    },
  },
  {
    id: "78bf87d9-eb42-425d-98e1-455c278c5b86",
    override_reason: "lorem ipsum 3",
    applied: true,
    created_at: "2021-03-29T09:14:54.201573Z",
    case: {
      internal_id: "99732c2b-fb00-49ce-b941-ad03144c32eb",
      id: "ACME1",
    },
    rule: {
      name: "kyc_risk_greater_than_threshold",
      current_version: {
        id: "bfcf8853-80f2-4c91-a08a-6d88b9ce22b2",
        name: "bottom",
        rule: "rul_bottom",
        description: "A sub sub rule",
        dependencies: [
          {
            id: "af2ce79f-19c5-496c-84a1-a5ce4751f0c0",
            rule: "rul_mid",
          },
        ],
        override_level: 2,
        parameters: [],
        doctests: [],
      },
    },
  },
];
