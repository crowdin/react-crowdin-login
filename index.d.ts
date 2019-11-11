import * as React from "react";

type CrowdinLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light";

interface CrowdinLoginProps {
  /**
   * Application (client) ID
   */
  clientId: string;

  /**
   * Application (client) ID
   */
  clientSecret: string;

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
  openModal: boolean;
  code?: string;
}
