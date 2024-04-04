module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "plugins": [
        "security",
        "node"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:node/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            },
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "quotes": ["error", "double", { "avoidEscape": true }],
        "indent": ["error", 4, { "SwitchCase": 1, "ignoreComments": false }],
        "semi": ["error", "always"], // Require semicolons at the end of statements
        "no-unused-vars": "warn", // Warn about variables that are declared but not used
        "no-console": "off", // Allow the use of console statements
        "eqeqeq": ["error", "always"], // Require the use of === and !==
        "curly": ["error", "all"], // Require curly braces for all control statements
        "brace-style": ["error", "1tbs"], // Enforce one true brace style
        "no-trailing-spaces": "error", // Disallow trailing spaces at the end of lines
        "no-multi-spaces": "error", // Disallow multiple spaces except for indentation
        "object-curly-spacing": ["error", "always"], // Require spacing inside curly braces
        "array-bracket-spacing": ["error", "never"], // Disallow spaces inside array brackets
        "space-in-parens": ["error", "never"], // Disallow spaces inside parentheses
        "keyword-spacing": ["error", { "before": true, "after": true }], // Require a space before and after keywords
        "func-call-spacing": ["error", "never"], // Require no space between function identifiers and their invocations
        "comma-spacing": ["error", { "before": false, "after": true }], // Enforce spacing before and after commas
        "comma-style": ["error", "last"], // Enforce comma style to be at the end of the line in lists
        "key-spacing": ["error", { "beforeColon": false, "afterColon": true }], // Enforce spacing around object literal property colons
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }], // Disallow multiple empty lines
        "multiline-comment-style": ["error", "starred-block"],

        "security/detect-object-injection": "error",
        "security/detect-non-literal-fs-filename": "error",
        "security/detect-non-literal-regexp": "error",
        "security/detect-non-literal-require": "error",
        "security/detect-unsafe-regex": "error",
        "node/no-deprecated-api": "warn",
        "node/no-extraneous-require": "error",
        "node/no-missing-require": "error",
        "prefer-const": "error",
        "no-var": "error",
        "prefer-arrow-callback": "error",

        "node/no-unsupported-features/es-syntax": ["error", { "version": ">=19.3.0" }],

        "spaced-comment": ["error", "always"],
        "camelcase": ["error", { "properties": "always" }],
        "prefer-rest-params": "error",
        "block-spacing": ["error", "always"],
        "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
    }
};