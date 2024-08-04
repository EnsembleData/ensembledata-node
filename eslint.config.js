import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    prettier,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
    },
];
