import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const handleClear = () => {
    reset();
  };

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <label>
        Name:
        <input {...register("name", { required: true })} />
      </label>
      <br />
      <label>
        Age:
        <input {...register("age", { required: true })} />
      </label>
      <br />
      <label>
        Address:
        <input {...register("address", { required: true })} />
      </label>
      <br />
      <label>
        Phone:
        <input {...register("phone", { required: true })} />
      </label>
      <br />
      <div>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SignupForm;
