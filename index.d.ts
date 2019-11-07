import * as React from "react";

type ButtonTheme = "dark_short" | "light_short" | "dark" | "light";

export interface CrowdinLoginProps extends React.Props<CrowdinLogin> {
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
  buttonTheme?: ButtonTheme;

  /**
   * Enable detailed logs of authorization process.
   */
  debug?: boolean;

  /**
   * Additional class name string.
   */
  className?: string;
}

export interface CrowdinLoginButtonProps
  extends React.Props<CrowdinLoginButton> {
  buttonTheme: ButtonTheme;
  buttonClassName?: string;
  onClick?: any;
}

declare class CrowdinLogin extends React.Component<
  CrowdinLoginProps,
  any
> {}
declare class CrowdinLoginButton extends React.Component<
  CrowdinLoginButtonProps,
  any
> {}

declare module "crowdin-login" {}
declare module "crowdin-login-button" {}

export default CrowdinLogin;
