<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://support.crowdin.com/assets/logos/symbol/png/crowdin-symbol-cWhite.png">
    <source media="(prefers-color-scheme: light)" srcset="https://support.crowdin.com/assets/logos/symbol/png/crowdin-symbol-cDark.png">
    <img width="150" height="150" src="[https://support.crowdin.com/assets/logos/symbol/png/crowdin-symbol-cDark.png](https://crowdin.com)">
  </picture>
</p>

# React Crowdin Login

[![npm](https://img.shields.io/npm/v/@crowdin/react-crowdin-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/@crowdin/react-crowdin-login)
[![npm](https://img.shields.io/npm/dt/@crowdin/react-crowdin-login?cacheSeconds=1800)](https://www.npmjs.com/package/@crowdin/react-crowdin-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@crowdin/react-crowdin-login?cacheSeconds=1800)](https://www.npmjs.com/package/@crowdin/react-crowdin-login)
[![GitHub issues](https://img.shields.io/github/issues/crowdin/react-crowdin-login?cacheSeconds=1800)](https://github.com/crowdin/react-crowdin-login/issues)

React component for a simple OAuth login with [Crowdin](https://crowdin.com/).

[View Demo](https://crowdin.github.io/react-crowdin-login/)

![light border lowerc short](https://raw.github.com/crowdin/react-crowdin-login/master/images/light_border_lowerc_short.svg?sanitize=true)
![light border lowerc](https://raw.github.com/crowdin/react-crowdin-login/master/images/light_border_lowerc.svg?sanitize=true)
![dark border lowerc short](https://raw.github.com/crowdin/react-crowdin-login/master/images/dark_border_lowerc_short.svg?sanitize=true)
![dark border lowerc](https://raw.github.com/crowdin/react-crowdin-login/master/images/dark_border_lowerc.svg?sanitize=true)

### Get Started

Follow these steps to start using React Crowdin Login:

1. Installation

    ```sh
    # with npm
    npm i @crowdin/react-crowdin-login
  
    # with yarn
    yarn add @crowdin/react-crowdin-login
    ```

2. Import and configure component:

    ```jsx
    import React from "react";
    import { CrowdinLogin } from "@crowdin/react-crowdin-login";
    
    export default props => {
      const authHandler = (err, data) => {
        console.log(err, data);
      };
    
      return (
        <CrowdinLogin
          authCallback={authHandler}
          clientId={CLIENT_ID}
          redirectUri={REDIRECT_URI}
          scope={SCOPE}
        />
      );
    };
    ```

3.  Read more about OAuth applications in the official docs ― [OAuth Apps](https://support.crowdin.com/enterprise/organization-settings/#oauth-apps).

### API

| Property     | Type                                                       | Default   | Description                                                                                                                                      |
|--------------|------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| authCallback | function                                                   | required  | Callback function which takes two arguments `(error, authData)`                                                                                  |
| clientId     | string                                                     | required  | Client ID of your OAuth App                                                                                                                      |
| redirectUri  | string                                                     | required  | Authorization callback URL of your OAuth App                                                                                                     |
| scope        | string                                                     | required  | Scope that will be requested. [Understanding Scopes for OAuth Apps](https://support.crowdin.com/enterprise/understanding-scopes-for-oauth-apps/) |
| buttonTheme  | enum: `"light"`, `"light_short"`, `"dark"`, `"dark_short"` | `"light"` | Button style theme, that based on [Login Branding Guidelines](https://github.com/crowdin/react-crowdin-login/wiki/Login-Branding-Guidelines)     |
| className    | string                                                     | `""`      | Custom class name                                                                                                                                |

### Seeking Assistance

If you find any problems or would like to suggest a feature, please read the [How can I contribute](/CONTRIBUTING.md#how-can-i-contribute) section in our contributing guidelines.

### Author

- Alexandr Tovmach (alexandrtovmach@gmail.com)

### License

<pre>
The React Crowdin Login is licensed under the MIT License.
See the LICENSE file distributed with this work for additional
information regarding copyright ownership.

Except as contained in the LICENSE file, the name(s) of the above copyright
holders shall not be used in advertising or otherwise to promote the sale,
use or other dealings in this Software without prior written authorization.
</pre>
