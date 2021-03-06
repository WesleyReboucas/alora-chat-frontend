import React, { Component } from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import {
  ButtonComponent,
  InputComponent,
  FormComponent,
  FlashMessageComponent,
} from 'shared/components';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import constants from 'modules/constants';
import * as authActions from 'redux/actions/auth';

import './styles.scss';

class SignInFormContainer extends Component {
  onCloseFlashMessage = () => {
    const { authActions } = this.props;

    const { resetSignIn } = authActions;

    resetSignIn();
  };

  render() {
    const { authActions, authData } = this.props;

    const { postSignIn } = authActions;

    const { signIn } = authData;

    const { errors } = signIn;

    return (
      <FormComponent
        formName="SignInForm"
        values={{
          nickname: '',
          password: '',
        }}
        handleSubmit={(values) => {
          if (!signIn.isFetching) {
            const params = {
              body: values,
            };

            postSignIn(params);
          }
        }}
        render={({ handleChange, handleSubmit, form }) => {
          return (
            <form onSubmit={handleSubmit}>
              {errors.nickname ? (
                <FlashMessageComponent
                  width={280}
                  margin="10px 0px"
                  message={errors.nickname}
                  onClose={this.onCloseFlashMessage}
                  error
                />
              ) : null}
              <InputComponent
                name="nickname"
                placeholder={constants.LABELS.AUTH.NICKNAME}
                type="text"
                autoComplete="off"
                onChange={handleChange}
                maxLength={12}
                margin="13px 0px 13px 0px"
                width={280}
                defaultButton
              />
              <InputComponent
                name="password"
                placeholder={constants.LABELS.AUTH.PASSWORD}
                type="password"
                autoComplete="off"
                onChange={handleChange}
                maxLength={12}
                margin="13px 0px 13px 0px"
                width={280}
                defaultButton
              />
              <ButtonComponent
                type="submit"
                primary
                text="Sign In"
                isFetching={signIn.isFetching}
                margin="24px 0px 0px 0px"
                width={280}
                disabled={false}
              />
              <p className="social-buttons--label">- or -</p>
              <FacebookLoginButton
                style={{ margin: 0, marginTop: 10, width: '100%' }}
                disabled
              />

              <GoogleLoginButton
                style={{ margin: 0, marginTop: 10, width: '100%' }}
              />
            </form>
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInFormContainer);
