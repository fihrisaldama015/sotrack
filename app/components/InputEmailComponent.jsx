import TextField from "@mui/material/TextField";

const InputEmail = ({ name, register, errors, validationSchema }) => {
  return (
    <>
      <TextField
        placeholder="email@domain.com"
        type={"email"}
        InputProps={{
          sx: { borderRadius: 2 },
        }}
        {...register(name, {
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
          ...validationSchema,
        })}
      />
      {errors && errors[name]?.type === "required" && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === "pattern" && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </>
  );
};

export default InputEmail;
