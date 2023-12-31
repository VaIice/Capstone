// import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './Login';
import SignUp from "./SignUp";
import Home from './Home';
import Guide from './Guide';
import NoticeBoard from "./NoticeBoard";
import FreeBulletinBoard from "./FreeBulletinBoard";
import ReportBulletinBoard from "./ReportBulletinBoard";
import FreeBulletinBoardPage from "./FreeBulletinBoardPage";
import ReportBulletinBoardPage from "./ReportBulletinBoardPage";
import NoticeBulletinBoardPage from "./NoticeBulletinBoardPage";
import FreeBulletinBoardPageWriting from "./FreeBulletinBoardPageWriting";
import FreeBulletinBoardPageModifyWriting from "./FreeBulletinBoardPageModifyWriting";
import NoticeBulletinBoardPageWriting from "./NoticeBulletinBoardPageWriting";
import NoticeBulletinBoardPageModifyWriting from "./NoticeBulletinBoardPageModifyWriting";
import ReportBulletinBoardPageWriting from "./ReportBulletinBoardPageWriting";
import ReportBulletinBoardPageModifyWriting from "./ReportBulletinBoardPageModifyWriting";
import Information from "./Information";
import InformationPassword from "./InformationPassword";
import SearchPassword from "./SearchPassword";

function App() {
  const routes = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/FreeBulletinBoardPage/${index}`}
      element={<FreeBulletinBoardPage bno={index} />}
    />
  ));

  const routes1 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/FreeBulletinBoardPageWriting/${index}`}
      element={<FreeBulletinBoardPageWriting bno={index} />}
    />
  ));

  
  const routes2 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/NoticeBulletinBoardPage/${index}`}
      element={<NoticeBulletinBoardPage bno={index} />}
    />
  ));

  const routes3 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/NoticeBulletinBoardPageWriting/${index}`}
      element={<NoticeBulletinBoardPageWriting bno={index} />}
    />
  ));

  const routes4 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/ReportBulletinBoardPage/${index}`}
      element={<ReportBulletinBoardPage bno={index} />}
    />
  ));

  const routes5 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/ReportBulletinBoardPageWriting/${index}`}
      element={<ReportBulletinBoardPageWriting bno={index} />}
    />
  ));

  const routes6 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/FreeBulletinBoardPageModifyWriting/${index}`}
      element={<FreeBulletinBoardPageModifyWriting bno={index} />}
    />
  ));

  const routes7 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/NoticeBulletinBoardPageModifyWriting/${index}`}
      element={<NoticeBulletinBoardPageModifyWriting bno={index} />}
    />
  ));

  const routes8 = Array.from({ length: 1000 }, (_, index) => (
    <Route
      key={index}
      path={`/ReportBulletinBoardPageModifyWriting/${index}`}
      element={<ReportBulletinBoardPageModifyWriting bno={index} />}
    />
  ));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Information" element={<Information />} />
        <Route path="/InformationPassword" element={<InformationPassword />} />
        <Route path="/NoticeBoard" element={<NoticeBoard />} />
        <Route path="/FreeBulletinBoard" element={<FreeBulletinBoard />} />
        <Route path="/ReportBulletinBoard" element={<ReportBulletinBoard />} />
        <Route path="/FreeBulletinBoardPage" element={<FreeBulletinBoardPage />} />
        <Route path="/ReportBulletinBoardPage" element={<ReportBulletinBoardPage />} />
        <Route path="/NoticeBulletinBoardPage" element={<NoticeBulletinBoardPage />} />
        <Route path="/FreeBulletinBoardPageWriting" element={<FreeBulletinBoardPageWriting />} />
        <Route path="/NoticeBulletinBoardPageWriting" element={<NoticeBulletinBoardPageWriting />} />
        <Route path="/ReportBulletinBoardPageWriting" element={<ReportBulletinBoardPageWriting />} />
        <Route path="/SearchPassword" element={<SearchPassword/>} />
        <Route>
          {routes}
        </Route>
        <Route>
          {routes1}
        </Route>
        <Route>
          {routes2}
        </Route>
        <Route>
          {routes3}
        </Route>
        <Route>
          {routes4}
        </Route>
        <Route>
          {routes5}
        </Route>
        <Route>
          {routes6}
        </Route>
        <Route>
          {routes7}
        </Route>
        <Route>
          {routes8}
        </Route>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
