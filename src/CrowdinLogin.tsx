import * as React from "react";

import { CrowdinLoginProps } from "../index";
import CrowdinLoginButton from "./CrowdinLoginButton";


interface CrowdinLoginState {
  scopes: string;
}

export default class CrowdinLogin extends React.Component<
  CrowdinLoginProps,
  CrowdinLoginState
> {
  render() {
    const { buttonTheme, className, children } = this.props;
    return children ? (
      <div onClick={console.log}>{children}</div>
    ) : (
      <CrowdinLoginButton
        buttonTheme={buttonTheme || "light"}
        buttonClassName={className}
        onClick={console.log}
      />
    );
  }
}
