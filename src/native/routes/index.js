import React from "react";
import { Scene, Tabs, Stack } from "react-native-router-flux";
import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";

import DefaultProps from "../constants/navigation";
import AppConfig from "../../constants/config";

import PostsContainer from "../../containers/Posts";
import PostsComponent from "../components/Posts";
import PostViewComponent from "../components/SinglePost";

import UsersContainer from "../../containers/Users";
import UsersComponent from "../components/Users";

import SignUpContainer from "../../containers/SignUp";
import SignUpComponent from "../components/SignUp";

import NewPostContainer from "../../containers/NewPost";
import NewPostComponent from "../components/NewPost";

import LoginContainer from "../../containers/Login";
import LoginComponent from "../components/Login";

import ForgotPasswordContainer from "../../containers/ForgotPassword";
import ForgotPasswordComponent from "../components/ForgotPassword";

import LocaleContainer from "../../containers/Locale";
import LocaleComponent from "../components/Locale";

import UpdateProfileContainer from "../../containers/UpdateProfile";
import UpdateProfileComponent from "../components/UpdateProfile";

import MemberContainer from "../../containers/Member";
import ProfileComponent from "../components/Profile";

import HomeComponent from "../components/Home";

const Index = (
  <Stack hideNavBar>
    <Scene modal="true" hideNavBar>
      <Tabs lazy="true" {...DefaultProps.tabProps}>
        <Stack
          key="homeStack"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="home" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="home"
            component={MemberContainer}
            Layout={HomeComponent}
          />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
        </Stack>

        <Stack
          key="postStack"
          title="POSTS"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="posts"
            component={PostsContainer}
            Layout={PostsComponent}
          />
          <Scene
            key="newPost"
            title="NEW POST"
            rightTitle=""
            component={NewPostContainer}
            Layout={NewPostComponent}
            {...DefaultProps.navbarProps}
          />
        </Stack>

        <Stack
          key="userStack"
          title="USERS"
          icon={() => <Icon name="ios-person" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="users"
            component={UsersContainer}
            Layout={UsersComponent}
          />
        </Stack>

        <Stack
          key="profile"
          title="PROFILE"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="profileHome"
            component={MemberContainer}
            Layout={ProfileComponent}
          />

          <Scene
            back
            key="locale"
            title="CHANGE LANGUAGE"
            {...DefaultProps.navbarProps}
            component={LocaleContainer}
            Layout={LocaleComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="post"
      title="POST"
      {...DefaultProps.navbarProps}
      component={PostsContainer}
      Layout={PostViewComponent}
    />
  </Stack>
);

export default Index;
