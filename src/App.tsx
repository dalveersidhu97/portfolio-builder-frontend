import './App.css';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Layout } from './components';
import { MobileProvider } from './store';
import { AboutPage, SkillsPage } from './pages';
import { ExperiencePage } from './pages/Experience';
import { ResumePage } from './pages/Resume';
import { UserProvider, useUserContext } from './store/context/UserProvider';
import { useUserQuery } from './apolloClient';
import { LandingPage } from './pages/Landing';

const UserRoutes = ({replaceRoot}: {replaceRoot?: boolean}) => {
  const params = useParams();
  const { user, setUser } = useUserContext();
  const slug = params['slug'] || 'dalveersidhu97@gmail.com';
  const { loading, error } = useUserQuery({ emailOrId: slug }, {
    onCompleted(data) {
      if (data?.user) {
        setUser(data.user)
      }
    },
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>{ error.message }</p>
  if (!user) return <></>;
  return (
    <Routes>
      {!replaceRoot && <Route path='/' element={<Navigate to={'../about'} relative='path'></Navigate>}></Route>}
      <Route path='about' element={<AboutPage />}></Route>
      <Route path='skills' element={<SkillsPage />}></Route>
      <Route path='experience' element={<ExperiencePage />}></Route>
      <Route path='resume' element={<ResumePage />}></Route>
    </Routes>
  );
}

function App() {
  return (
    <MobileProvider>
      <UserProvider>
          <Routes>
            <Route path='user'>
              <Route path=':slug/*' element={<Layout><UserRoutes></UserRoutes></Layout>}></Route>
            </Route>
            <Route path='/me/*' element={<Layout><UserRoutes></UserRoutes></Layout>}></Route>
            <Route path='/'  element={<LandingPage></LandingPage>}></Route>
            <Route path='/*'  element={<Layout><UserRoutes></UserRoutes></Layout>}></Route>
          </Routes>
      </UserProvider>
    </MobileProvider>
  );
}

export default App;
