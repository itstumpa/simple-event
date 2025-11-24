import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    // Get the file first
    const file = formData.get('image') as File;
    if (!file) {
      return NextResponse.json(
        { message: 'Image file is required' }, 
        { status: 400 }
      );
    }

    // Convert formData to object
    const event: any = {};
    const tags: string[] = [];
    const agenda: string[] = [];
    
    formData.forEach((value, key) => {
      if (key === 'tags') {
        // Collect all tag values
        tags.push(value.toString());
      } else if (key === 'agenda') {
        // Collect all agenda values
        agenda.push(value.toString());
      } else if (key !== 'image') {
        event[key] = value;
      }
    });

    // If tags/agenda came as a single string, try to parse or split
    if (tags.length === 1) {
      const singleTag = tags[0];
      // Check if it's JSON array string
      if (singleTag.trim().startsWith('[')) {
        try {
          event.tags = JSON.parse(singleTag);
        } catch {
          event.tags = singleTag.split(',').map(t => t.trim());
        }
      } else {
        // Split by comma
        event.tags = singleTag.split(',').map(t => t.trim());
      }
    } else {
      event.tags = tags;
    }

    if (agenda.length === 1) {
      const singleAgenda = agenda[0];
      // Check if it's JSON array string
      if (singleAgenda.trim().startsWith('[')) {
        try {
          event.agenda = JSON.parse(singleAgenda);
        } catch {
          event.agenda = singleAgenda.split(',').map(a => a.trim());
        }
      } else {
        // Split by comma
        event.agenda = singleAgenda.split(',').map(a => a.trim());
      }
    } else {
      event.agenda = agenda;
    }

    // Upload image to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'DevEvent' }, 
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      ).end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    // Create event with all data
    const createdEvent = await Event.create(event);   

    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error('Full error:', e);
    return NextResponse.json(
      {
        message: "Event Creation failed",
        error: e instanceof Error ? e.message : "unknown"
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: 'Events fetched successfully', events }, 
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { 
        message: 'Event fetching failed', 
        error: e instanceof Error ? e.message : "unknown" 
      }, 
      { status: 500 }
    );
  }
}


// ```

// ### Now in Thunder Client, you have 3 options:

// **Option 1: Send as comma-separated values (EASIEST)**
//  `tags`: `technology,web,AI`
//  `agenda`: `Registration and Welcome,Keynote Speech,Lunch Break`

// **Option 2: Send multiple form fields with the same name**
//  `tags`: `technology`
//  `tags`: `web`
//  `tags`: `AI`
//  `agenda`: `Registration and Welcome`
//  `agenda`: `Keynote Speech`

// **Option 3: Send as JSON array (remove the extra quotes)**
//  `tags`: `["technology","web","AI"]`
//  `agenda`: `["Registration","Keynote"]`

// **I recommend Option 1** - just send comma-separated values. It's the simplest!

// Example Thunder Client setup:
// ```
// title: Tech Conference 2024
// description: A great tech conference
// overview: Learn about latest tech trends
// venue: Convention Center
// location: New York, NY
// date: 2024-12-25
// time: 10:00 AM
// mode: hybrid
// audience: Developers and Tech Enthusiasts
// organizer: Tech Corp
// tags: technology,web development,AI,cloud
// agenda: Registration,Welcome Speech,Keynote,Lunch,Workshop,Closing
// image: [Upload your image file]