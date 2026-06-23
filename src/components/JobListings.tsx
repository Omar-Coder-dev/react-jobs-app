import { JobListing, type Job } from "./JobListing";
import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";

export function JobListings({ isHome = false }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      // 1. Modern v1 beta syntax for limiting parameters
      const apiUrl = isHome 
        ? "/api/jobs?_page=1&_per_page=3" 
        : "/api/jobs";
        
      try {
        const res = await fetch(apiUrl);
        let data = await res.json();
        
        // 2. CRUCIAL FIX: If the server nested the array inside a 'data' key, grab it!
        if (data && data.data) {
          data = data.data;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job: Job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}