import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About Us</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-8 lg:space-y-8">
        <h1 className="text-4xl font-semibold">How we work</h1>

        <ul className="list-li">
          <p><b>Creation of Event: </b></p>
          <li className="list-li">An user can create an event. The user can choose from a list of fields while creating an event. 
          The user who creates an event will be termed as an ‘Admin’. The Admin can describe the event 
          details and add pictures of the event.</li>
          <li className="list-li"> The Admin will have to pay event listing charge to the network ‘Holaahost’. The Admin can 
          make the event free of charge for attendees or have event attendance fees. The Admin can 
          make the event open for all or choose from the invites received who to accept for the event.</li>
          <li className="list-li"> If the Admin makes the event charged, the attendees/invitees will have to pay the Admin directly 
          via payment details listed on the event page.</li>
          <li className="list-li"> The Admin can share the event listing and details on other websites like Facebook and 
          Whatsapp.</li>
        </ul>
        
        <ul className="list-li">
          <p><b>Joining an Event/Searching for Event: </b></p>
          <li className="list-li">The users of the network ‘Holaahost’ can search for the events through the search option.</li>
          <li className="list-li"> If interested in an event, the users can send joining confirmation to the Admin of the event (the 
          event might be free or have event attendance charges).</li>
        </ul>

        <ul className="list-li">
          <p><b>Creation of Blog Group: </b></p>
          <li className="list-li">An user can create a Blog Group on the network. The creation of Blog Group is free. The user 
          who created a blog group will be termed as an ‘Admin’.</li>
          <li className="list-li"> The Admin can post blogs and media content on his/her blog group. The blog posts will have a 
discussion/group chat option below the post, where other users can comment or group chat.</li>
          <li className="list-li"> TThe Admin of blog group will be eligible for royalty from network ‘Holaahost’ once reaching 
certain milestones/criteria regarding number of followers gained for his/her blog group. The 
details of the same is mentioned in the Terms and Conditions section.</li>
          <li className="list-li"> The Admin can remove any of his/her follower for spamming or violation of network policies.</li>
          <li className="list-li"> The Admin will earn batches as he/she gains followers.</li>
        </ul>

        <ul className="list-li">
          <p><b>Searching for Blog Groups:  </b></p>
          <li className="list-li">The users of the network can search for blog groups from the search option.</li>
          <li className="list-li"> The first three blogs of the Blog Groups and its discussion content are visible to all the users of 
the network.</li>
         
        </ul>

        <ul className="list-li">
          <p><b>Joining a Blog Group:   </b></p>
          <li className="list-li">An user of the network can join any blog group upon payment of nominal subscription fees, 
which makes the user eligible to interact on the blog discussion, see more blogs of the Blog 
Group and message other members of the blog groups.</li>
          <li className="list-li"> The first three blogs of the Blog Group are visible to all and are free to view. For viewing further 
blogs/content of the Blog Group, the user needs to subscribe to the Blog Group.</li>
         
        </ul>

        <ul className="list-li">
          <p><b>Messaging Members of Blog Group:   </b></p>
          <li className="list-li"> To message and interact with other members of blog groups, the user needs to subscribe to the 
Blog Group.</li>
          <li className="list-li">  A member of blog group can block incoming message in his/her personal chats section for 
spamming or violation of network policies.</li>
         
        </ul>

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
