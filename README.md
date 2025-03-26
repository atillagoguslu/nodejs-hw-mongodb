<!-- Ana başlık -->
## Proje Başlatma

# Yüklü mü?
```bash
node --version
```

# package.json oluştur
```bash
npm init -y
```
# src klasötü oluştur
```bash
mkdir src
```

# nodemon kütüphanesini yükle
```bash
npm install --save-dev nodemon
```

# package.json dosyasını düzenle
```json
"scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
}
```

# Artık projeyi başlat
```bash
npm run dev
```
## ESLint Entegrasyonu

# VSCode eklentisini yükle

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

# ESLint kurulumu

```bash
npm init @eslint/config@latest
```

- Syntax ve Problemler için "problem"
- Javascript modules (import/export) "esm"
- Framework "none"
- Typescript "no"
- Code run "node" <!--  space ile browser'ın tiki kaldırılıp node seçilecek -->
- Install them now "yes"
- Package manager "npm"

Artık ESLint kodunuzu kontrol edecek.

# Editorconfig

.editorconfig dosyasını oluştur
"EditorConfig for VS Code" eklentisini yükle

```bash
//.editorconfig

root = true

[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

# Prettier

```bash
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}

// eslint.config.mjs (.js/.cjs)

import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: { 
	    semi: 'error', 
	    'no-unused-vars': ['error', { args: 'none' }], 
	    'no-undef': 'error' 
	  },
  },
];
```

