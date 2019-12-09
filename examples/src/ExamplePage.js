import React from 'react';
import { Container, Header, Label, Icon, Segment, Select, Radio, Form } from 'semantic-ui-react';

import config from "./config";
import CrowdinLogin from "../../dist";

export default class ExaplePage extends React.Component {
  constructor(props, context) {
    super(props, context);

		const { clientId, clientSecret, customClassName, scopes, domain, themeOptions } = config;    
    this.state = {
      clientId,
      clientSecret,
			domain,
			customClassName,
      redirectUri: window.location.href,
			scope: [scopes[0].value],
      buttonTheme: themeOptions[0].value
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  
  handleChange(value, type) {
    this.setState({
      [type]: value
    });
  }

  loginHandler(err, data) {
    console.log(err, data);
  };

  render() {
    const { clientId, clientSecret, scope, buttonTheme, domain, customClassName, redirectUri } = this.state;
    return (
      <div className="viewport">
        <Segment basic>
          <Container text>
            <Header as='h2'>
              react-crowdin-login
              <Label basic size="mini" as='a' href="https://github.com/crowdin/react-crowdin-login">
                <Icon name='github' />GitHub
              </Label>
              <Label basic size="mini" as='a' href="https://www.npmjs.com/package/@crowdin/react-crowdin-login">
                <Icon name='npm' />NPM
              </Label>
            </Header>
            
            <p>
              React component for easy login to Crowdin services using OAuth technology without backend.
            </p>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Client ID</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "clientId")}
                    placeholder={config.clientId}
                    value={clientId}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Client Secret</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "clientSecret")}
                    placeholder={config.clientSecret}
                    value={clientSecret}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Redirect URI</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "redirectUri")}
                    placeholder='https://example.com'
                    value={redirectUri}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Domain</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "domain")}
                    placeholder='crowdinorg'
                    value={domain}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Scope</label>
                  <Select
                    multiple
                    onChange={e => this.handleChange(e.target.value, "scope")}
                    placeholder='tm'
                    options={config.scopes}
                    defaultValue={scope}
                    value={scope}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Button theme</label>
                  <Select
                    onChange={(e, data) => this.handleChange(data.value, "buttonTheme")}
                    labeled
                    label="Button theme"
                    placeholder='Select your country'
                    options={config.themeOptions}
                    defaultValue={buttonTheme}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Class name</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "customClassName")}
                    placeholder='my-custom-class'
                    value={customClassName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Auth callback</label>
                  <code>
                    {`(err, data) => console.log(err, data)`}
                  </code>
                </Form.Field>
                {/* <Form.Field>
                  <Radio
                    onChange={(e, data) => this.handleChange(data.checked, "debug")}
                    label="Debug"
                    defaultChecked={debug}
                    toggle
                  />
                </Form.Field> */}
              </Form>
            </Segment>
            <Segment>
              <CrowdinLogin
                // debug={debug}
                clientId={clientId}
                clientSecret={clientSecret}
                domain={domain}
                authCallback={this.loginHandler}
                buttonTheme={buttonTheme}
                className={customClassName}
                redirectUri={redirectUri}
                scope={scope}
							/>
            </Segment>
          </Container>
        </Segment>
      </div>
    );
  }
}