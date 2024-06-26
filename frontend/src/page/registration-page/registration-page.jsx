import { Header } from '../../component/header/header.jsx';
import { Registration } from '../../component/registration/registration.jsx';

// eslint-disable-next-line import/prefer-default-export
export const RegistrationPage = () => (
  <div className="container-fluid h-100">
    <Header />
    <div className="row justify-content-center align-content-center h-100 my-5">
      <div className="col-12 col-md-8 col-xxl-6">
        <Registration />
      </div>
    </div>
  </div>
);
