import * as React from "react";

type CrowdinLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light";

interface CrowdinLoginProps {
  /**
   * Application (client) ID
   */
  clientId: string;

  /**
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (error?: any, result?: any) => void;

  /**
   * Select the access your app requires from the list of scopes available
   */
  scope: string;

  /**
   * The redirect URI of the application, this should be same as the value in the application registration portal.
   */
  redirectUri: string;

  /**
   * Name of theme for button style.
   */
  buttonTheme?: CrowdinLoginButtonTheme;

  /**
   * Enable detailed logs of authorization process.
   */
  debug?: boolean;

  /**
   * Additional class name string.
   */
  className?: string;
}

interface CrowdinLoginState {
  isCompleted: boolean;
  popup?: Window;
}

declare class CrowdinLogin extends React.Component<
  CrowdinLoginProps,
  CrowdinLoginState
> {}

export { CrowdinLogin, CrowdinLoginProps, CrowdinLoginState, CrowdinLoginButtonTheme };

export default CrowdinLogin;
