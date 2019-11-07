import * as React from "react";

import { CrowdinLoginProps, CrowdinLoginState } from "../";
import CrowdinLoginButton from "./CrowdinLoginButton";

export default class CrowdinLoginComponent extends React.Component<
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
