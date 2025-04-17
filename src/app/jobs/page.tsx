import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className='flex flex-col px-25 cursor-pointer'>
      <h1 className="text-4xl font-bold">Jobs Postings</h1>
      <h2>Here Are the available jobs </h2>
      <div className='flex flex-row gap-6'>
      <div className='flex flex-col gap-6 justify-center items-center'>
        <Card>
  <CardHeader>
    <CardTitle>Frontend Developer</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <Image src='/Frontend.jpeg' alt='Image' height={200} width={200} />
  </CardHeader>
    <CardContent>
    <Link href='#'><Button className="cursor-pointer">Apply Now</Button></Link>
    </CardContent>
    </Card>
    </div>


<div className='flex flex-row gap-6'>
<Card>
  <CardHeader>
    <CardTitle>Game Developer</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <Image src='/Frontend.jpeg' alt='Image' height={200} width={200}/>
  </CardHeader>
    <CardContent>
    <Link href='#'><Button className="cursor-pointer">Apply Now</Button></Link>
    </CardContent>

</Card>
</div>
</div>


    </div>
  );
};

export default page;
