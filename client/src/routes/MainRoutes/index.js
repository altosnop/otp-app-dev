import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../../pages/Main';
import Admin from '../../pages/Admin';
import CreateOtp from '../../pages/CreateOtp';
import OtpInfo from '../../pages/OtpInfo';
import UploadVideo from '../../pages/UploadVideo';
import SignIn from '../../components/SignIn';
import AdminRoute from '../ProtectedRoutes/index';
import FilesInfo from '../../pages/FilesInfo';

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Main />} />
      <Route exact path="/admin-login" render={() => <SignIn />} />
      <AdminRoute exact path="/admin" component={Admin} />
      <AdminRoute exact path="/admin/create-otp" component={CreateOtp} />
      <AdminRoute exact path="/admin/otp-info" component={OtpInfo} />
      <AdminRoute exact path="/admin/files-info" component={FilesInfo} />
      <AdminRoute exact path="/admin/upload-video" component={UploadVideo} />
    </Switch>
  );
};

export default MainRoutes;
