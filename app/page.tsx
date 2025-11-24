import ExploreBtn from '@/components/ExploreBtn';
import React from 'react';

const Page = () => {
  return (
    <section>

      <h1 className='text-center'>The Hub for every dev <br /> Event you cant Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in one Place</p>
      
      <ExploreBtn/>

<div>
  <h3>Featured Events</h3>
  <ul className='events'>
    {[1, 2, 3, 4].map((event) => (
      <li key={event} className="border p-4 my-2">
        <h4>Event {event}</h4>
        <p>Date: 2024-0{event}-15</p>
        <p>Location: City {event}</p>
        <a href="#">Learn More</a>
      </li>
    ))}
  </ul>
</div>

    </section>
  );
};

export default Page;