[<p align="center"><img src="https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png" data-canonical-src="https://support.crowdin.com/assets/logos/crowdin-dark-symbol.png" width="200" height="200" align="center"/></p>](https://crowdin.com)

# React Crowdin Login

React component for a simple OAuth login with Crowdin

![light border lowerc short](images/light_border_lowerc_short.svg)
![light border lowerc](images/light_border_lowerc.svg)
![dark border lowerc short](images/dark_border_lowerc_short.svg)
![dark border lowerc](images/dark_border_lowerc.svg)

### Get Started

Follow these steps to start using React Crowdin Login:

1. Installation

```sh
# with npm
npm i react-crowdin-login

# with yarn
yarn add react-crowdin-login
```

2. Import and configure component.

```jsx
import React from "react";
import CrowdinLogin from "react-crowdin-login";

export default props => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <CrowdinLogin
      authCallback={authHandler}
      clientId={CLIENT_ID}
      clientSecret={CLIENT_SECRET}
      domain={ORG_DOMAIN}
      redirectUri={REDIRECT_URI}
      scope={SCOPE}
    />
  );
};
```

3. Find more info about keys and OAuth apps in official docs ― [Creating an OAuth App](https://support.crowdin.com/enterprise/creating-oauth-app/)

### API

| Property     | Type                                                       | Default   | Description                                                                                                                                      |
| ------------ | ---------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| authCallback | function                                                   | required  | Callback function which takes two arguments `(error, authData)`                                                                                  |
| clientId     | string                                                     | required  | Client ID of your OAuth App                                                                                                                      |
| clientSecret | string                                                     | required  | Client Secret of your OAuth App                                                                                                                  |
| domain       | string                                                     | required  | Domain of your Crowdin organization                                                                                                              |
| redirectUri  | string                                                     | required  | Authorization callback URL of your OAuth App                                                                                                     |
| scope        | string                                                     | required  | Scope that will be requested. [Understanding Scopes for OAuth Apps](https://support.crowdin.com/enterprise/understanding-scopes-for-oauth-apps/) |
| buttonTheme  | enum: `"light"`, `"light_short"`, `"dark"`, `"dark_short"` | `"light"` | Button style theme, that based on [Login Branding Guidelines](https://github.com/crowdin/react-crowdin-login/wiki/Login-Branding-Guidelines)     |
| className    | string                                                     | `""`      | Custom class name                                                                                                                                |

### Contribution

We are happy to accept contributions to the React Crowdin Login. To contribute please do the following:

1. Fork the repository on GitHub.
2. Decide which code you want to submit. Commit your changes and push to the new branch.
3. Ensure that your code adheres to standard conventions, as used in the rest of the library.
4. Submit a pull request with your patch on Github.

### Seeking Assistance

If you find any problems or would like to suggest a feature, please feel free to file an issue on Github at [Issues Page](https://github.com/crowdin/react-crowdin-login/issues).

Need help working with React Crowdin Login or have any questions?
[Contact Customer Success Service](https://crowdin.com/contacts).

### Author

- Alexandr Tovmach (alexandrtovmach@gmail.com)

### License

<pre>
Copyright © 2019 Crowdin

The React Crowdin Login is licensed under the MIT License.
See the LICENSE file distributed with this work for additional
information regarding copyright ownership.

Except as contained in the LICENSE file, the name(s) of the above copyright
holders shall not be used in advertising or otherwise to promote the sale,
use or other dealings in this Software without prior written authorization.
</pre>
