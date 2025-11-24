import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
}

const EventCard = ({title, image}: Props) => {
  return (
   <Link href={`/events`} id="event-card">
    <div className="poster">
      <Image src={image} alt={title} width={410} height={300}/>
    </div>
    <div className="title">
      <h4>{title}</h4>
    </div>
   </Link>
  );
};

export default EventCard;