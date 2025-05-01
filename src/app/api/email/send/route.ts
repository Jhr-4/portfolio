import { NextResponse } from 'next/server';
import emailjs from '@emailjs/nodejs';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Validate inputs
    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))){
        return NextResponse.json(
            { error: "Invalid email provided."},
            { status: 400 }
          );
    }

    if (message.length < 50) {
      return NextResponse.json(
        { error: "Message must be at least 50 characters." },
        { status: 400 }
      );
    }

    // Rate limiting??
    
    // Send email via EmailJS
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID || "",
      process.env.EMAILJS_TEMPLATE_ID || "",
      {
        name: name,
        email: email,
        title: subject,
        message: message,
      },{
        privateKey: process.env.EMAILJS_PRIVATE_API_KEY || "",
        publicKey: process.env.EMAILJS_PUBLIC_API_KEY || ""
      }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully",
      result: result.text 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}