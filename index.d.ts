import * as React from "react";

export type CrowdinLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light";

interface CrowdinLoginProps extends React.Props<CrowdinLogin> {
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
   * Organization domain name
   */
  domain: string;

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
  scopes: string;
}

declare class CrowdinLogin extends React.Component<
  CrowdinLoginProps,
  CrowdinLoginState
> {}

declare module "crowdin-login" {}

export default CrowdinLogin;
