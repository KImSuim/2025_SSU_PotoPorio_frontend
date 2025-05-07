// .eslintrc.js
module.exports = {
  extends: ["next/core-web-vitals", "next", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // any 허용
    "@typescript-eslint/no-unused-vars": "off", // 사용 안한 변수 경고 제거 (선택)
    "react/no-unescaped-entities": "off", // 큰따옴표 등의 문자 관련 경고 제거 (선택)
  },
};
