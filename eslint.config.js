import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
    js.configs.recommended,
    prettier,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
