import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { type Job } from "../components/JobListing";
import { toast } from "react-toastify";

interface EditJobPageProps {
  updateJobSubmit: (updatedJob: Job) => Promise<void> | void;
}

export function EditJobPage({ updateJobSubmit }: EditJobPageProps) {
  // 1. Cast the loaded data to your Job type structure
  const job = useLoaderData() as Job;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleFormAction = async (formData: FormData) => {
    // 2. Build the updated job object, ensuring the ID is preserved
    const updatedJob: Job = {
      id: id as string,
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      salary: formData.get("salary") as string,
      company: {
        name: formData.get("company") as string,
        description: formData.get("company_description") as string,
        contactEmail: formData.get("contact_email") as string,
        contactPhone: formData.get("contact_phone") as string,
      },
    };

    // 3. Submit the data to your update handler and redirect back to the job page
    await updateJobSubmit(updatedJob);
    toast.success("Job Updated Successfully")
    navigate(`/jobs/${id}`);
  };

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form action={handleFormAction}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Update Job
              </h2>

              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  defaultValue={job.type}
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Beautiful Apartment In Miami"
                  defaultValue={job.title}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="Add any job duties, expectations, requirements, etc"
                  defaultValue={job.description}
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  defaultValue={job.salary}
                  required
                >
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  defaultValue={job.location}
                  required
                />
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  defaultValue={job.company.name}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="company_description" className="block text-gray-700 font-bold mb-2">
                  Company Description
                </label>
                <textarea
                  id="company_description"
                  name="company_description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="What does your company do?"
                  defaultValue={job.company.description}
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="contact_email" className="block text-gray-700 font-bold mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  defaultValue={job.company.contactEmail}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contact_phone" className="block text-gray-700 font-bold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  defaultValue={job.company.contactPhone}
                />
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}