import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';
import { cacheLife } from 'next/cache';
// import { time } from 'console';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  'use Cache'
  cacheLife('hours');
  const res = await fetch(`${BASE_URL}/api/events`);
  // const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/events`);
  const {events} = await res.json();
    

  return (
    <section>

      <h1 className='text-center'>The Hub for every dev <br /> Event you cant Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in one Place</p>
      
      <ExploreBtn/>

<div className='mt-20 space-y-7'>
  <h3>Featured Events</h3>

  <ul className="events"> 
    
    {events && events.length > 0 && events.map((event: IEvent) => (
      <li key={event.title} className="list-none">
       <EventCard {...event} />
        
      </li>
    ))}
  </ul>
</div>

    </section>
  );
};


export default Page;