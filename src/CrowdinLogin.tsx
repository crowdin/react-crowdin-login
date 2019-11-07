import * as React from "react";

import CrowdinLoginTypes from "../index";
import CrowdinLoginButton from "./CrowdinLoginButton";

export default class CrowdinLogin extends CrowdinLoginTypes {
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
