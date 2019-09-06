module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "es6": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "plugins": [
    "react", "react-perf", "react-hooks", "@typescript-eslint"
  ],
  "rules": {
    "quotes": "off",
    "semi": "off",
    "no-console": "off",
    "indent": [ "warn", 2 ],
    "linebreak-style": [ "error", "unix" ],
    "max-len": [
      "warn",
      {
        "ignoreStrings": true,
        "ignoreUrls": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "no-case-declarations": "warn",
    "no-unused-vars": "warn",
    "no-extra-semi": "warn",
    "no-var": "off", // Whould be good to turn on, but too much noise!
    "prefer-const": "warn",
    "no-sequences": "error",
    "eqeqeq": "warn",
    "no-warning-comments": "warn",
    "no-useless-escape": "warn",
    "no-redeclare": ["warn", { "builtinGlobals": true }],
    "camelcase": [ "off", { "properties": "never" } ],
    "@typescript-eslint/camelcase": ["off"],
    "one-var": ["warn", "never"],
    "no-extra-boolean-cast": ["warn"],
    "react/boolean-prop-naming": "warn",
    "react/no-deprecated": "warn",
    "react/no-typos": "error",
    "react/sort-comp": "off",
    "react/button-has-type": "warn",
    "react/display-name": "warn",
    "react/jsx-handler-names": ["warn"],
    "react/no-access-state-in-setstate": ["warn"],
    "react/no-find-dom-node": "off",
    "react/no-unused-prop-types": "warn",
    "react/prop-types": "warn",
    "react/no-string-refs": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/no-unescaped-entities": "warn",
    "react/jsx-indent-props": ["warn", 2],
    "react-perf/jsx-no-new-array-as-prop": "warn",
    "react/jsx-no-undef": ["error", { "allowGlobals": true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "@typescript-eslint/interface-name-prefix": ["warn", "never"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-empty-function": ["warn"],
    "@typescript-eslint/no-use-before-define": ["warn"],
    "@typescript-eslint/array-type": ["warn"],
    "@typescript-eslint/no-namespace": ["warn"],
    "@typescript-eslint/explicit-member-accessibility": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-inferrable-types": ["warn"],
    "@typescript-eslint/no-this-alias": ["warn"],
    "@typescript-eslint/array-type": ["off", {
      "array-type": ["error", "array"]
    }],
  },
  "overrides": [
    {
      "files": ["*.tsx"],
      "rules": {
        "react/prop-types": "off",
        "no-unused-vars": "off"
      }
    }
  ],
}
