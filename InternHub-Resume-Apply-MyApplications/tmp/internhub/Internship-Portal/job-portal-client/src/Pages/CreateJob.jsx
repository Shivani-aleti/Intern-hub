import { useState } from "react"
import { useForm } from "react-hook-form"
import CreatableSelect from "react-select/creatable"

const CreateJob = () => {
  const [selectedOption, setselectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset // Add this line to destructure the reset function
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    //console.log(data);
    fetch(`${window.location.origin}/post-job`,{
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  })

    .then((res) => res.json())
    .then((result) => {
  console.log(result);
  if(result.acknowledged === true ){
    alert("Job Posted Successfully!!!")
  }
  reset() // Reset the form after successful posting
})

  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "Python", label: "Python" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Java", label: "Java" },
    { value: "Nodejs", label: "Nodejs" },
    { value: "MongoDB", label: "MongoDB" },
  ];

  return (
    <div className='text-white max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-transparent py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 1st row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full ">
              <label className=" block mb-2 text-lg">Job Title</label>
              <input type="text" defaultValue={"Web Developer"} {...register("jobTitle")} className=" create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className=" block mb-2 text-lg">Company Name</label>
              <input type="text" placeholder="Ex. Microsoft" {...register("CompanyName")} className="create-job-input" />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input type="text" placeholder="$25K" {...register("minPrice")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input type="text" placeholder="$120K" {...register("maxPrice")} className="create-job-input" />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <input type="text" placeholder="$25K" {...register("minPrice")} className="create-job-input" />
              <select {...register("SalaryType", { required: true })}>
                <option value="Choose your salary"></option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input type="text" placeholder="Ex: New York" {...register("jobLocation")} className="create-job-input" />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input type="date" placeholder="Ex: 2023-10-28" {...register("postingDate")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <input type="int" placeholder="0-5" {...register("experiencelevel")} className=" create-job-input text-dk" />
              <select {...register("experiencelevel", { required: true })}>
                <option value="Choose your Experience"></option>
                <option value="No Experience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setselectedOption}
              options={options}
              isMulti
              className="create-job-report py-4"
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input type="url" placeholder="Paste Your company Logo URL : https://weshare.com/img1" {...register("CompanyLogo")} className="bg-black create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select {...register("employmentType")} className="create-job-input">
                <option value="Choose your Experience"></option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th Row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <textarea className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-black" rows={6} defaultValue={"Mollit in laborum tempor lorem incididunt irure.Aute eu ex ad sunt.Pariatur sint culpa do incididunt eisumd eisumd culpa .laborum tempor lorem incididunt"} placeholder="Job Description" {...register("description")} />
          </div>

          {/* Last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input type="email" placeholder="your email" {...register("postedBy")} className="create-job-input" />
          </div>

          <input type="submit" className="block mt-12 bg-blue text-dk font-semibold px-8 py-2 rounded-sm cursor-pointer" />
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
