import { sanityClient } from "@/lib/sanityClient";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const GET = async (res) => {
  return NextResponse.json({ message: "Working o" }, { status: 200 });
};

export const POST = async (res) => {
  const { firstName, lastName, phoneNumber, email, message } = await res.json();

  const doc = {
    _type: "customer",
    firstName,
    lastName,
    phone: phoneNumber,
    email,
    message,
  };

  const response = await sanityClient.create(doc);

  const { _id } = response;

  // nodemailer transporter instantiation
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    service: process.env.SMTP_EMAIL_PROVIDER,
    auth: {
      user: process.env.SMTP_EMAIL_USER,
      pass: process.env.SMPT_EMAIL_PASSWORD,
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  // Mail Options
  const mailOptions = {
    from: {
      name: `${firstName} ${lastName}`,
      address: email,
    },
    to: process.env.SMTP_EMAIL_RECEPIENT,
    subject: `Message from ${firstName} ${lastName}, a customer of Primestix.`,
    text: `Customer email: ${email}. \n\n Customer message: ${message}`,
    html: `<h2>${message}</h2>`,
  };

  if (_id) {
    // Send mail if the
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
          return NextResponse.json(
            {
              message:
                "Message was not submitted successful. Please try again.",
              status: 400,
            },
            { status: 400 }
          );
        } else {
          console.log(info);
          resolve(info);
          console.log("Email sent: " + info.response);
          return NextResponse.json(
            { message: "Message was sent successful.", status: 200 },
            { status: 200 }
          );
        }
      });
    });
  } else {
    return NextResponse.json(
      {
        message: "Message was not submitted successful. Try again.",
        status: 400,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "Thank you!",
      status: 200,
    },
    { status: 200 }
  );
};
