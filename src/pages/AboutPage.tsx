import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import TrustChips from '../components/TrustChips';
import { asset } from '../data/assets';
import { PAGE_SEO } from '../data/siteConfig';

export default function AboutPage() {
  const seo = PAGE_SEO.about;
  return (
    <SiteLayout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      path="/about"
      bodyClass="page-about"
      ogImage="/images/TomBillingham.jpg"
      ogImageAlt="Tom Billingham, skipper — Four Winds Sailing, Golden Bay"
      ogType="profile"
      hero={
        <section className="page-hero">
          <div className="page-hero__inner">
            <p className="eyebrow">About</p>
            <h1>Tom Billingham</h1>
            <p>Owner-operator of Four Winds Sailing — Golden Bay, New Zealand.</p>
          </div>
        </section>
      }
    >
      <section className="section">
        <div className="section__inner about-grid">
          <img
            src={asset('/images/TomBillingham.jpg')}
            alt="Tom Billingham"
            className="about-grid__photo"
            width={420}
            height={420}
          />
          <div>
            <h2>My Sailing Journey</h2>
            <p>
              Kia ora — I&apos;m Tom. Originally from Yorkshire in the UK, I first started sailing when I
              arrived in Aotearoa New Zealand at the age of 20. After sailing around Tasman Bay on the
              family H28, I decided I wanted to pursue a career on the water. I enrolled in the
              Mahurangi Technical Institute&apos;s &ldquo;Superyacht course&rdquo; and once I completed it I left
              for Europe on the hunt for a job!
            </p>
            <p>
              I found my first job in Athens, Greece, joining the 20m schooner S/Y Gloria. We sailed
              through the Mediterranean before crossing the Atlantic for the Caribbean. It was in Fort
              Lauderdale in Florida when I switched from luxury yacht to the cramped and wet conditions
              of a 32 foot fiberglass sloop with a motley crew of Norwegian adventurers — they were
              heading back to Oslo via Canada, Greenland, Iceland, the Faroe Islands and Shetland.
            </p>
            <p>
              It was this trip that made me decide to buy my own small vessel, and so I flew back to
              Nelson and purchased the Four Winds — a 38 foot steel ketch. Once I had Four Winds safely
              tied up in Port Tarakohe, Golden Bay, I was called away to another job on a superyacht,
              the 60m S/Y Zenji, in Los Angeles, USA. I worked on that boat for 9 months, cruising down
              the West Coast of the US and passing through the Panama Canal and into the Caribbean. I
              then returned to New Zealand to take care of the Four Winds. Four Winds was my ideal boat
              for the time; I put together a crew of travellers and we left New Zealand for the Pacific
              Islands, stopping in Fiji, Vanuatu, the Solomon Islands, PNG, Palau, the Philippines,
              Taiwan, Japan and finally South Korea.
            </p>
            <p>
              While in South Korea, we met a gentleman who explained to us that he had just bought a
              yacht, online, that was in Fiji and needed to be brought to South Korea! So I became the
              captain on my first delivery job. While preparing the boat in Fiji, we met with another
              boat that we were to deliver on the same route. Both of these deliveries included stops
              in many Pacific Islands and ended in South Korea.
            </p>
            <p>
              During my time in the North Pacific I also delivered a 40 foot Beneteau from Hokkaido,
              Japan to Busan, South Korea. Once this flurry of deliveries was over, I sailed the Four
              Winds back from South Korea to Taiwan, where I settled with my wife and we had our two
              sons born before deciding to return with the family to New Zealand.
            </p>
            <p>
              Now it is time for me to share my experience with as many people as possible — sailing
              is a magical way to travel and I hope to inspire people to take journeys near and far!
            </p>
            <TrustChips />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="section__inner">
          <h2>Credentials</h2>
          <ul className="cred-list">
            <li>
              <strong>Skipper Restricted Limits (SRL)</strong> — Maritime New Zealand
            </li>
            <li>
              <strong>RYA Yachtmaster Offshore</strong> — Royal Yachting Association
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__inner split">
          <div>
            <h2>The Yacht</h2>
            <p>
              Bright Sparx is our Noelex 25, a 7.7-meter trailer sailer, featuring a lifting
              ballasted centerboard and a spacious six-berth cabin. Designed in Australasia by Noel
              Honey, Alex Trethewey, and Steve Marten, it is widely celebrated for balancing
              high-performance club racing with family cruising comfort.
            </p>
            <p>
              With a small kitchen with sink and small stove, a cassette toilet and berths for up to
              six (though we recommend 4), it&apos;s the perfect boat for a weekend on the water.
              Powered by a Yamaha 10hp outboard with 12v lighting and USB charging facilities, there
              is everything you need for a comfortable experience. Tom&apos;s briefing will leave you
              confident in the location and use of all the safety equipment and navigational aids on
              board.
            </p>
            <Link to="/charters" className="btn btn--navy">
              See charter packages
            </Link>
          </div>
          <img src={asset('/images/Yacht.jpg')} alt="Tom’s yacht" className="split__img" />
        </div>
      </section>

      <section className="section section--soft">
        <div className="section__inner">
          <h2>On the water</h2>
          <div className="gallery">
            <img src={asset('/images/yacht2.jpg')} alt="Yacht under sail along the coast" />
            <img
              src={asset('/images/familyatsea.jpg')}
              alt="Family in lifejackets enjoying the view from the cockpit"
            />
            <img src={asset('/images/Yacht.jpg')} alt="Tom’s yacht ashore, sail raised" />
            <img
              src={asset('/images/yachttransport.png')}
              alt="Yacht on trailer behind a van — mobile Golden Bay sailing"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
