import React, { useState } from "react";
import {
  Container,
  Header,
  Label,
  Icon,
  Segment,
  Select,
  Form
} from "semantic-ui-react";

import config from "./config";
import { CrowdinLogin } from "@crowdin/react-crowdin-login";

const ExamplePage = () => {
  const { clientId, customClassName, scopes, themeOptions } = config;

  const [state, setState] = useState({
    clientId,
    customClassName,
    redirectUri: window.location.href,
    scope: [scopes[0].value],
    buttonTheme: themeOptions[0].value,
  });

  const handleChange = (value, type) => {
    setState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const loginHandler = (err, data) => {
    console.log(err, data);
  };

  const { clientId: clientIdState, scope, buttonTheme, customClassName: customClassNameState, redirectUri } = state;

  return (
    <div className="viewport">
      <Segment basic>
        <Container text>
          <Header as="h2">
            react-crowdin-login
            <Label
              basic
              size="mini"
              as="a"
              href="https://github.com/crowdin/react-crowdin-login"
            >
              <Icon name="github" />
              GitHub
            </Label>
            <Label
              basic
              size="mini"
              as="a"
              href="https://www.npmjs.com/package/@crowdin/react-crowdin-login"
            >
              <Icon name="npm" />
              NPM
            </Label>
          </Header>

          <p>
            React component for easy login to Crowdin services using OAuth
            technology without backend.
          </p>
          <Segment>
            <Form>
              <Form.Field>
                <label>Client ID</label>
                <input
                  onChange={e => handleChange(e.target.value, "clientId")}
                  placeholder="Your Client ID"
                  value={clientIdState}
                />
              </Form.Field>
              <Form.Field>
                <label>Redirect URI</label>
                <input
                  onChange={e => handleChange(e.target.value, "redirectUri")}
                  placeholder="https://example.com"
                  value={redirectUri}
                />
              </Form.Field>
              <Form.Field>
                <label>Scope</label>
                <Select
                  multiple
                  onChange={(e, { value }) => handleChange(value, "scope")}
                  placeholder="tm"
                  options={config.scopes}
                  value={scope}
                />
              </Form.Field>
              <Form.Field>
                <label>Button theme</label>
                <Select
                  onChange={(e, { value }) => handleChange(value, "buttonTheme")}
                  labeled
                  label="Button theme"
                  placeholder="Select your country"
                  options={config.themeOptions}
                  value={buttonTheme}
                />
              </Form.Field>
              <Form.Field>
                <label>Class name</label>
                <input
                  onChange={e => handleChange(e.target.value, "customClassName")}
                  placeholder="my-custom-class"
                  value={customClassNameState}
                />
              </Form.Field>
              <Form.Field>
                <label>Auth callback</label>
                <code>{`(err, data) => console.log(err, data)`}</code>
              </Form.Field>
            </Form>
          </Segment>
          <Segment>
            <CrowdinLogin
              clientId={clientIdState}
              authCallback={loginHandler}
              buttonTheme={buttonTheme}
              className={customClassNameState}
              redirectUri={redirectUri}
              scope={scope}
            />
          </Segment>
        </Container>
      </Segment>
    </div>
  );
};

export default ExamplePage;
