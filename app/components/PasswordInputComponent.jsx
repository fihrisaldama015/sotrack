import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const PasswordInput = ({ name, register, errors, validationSchema }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TextField
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          sx: { borderRadius: 2 },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        {...register(name, validationSchema)}
      />
      {errors && errors[name]?.type === "required" && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === "minLength" && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === "validate" && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </>
  );
};

export default PasswordInput;
