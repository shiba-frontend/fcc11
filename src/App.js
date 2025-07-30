import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Index from "./component/user/home/Index";
import SignUp from "./component/auth/SignUp";
import Dashboard from "./component/user/dashboard/Dashboard";
import LeaderBoard from "./component/user/LeaderBoard";
import CreateTeam from "./component/user/team/CreateTeam";
import CaptainSelect from "./component/user/team/CaptainSelect";
import MyTeam from "./component/user/team/MyTeam";
import Login from "./component/auth/Login";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";
import Live from "./component/user/live/Live";
import Membership from "./component/user/other/Membership";
import Withdraw from "./component/user/other/Withdraw";
import WithdrawHistory from "./component/user/other/WithdrawHistory";
import EarningHistory from "./component/user/other/EarningHistory";
import PointSystem from "./component/user/other/PointSystem";
import Profile from "./component/user/other/Profile";
import ChangePasswors from "./component/user/other/ChangePasswors";
import About from "./component/cms/About";
import PrivacyPolicy from "./component/cms/PrivacyPolicy";
import TermsCondition from "./component/cms/TermsCondition";
import ContactUs from "./component/cms/ContactUs";
import HelpSupport from "./component/cms/HelpSupport";
import ReferEarn from "./component/user/other/ReferEarn";
import CreditHistory from "./component/user/other/CreditHistory";
import NotificationList from "./component/user/other/NotificationList";
import Settings from "./component/user/other/Settings";
import TeamPreview from "./component/user/team/TeamPreview";
import PurchaseCredit from "./component/user/payment/PurchaseCredit";
import Payment from "./component/user/payment/Payment";
import ExistingCard from "./component/user/payment/ExistingCard";
import BankList from "./component/user/payment/BankList";
import AdminDashboard from "./component/admin/dashboard/AdminDashboard";
import AssociationList from "./component/admin/association/AssociationList";
import AddAssociaciation from "./component/admin/association/AddAssociaciation";
import SubscriptionList from "./component/admin/subscription/SubscriptionList";
import AddSubscription from "./component/admin/subscription/AddSubscription";
import MemberList from "./component/admin/member/MemberList";
import AddMember from "./component/admin/member/AddMember";
import AssociationAdminList from "./component/admin/association/AssociationAdminList";
import AddAssessmentAdmin from "./component/admin/association/AddAssessmentAdmin";
import FantacyGameAdmin from "./component/admin/fantacygame/FantacyGameAdmin";
import AddFantacyGameAdmin from "./component/admin/fantacygame/AddFantacyGameAdmin";
import JoinList from "./component/admin/join/JoinList";
import SubscriptionUserList from "./component/admin/subscription/SubscriptionUserList";
import ViewSubscriptionHistory from "./component/admin/subscription/ViewSubscriptionHistory";
import PointSystemManagement from "./component/admin/pointsystem/PointSystemManagement";
import TeamList from "./component/admin/teammanagement/TeamList";
import AddTeam from "./component/admin/teammanagement/AddTeam";
import TournamentList from "./component/admin/tournament/TournamentList";
import AddTournament from "./component/admin/tournament/AddTournament";
import PlayerList from "./component/admin/player/PlayerList";
import AddPlayer from "./component/admin/player/AddPlayer";
import MatchSchedule from "./component/admin/matchshedule/MatchSchedule";
import AddMatch from "./component/admin/matchshedule/AddMatch";
import CreditScore from "./component/admin/creditscore/CreditScore";
import Earning from "./component/admin/earning/EarningHistory";
import WithDrawHistory from "./component/admin/withdraw/WithDrawHistory";
import TransactionHistory from "./component/admin/withdraw/TransactionHistory";
import FaqCategory from "./component/admin/cms/FaqCategory";
import AddFaqCategory from "./component/admin/cms/AddFaqCategory";
import FAQList from "./component/admin/cms/FAQList";
import AddFaq from "./component/admin/cms/AddFaq";
import CmsPage from "./component/admin/cms/CmsPage";
import AddCms from "./component/admin/cms/AddCms";
import BannerList from "./component/admin/banner/BannerList";
import AddBanner from "./component/admin/banner/AddBanner";
import EnqueryList from "./component/admin/others/EnqueryList";
import SubscriberList from "./component/admin/others/SubscriberList";
import NewsletterList from "./component/admin/others/NewsletterList";
import AddNewsletter from "./component/admin/others/AddNewsletter";
import AdminNotificationList from "./component/admin/others/AdminNotificationList";
import AddAdminNotification from "./component/admin/others/AddAdminNotification";
import CouponList from "./component/admin/coupon/CouponList";
import AddCoupon from "./component/admin/coupon/AddCoupon";
import AdminUserList from "./component/admin/role-permission/AdminUserList";
import AddAdminUser from "./component/admin/role-permission/AddAdminUser";
import ManagePermission from "./component/admin/role-permission/ManagePermission";
import Adminprofile from "./component/admin/profile/Profile";
import AdminChangePassword from "./component/admin/profile/AdminChangePassword";
import AdminSettings from "./component/admin/profile/Settings";
import FantacyGameList from "./component/admin/fantacygame/FantacyGameList";
import AddFantacyGameList from "./component/admin/fantacygame/AddFantacyGameList";
import PrivateRoute from "./component/common/PrivateRoute";
import PublicRoute from "./component/common/PublicRoute";
import EditAssociation from "./component/admin/association/EditAssociation";
import ViewAssociation from "./component/admin/association/ViewAssociation";
import EditTeam from "./component/admin/teammanagement/EditTeam";
import ViewTeam from "./component/admin/teammanagement/ViewTeam";
import EditAssessmentAdmin from "./component/admin/association/EditAssessmentAdmin";
import ViewAssessmentAdmin from "./component/admin/association/ViewAssessmentAdmin";
import EditMember from "./component/admin/member/EditMember";
import ViewMember from "./component/admin/member/ViewMember";
import EditFaqCategory from "./component/admin/cms/EditFaqCategory";
import EditFaq from "./component/admin/cms/EditFaq";
import ViewFaq from "./component/admin/cms/ViewFaq";
import EditTournament from "./component/admin/tournament/EditTournament";
import ViewTournament from "./component/admin/tournament/ViewTournament";
import EditPlayer from "./component/admin/player/EditPlayer";
import ViewPlayer from "./component/admin/player/ViewPlayer";
import EditFantacyGameAdmin from "./component/admin/fantacygame/EditFantacyGameAdmin";
import EditCms from "./component/admin/cms/EditCms";
import EditBanner from "./component/admin/banner/EditBanner";
import EditMatch from "./component/admin/matchshedule/EditMatch";
import ViewMatch from "./component/admin/matchshedule/ViewMatch";
import EditCoupon from "./component/admin/coupon/EditCoupon";
import ViewCoupon from "./component/admin/coupon/ViewCoupon";
import EditSubscription from "./component/admin/subscription/EditSubscription";
import ViewSubscription from "./component/admin/subscription/ViewSubscription";
import EdituserTeam from "./component/user/team/EditTeam";
import EditFantacyGame from "./component/admin/fantacygame/EditFantacyGame";
import FantacyGamerule from "./component/user/dashboard/FantacyGamerule";
import FantacyContactAdmin from "./component/user/dashboard/FantacyContactAdmin";
import MyTeamPreview from "./component/user/team/MyTeamPreview";
import LogList from "./component/admin/others/LogList";
import LogDetails from "./component/admin/others/LogDetails";
import EditCreateTeam from "./component/user/team/EditCreateTeam";
import FantacyPointSystem from "./component/admin/pointsystem/FantacyPointSystem";
import AfterRegistration from "./component/auth/AfterRegistration";
import FantacyGameSignup from "./component/auth/FantacyGameSignup";
import ClubAssociationRegistration from "./component/auth/ClubAssociationRegistration";
import PlayerCreditScore from "./component/admin/fantacygame/PlayerCreditScore";
import ViewFantacyGameList from "./component/admin/fantacygame/ViewFantacyGameList";
import AdminPlayerCredit from "./component/admin/pointsystem/AdminPlayerCredit";
import Success from "./component/user/payment/Success";
import SubscriptionPayment from "./component/user/payment/SubscriptionPayment";
import CreditPayment from "./component/user/payment/CreditPayment";
import CreditSuccess from "./component/user/payment/CreditSuccess";
import ChangePlan from "./component/admin/subscription/ChangePlan";
import EditAdminNotification from "./component/admin/others/EditAdminNotification";
import ViewAdminNotification from "./component/admin/others/ViewAdminNotification";
import EditNewsLetter from "./component/admin/others/EditNewsLetter";
import ViewNewsLetter from "./component/admin/others/ViewNewsLetter";

import TeamListuser from "./component/user/team/TeamList";
import Wallet from "./component/user/other/Wallet";

import ClubDashboard from "./component/clubadmin/ClubDashboard";
import FantasyAdmin from "./component/fantasyadmin/FantasyAdmin";
import AddWallet from "./component/admin/wallet/AddWallet";
import WalletCheckout from "./component/admin/wallet/WalletCheckout";
import WalletSuccess from "./component/admin/wallet/WalletSuccess";
import PredictWinner from "./component/user/dashboard/PredictWinner";
import AdminWithdrawForm from "./component/admin/earning/AdminWithdrawForm";
import AdminBankList from "./component/admin/earning/AdminBankList";
import EditAdminUser from "./component/admin/role-permission/EditAdminUser";
import LoginLog from "./component/admin/others/LoginLog";
import AdminNotification from "./component/admin/common/AdminNotification";
import SheduleScoreCard from "./component/admin/matchshedule/SheduleScoreCard";
import FantasyNorification from "./component/fantasyadmin/FantasyNorification";
import ClubNotification from "./component/clubadmin/ClubNotification";
import ManageCommision from "./component/admin/commision/ManageCommision";
import TestimonialList from "./component/admin/Home/TestimonialList";
import AddTestimonial from "./component/admin/Home/AddTestimonial";
import EditTestimonial from "./component/admin/Home/EditTestimonial";
import Howtoplay from "./component/admin/Home/Howtoplay";
import AddHowtoplay from "./component/admin/Home/AddHowtoplay";
import EditHowtoplay from "./component/admin/Home/EditHowtoplay";
import ShowingMatch from "./component/user/dashboard/ShowingMatch";
import MyPredictWinner from "./component/user/dashboard/MyPredictWinner";
import ViewStanding from "./component/admin/fantacygame/ViewStanding";
import Notfound from "./component/cms/Notfound";
import ForceUpdate from "./component/admin/ForceUpdate";
import Legality from "./component/cms/Legality";
import TermsOfServices from "./component/cms/TermsOfServices";
import SelectWinner from "./component/admin/fantacygame/SelectWinner";

function App() {
  return (
    <div className="App">
         <BrowserRouter>
   
           <Routes>
            {/* User  */}
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsCondition />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/uder-process" element={<AfterRegistration />} />
              <Route path="/signup-fantasygame" element={<FantacyGameSignup />} />
              <Route path="/signup-club" element={<ClubAssociationRegistration />} />
               <Route path="/legality" element={<Legality />} />
              <Route path="/term-of-services" element={<TermsOfServices />} />

            <Route element={<PrivateRoute />}> 
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
               
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              
            </Route> 
            <Route element={<PublicRoute />}> 
            <Route path="/home" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard/:id" element={<LeaderBoard />} />
              <Route path="/contest/:pros/:id" element={<Live />} />
              <Route path="/create-team" element={<CreateTeam />} />
              <Route path="/predict-winner" element={<PredictWinner />} />
              <Route path="/my-prediction" element={<MyPredictWinner />} />
              <Route path="/fantacy-game-rule/:pros/:id/:id1" element={<FantacyGamerule />} />
              <Route path="/fantacy-conatct-admin/:pros/:id" element={<FantacyContactAdmin />} />
              <Route path="/fantacy-game-match" element={<ShowingMatch />} />
              <Route path="/select-captain" element={<CaptainSelect />} />
              <Route path="/edit-team/:id" element={<EdituserTeam />} />
              <Route path="/edit-player/:id" element={<EditCreateTeam />} />
              <Route path="/my-team-list/:id/:props" element={<TeamListuser />} />
              <Route path="/my-team" element={<MyTeam />} />
              <Route path="/team-preview/:id" element={<MyTeamPreview />} />
              <Route path="/team-preview" element={<TeamPreview />} />
              {/* <Route path="/live" element={<Live />} /> */}
              <Route path="/subscription" element={<Membership />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/withdraw-history" element={<WithdrawHistory />} />
              <Route path="/credit-history" element={<CreditHistory />} />
              <Route path="/earning-history" element={<EarningHistory />} />
              <Route path="/fantasy-point" element={<PointSystem />} />
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePasswors />} />
              <Route path="/refer-friend" element={<ReferEarn />} />
              <Route path="/notification" element={<NotificationList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/wallet" element={<Wallet />} />
             
              <Route path="/purchase-credit" element={<PurchaseCredit />} />
              <Route path="/purchase-credit/payment" element={<CreditPayment />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/payment/subscription" element={<SubscriptionPayment />} />
              <Route path="/existing-card" element={<ExistingCard />} />
              <Route path="/bank-change" element={<BankList />} />
              <Route path="/payment/success/:id" element={<Success />} />
              <Route path="/purchase-credit/payment/success/:id" element={<CreditSuccess />} />
              

                {/*Club Admin */}
              <Route path="/club/dashboard" element={<ClubDashboard />} />
              <Route path="/club/notification" element={<ClubNotification />} />

                    {/*fantasy Admin */}
                    <Route path="/fantasy/dashboard" element={<FantasyAdmin />} />
                    <Route path="/fantasy/notification" element={<FantasyNorification />} />
               {/* Admin */}
               <Route path="/admin/notification" element={<AdminNotification />} />
              
               <Route path="/admin/add-wallet" element={<AddWallet />} />
               <Route path="/admin/add-wallet/payment" element={<WalletCheckout />} />
               <Route path="/admin/add-wallet/payment/success/:id" element={<WalletSuccess />} />

               <Route path="/admin/dashboard" element={<AdminDashboard />} />
               
               <Route path="/admin/association" element={<AssociationList />} />
               <Route path="/admin/association/add" element={<AddAssociaciation />} />
               <Route path="/admin/association/edit/:id" element={<EditAssociation />} /> 
               <Route path="/admin/association/view/:id" element={<ViewAssociation />} /> 

               <Route path="/admin/association-admin" element={<AssociationAdminList />} />
               <Route path="/admin/association-admin/add" element={<AddAssessmentAdmin />} />
               <Route path="/admin/association-admin/edit/:id" element={<EditAssessmentAdmin/>} />
               <Route path="/admin/association-admin/view/:id" element={<ViewAssessmentAdmin/>} />

               <Route path="/admin/subscription" element={<SubscriptionList />} />
               <Route path="/admin/subscription/add" element={<AddSubscription />} />
               <Route path="/admin/subscription/edit/:id" element={<EditSubscription />} />
               <Route path="/admin/subscription/view/:id" element={<ViewSubscription />} />


               <Route path="/admin/member" element={<MemberList />} />
               <Route path="/admin/member/add" element={<AddMember />} />
               <Route path="/admin/member/edit/:id" element={<EditMember />} />
               <Route path="/admin/member/view/:id" element={<ViewMember />} />
               
               <Route path="/admin/fantacy-game-admin" element={<FantacyGameAdmin />} />
               <Route path="/admin/fantacy-game-admin/add" element={<AddFantacyGameAdmin />} />
               <Route path="/admin/fantacy-game-admin/edit/:id" element={<EditFantacyGameAdmin />} />


               <Route path="/admin/fantacy-games" element={<FantacyGameList />} />
               <Route path="/admin/fantacy-games/add" element={<AddFantacyGameList />} />
               <Route path="/admin/fantacy-games/edit/:id" element={<EditFantacyGame />} />
               <Route path="/admin/fantacy-games/view/:id" element={<ViewFantacyGameList />} />
               <Route path="/admin/fantacy-games-rules/:id" element={<FantacyPointSystem />} />
               <Route path="/admin/fantacy-games/creditscore/:id" element={<PlayerCreditScore />} />
               <Route path="/admin/fantacy-games/view-standing/:id" element={<ViewStanding />} />
               <Route path="/admin/admin-player-credits" element={<AdminPlayerCredit />} />
                 <Route path="/admin/fantacy-games/select-winner/:id" element={<SelectWinner  />} />


               <Route path="/admin/request-join" element={<JoinList />} />
               <Route path="/admin/subscription-user" element={<SubscriptionUserList />} />
               <Route path="/admin/subscription-user/view/:id" element={<ViewSubscriptionHistory />} />
               <Route path="/admin/subscription-user/change/:id" element={<ChangePlan />} />
               <Route path="/admin/point-management" element={<PointSystemManagement />} />

               <Route path="/admin/team-list" element={<TeamList />} />
               <Route path="/admin/team-list/add" element={<AddTeam />} />
               <Route path="/admin/team-list/edit/:id" element={<EditTeam />} />
               <Route path="/admin/team-list/view/:id" element={<ViewTeam />} />

               <Route path="/admin/faq-category" element={<FaqCategory />} />
               <Route path="/admin/faq-category/add" element={<AddFaqCategory />} />
               <Route path="/admin/faq-category/edit/:id" element={<EditFaqCategory />} />

               <Route path="/admin/tournament-list" element={<TournamentList />} />
               <Route path="/admin/tournament-list/add" element={<AddTournament />} />
               <Route path="/admin/tournament-list/edit/:id" element={<EditTournament />} />
               <Route path="/admin/tournament-list/view/:id" element={<ViewTournament />} />



               <Route path="/admin/player-list" element={<PlayerList />} />
               <Route path="/admin/player-list/add" element={<AddPlayer />} />
               <Route path="/admin/player-list/edit/:id" element={<EditPlayer />} />
               <Route path="/admin/player-list/view/:id" element={<ViewPlayer />} />



               <Route path="/admin/match-schedule" element={<MatchSchedule />} />
               <Route path="/admin/match-schedule/add" element={<AddMatch />} />
               <Route path="/admin/match-schedule/edit/:id" element={<EditMatch />} />
               <Route path="/admin/match-schedule/view/:id" element={<ViewMatch />} />


               
               <Route path="/admin/wallet-history" element={<CreditScore />} />
               <Route path="/admin/earning-history" element={<Earning />} />
               <Route path="/admin/withdray-history" element={<WithDrawHistory />} />
               <Route path="/admin/transaction-history" element={<TransactionHistory />} />
               
               <Route path="/admin/faq" element={<FAQList />} />
               <Route path="/admin/faq/add" element={<AddFaq />} />
               <Route path="/admin/faq/edit/:id" element={<EditFaq />} />
               <Route path="/admin/faq/view/:id" element={<ViewFaq />} />


               <Route path="/admin/cms" element={<CmsPage />} />
               <Route path="/admin/cms/add" element={<AddCms />} />
               <Route path="/admin/cms/edit/:id" element={<EditCms />} />

               
               <Route path="/admin/banner" element={<BannerList />} />
               <Route path="/admin/banner/add" element={<AddBanner />} />
               <Route path="/admin/banner/edit/:id" element={<EditBanner />} />

               <Route path="/admin/coupon" element={<CouponList />} />
               <Route path="/admin/coupon/add" element={<AddCoupon />} />
               <Route path="/admin/coupon/edit/:id" element={<EditCoupon />} />
               <Route path="/admin/coupon/view/:id" element={<ViewCoupon />} />


               <Route path="/admin/enquery" element={<EnqueryList />} />
               <Route path="/admin/subscriber" element={<SubscriberList />} />
               <Route path="/admin/newsletter" element={<NewsletterList />} />
               <Route path="/admin/newsletter/add" element={<AddNewsletter />} />
               <Route path="/admin/newsletter/edit/:id" element={<EditNewsLetter />} />
               <Route path="/admin/newsletter/view/:id" element={<ViewNewsLetter />} />
               <Route path="/admin/notification-list" element={<AdminNotificationList />} />
               <Route path="/admin/notification-list/add" element={<AddAdminNotification />} />
               <Route path="/admin/notification-list/edit/:id" element={<EditAdminNotification />} />
               <Route path="/admin/notification-list/view/:id" element={<ViewAdminNotification />} />
               
               <Route path="/admin/user" element={<AdminUserList />} />
               <Route path="/admin/user/add" element={<AddAdminUser />} />
               <Route path="/admin/user/edit/:id" element={<EditAdminUser />} />
               <Route path="/admin/user/role-permission/:id" element={<ManagePermission />} />
               <Route path="/admin/profile" element={<Adminprofile />} />
               <Route path="/admin/change-password" element={<AdminChangePassword />} />
               <Route path="/admin/settings" element={<AdminSettings />} />
               <Route path="/admin/log" element={<LogList />} />
               <Route path="/admin/log/view/:id" element={<LogDetails />} />

               <Route path="/admin/withdraw" element={<AdminWithdrawForm />} />
               <Route path="/admin/bank-change" element={<AdminBankList />} />
               <Route path="/admin/login-log" element={<LoginLog />} />
               <Route path="/admin/scorecard" element={<SheduleScoreCard />} />
               <Route path="/admin/manage-commision" element={<ManageCommision />} />


               <Route path="/admin/testimonial" element={<TestimonialList />} />
               <Route path="/admin/testimonial/add" element={<AddTestimonial />} />
               <Route path="/admin/testimonial/edit/:id" element={<EditTestimonial />} />
               <Route path="/admin/howtoplay" element={<Howtoplay />} />
               <Route path="/admin/howtoplay/add" element={<AddHowtoplay />} />
               <Route path="/admin/howtoplay/edit/:id" element={<EditHowtoplay />} />
               <Route path="/admin/force-update" element={<ForceUpdate />} />
               </Route> 
               <Route path="*" element={<Notfound />} />
           </Routes>
       
         </BrowserRouter>
    
    </div>
  );
}

export default App;
