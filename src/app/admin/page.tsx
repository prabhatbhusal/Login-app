"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Page = () => {
  const [jobs, setJobs] = useState([]); // Single array of job objects
  const [input, setInput] = useState(""); // Job name input
  const [input1, setInput1] = useState(""); // Job description input
  const [input2, setInput2] = useState(""); // Job deadline input

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add new job object to the jobs array
    setJobs([
      ...jobs,
      {
        name: input || "Default job name",
        description: input1 || "Default job description",
        deadline: input2 || "Default job deadline",
      },
    ]);
    // Clear all inputs
    setInput("");
    setInput1("");
    setInput2("");
  };

  return (
    <div className="flex flex-col px-6 justify-center items-center w-full max-w-md mx-auto">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full gap-6"
      >
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <label htmlFor="jobname" className="text-xl">
          Job Name:
        </label>
        <input
          type="text"
          id="jobname"
          className="p-4 border border-gray-400 rounded"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <label htmlFor="jobdesc" className="text-xl">
          Job Description:
        </label>
        <input
          type="text"
          id="jobdesc"
          className="p-4 border border-gray-400 h-24 rounded"
          required
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <label htmlFor="jobdeadline" className="text-xl">
          Job Deadline:
        </label>
        <input
          type="text"
          id="jobdeadline"
          className="p-4 border border-gray-400 rounded"
          required
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <Button type="submit">Add Job</Button>
      </form>

      {/* Display jobs as cards */}
      <div className="mt-6 w-full space-y-4">
        {jobs.map((job, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{job.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Description: {job.description}</p>
              <p className="text-gray-500">Deadline: {job.deadline}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;