import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
// import { time } from 'console';

import { events } from '@/lib/constants';

const Page = async () => {
  return (
    <section>

      <h1 className='text-center'>The Hub for every dev <br /> Event you cant Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in one Place</p>
      
      <ExploreBtn/>

<div className='mt-20 space-y-7'>
  <h3>Featured Events</h3>

  <ul className="events">
    
    {events.map((event) => (
      <li key={event.title} className="">
       <EventCard {...event} />
        
      </li>
    ))}
  </ul>
</div>

    </section>
  );
};

export default Page;