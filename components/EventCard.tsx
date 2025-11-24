import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  location: string;
  date: string;
  time: string;
  slug: string;



//   description: string;
//   category: "conference" | "hackathon" | "meetup" | "workshop";
//   price?: string;
//   registrationUrl?: string;
//   organizer: string;
//   attendees?: number;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <div className="poster">
        <Image src={image} alt={title} width={410} height={300} />
      </div>
      <div className="flex flex-row gap-2">
       <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
              <p>{location}</p>
      </div>
      <div className="title">
        <h4>{title}</h4>
      </div>

      <div className="datetime">
       <div>
               <Image src="/icons/calender.svg" alt="date" width={14} height={14} />
              <p>{date}</p>
       </div>
       <div>
               <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
              <p>{time}</p>
       </div>
      </div>


    </Link>
  );
};

export default EventCard;
