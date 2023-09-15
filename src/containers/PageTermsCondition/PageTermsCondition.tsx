import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";

import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface PageTermsConditionProps {
  className?: string;
}

const PageTermsCondition: FC<PageTermsConditionProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-PageTermsCondition overflow-hidden relative ${className}`}
      data-nc-id="PageTermsCondition"
    >
      <Helmet>
        <title>Terms & Condition</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-8 lg:space-y-8">
        <h1 className="text-4xl font-semibold">Terms & Conditions</h1>

        <ul className="list-li">
          <p><b>1. Introduction to Business</b></p>
          <li className="list-li"> All the intellectual
          property, copyrights and trademarks of the website and apps is
          retained by ‘Holahost Pvt Ltd’.</li>
          <li className="list-li"> The users of network “Holaahost”
          agree to the policies of the network which are mentioned in detail in
          next section.</li>
        </ul>
        <ul className="list-li">
          <p><b>2. Policies</b></p>
          <li className="list-li"> The user must be above 18 years of age to use the network.</li>
          <li className="list-li"> The user can post/host events, attend events, create blog groups, join blog groups, interact with 
          users of blog groups and message users in blog groups.</li>
          <li className="list-li"> The content/discussion of blog groups is open to all subjects except vulgar content, sensitive 
          content to any community or any threatening content.</li>
          <li className="list-li"> Any offensive, illegal and vulgar content on the website/apps if found, will be removed.</li>
          <li className="list-li"> Use of alcohol and theme in events is at liability of admin. The admin of the event is responsible 
          for legal clauses in regard with the state policies.</li>
          <li className="list-li"> Use of drugs in events is prohibited. The admin/members are requested to not use any illegal 
          substance in the events. If found guilty, the admin of the event is solely responsible for the legal 
          clauses.</li>
          <li className="list-li"> Users can report any person, event or blog group. The network “Holaahost” has rights to 
          terminate/remove/block any offensive, illegal or vulgar content/user.</li>
        </ul>

        <ul className="list-li">
          <p><b>3. Royalty and Achievements</b></p>
          <li className="list-li"> Blog group admin will be eligible for royalty once reached a minimum amount of followers (one 
          time during first attempt)</li>
          <li className="list-li"> The royalty to be paid is as follows. The further bar of royalty to be paid will be updated soon.</li>
        </ul>
        <table>
  <tr>
    <th>Followers gained</th>
    <th>Royalty earned</th>
    
  </tr>
  <tr>
    <td>250</td>
    <td>$5</td>
  </tr>
  <tr>
    <td>500</td>
    <td>$10</td>
  </tr>
  <tr>
    <td>1000</td>
    <td>$20</td>
  </tr>
  <tr>
    <td>2500</td>
    <td>$40</td>
  </tr>
  <tr>
    <td>Further bar regarding userbase to be updated*</td>
    <td>Further bar regarding userbase to be updated*</td>
  </tr>
 
</table>


          <ul className="list-li">
          <p><b>4. Payments and refund policy</b></p>
          <li > The payment for using the features of website/apps of “Holaahost” goes to ‘Holahost Pvt Ltd’.</li>
          <li className="list-li"> If an event is charged by the admin, the payment goes to the admin of the event. ‘Holahost Pvt 
          Ltd’ has no share in such charged events. Any dispute regarding payment in such cases is to be 
          settled with the admin of the event. If any fraud/dispute occurs in such regard, the user has right 
          to report it to “Holaahost” management team.</li>
          <li className="list-li"> The ‘royalty’ will be paid to the admin of blog groups on reaching certain milestone. ‘Holahost 
          Pvt Ltd’ will pay the royalty to the admin of blog groups on reaching the milestones. Details of 
          the royalty earned can be found in above section. The royalty will be paid directly to the bank 
          account of the admin after the admin fills up the banking transaction details.</li>
        </ul>
          <ul className="list-li">
          <p><b>5. Privacy policy</b></p>
          <li className="list-li"> Content the user posts on website is visible to users of the website and apps. Some of the 
          basic data of the website may be visible off the platform as well.</li>
          <li className="list-li"> The content about ‘Events’ section can be shared on other networking websites like Whatsapp, 
          Facebook.</li>
          <li className="list-li"> ‘Holahost Pvt Ltd’ can collect information from “Holaahost” for data purposes. This data if 
          collected will/can be stored by ‘Holahost Pvt Ltd’ safely and not be shared with other platforms/
          companies except advertising purposes.</li>
          <li className="list-li"> The data collected by ‘Holahost Pvt Ltd’ may be used for analytics purposes and for third party 
          programs like advertising purposes.</li>
        </ul>
          <ul className="list-li">
          <p><b>6. Cookies policy</b></p>
          <li className="list-li"> The cookies policy of “Holaahost” will comply with the cookies policy of respective states.</li>
          <li className="list-li">  Cookies improve the experience of the user on the website by remembering users preference 
          and enable other cookies based feature like analytics.</li>
          <li className="list-li"> ‘Holahost Pvt Ltd’ may use cookies of the website and trusted third parties like Google 
          Analytics for improvement of functionalities the website.</li>
          <li className="list-li"> ‘Holahost Pvt Ltd’ may update the policies from time to time for functionality and user security 
          of the website. It is advisable to read the policies from time to time.</li>
        </ul>

       

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageTermsCondition;
